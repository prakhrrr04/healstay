import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import {
  onAuthStateChanged
} from 'firebase/auth';
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import './ProviderBookings.css';

const ProviderBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async (user) => {
    const propQuery = query(collection(db, 'properties'), where('providerId', '==', user.uid));
    const propSnapshot = await getDocs(propQuery);
    const propIds = propSnapshot.docs.map(doc => doc.id);

    const bookingsSnapshot = await getDocs(collection(db, 'bookings'));
    const relatedBookings = [];

    for (const docSnap of bookingsSnapshot.docs) {
      const booking = docSnap.data();
      if (propIds.includes(booking.propertyId)) {
        const propertySnap = await getDoc(doc(db, 'properties', booking.propertyId));
        relatedBookings.push({
          id: docSnap.id,
          ...booking,
          property: propertySnap.exists() ? propertySnap.data() : null,
        });
      }
    }

    setBookings(relatedBookings);
    setLoading(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) fetchBookings(user);
    });
  }, []);

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      await updateDoc(doc(db, 'bookings', bookingId), { status: newStatus });
      setBookings(prev =>
        prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b)
      );
    } catch (err) {
      console.error('Failed to update booking status:', err);
      alert('Could not update status. Try again.');
    }
  };

  if (loading) return <div style={{ padding: '30px' }}>Loading provider bookings...</div>;

  return (
    <div className="provider-bookings-page">
      <h2>Bookings for Your Properties</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="bookings-grid">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <h3>{booking.property?.name || 'Property not found'}</h3>
              <p><strong>Booked by:</strong> {booking.fullName}</p>
              <p><strong>Start Date:</strong> {booking.date}</p>
              <p><strong>Duration:</strong> {booking.duration} days</p>
              <p><strong>Special Needs:</strong> {booking.specialNeeds || 'None'}</p>
              <p><strong>Status:</strong> {booking.status || 'pending'}</p>

              {booking.status === 'pending' && (
                <div className="action-buttons">
                  <button onClick={() => updateBookingStatus(booking.id, 'approved')}>Approve</button>
                  <button onClick={() => updateBookingStatus(booking.id, 'rejected')}>Reject</button>
                </div>
              )}
              {booking.status === 'approved' && <p className="status-approved">✅ Approved</p>}
              {booking.status === 'rejected' && <p className="status-rejected">❌ Rejected</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderBookings;

// src/pages/MyBookings.jsx
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import './MyBookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const bookingsQuery = query(collection(db, 'bookings'), where('userId', '==', user.uid));
      const bookingSnapshot = await getDocs(bookingsQuery);
      const bookingData = [];

      for (let docSnap of bookingSnapshot.docs) {
        const booking = docSnap.data();
        const propertyRef = doc(db, 'properties', booking.propertyId);
        const propertySnap = await getDoc(propertyRef);

        bookingData.push({
          id: docSnap.id,
          ...booking,
          property: propertySnap.exists() ? propertySnap.data() : null
        });
      }

      setBookings(bookingData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div style={{ padding: '30px' }}>Loading bookings...</div>;

  return (
    <div className="my-bookings-page">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>You haven’t booked any properties yet.</p>
      ) : (
        <div className="bookings-grid">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <h3>{booking.property?.name || 'Property not found'}</h3>
              <p><strong>Location:</strong> {booking.property?.address}</p>
              <p><strong>Hospital Nearby:</strong> {booking.property?.hospitalNearby}</p>
              <p><strong>Start Date:</strong> {booking.date}</p>
              <p><strong>Duration:</strong> {booking.duration} days</p>
              <p><strong>Status:</strong> Pending (for now)</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;

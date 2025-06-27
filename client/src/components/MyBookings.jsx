import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './MyBookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      const user = auth.currentUser;
      if (!user) {
        alert('Please login to view your bookings.');
        navigate('/login');
        return;
      }

      try {
        const q = query(collection(db, 'bookings'), where('userId', '==', user.uid));
        const snapshot = await getDocs(q);
        const data = [];

        for (let docSnap of snapshot.docs) {
          const booking = docSnap.data();
          const propertyRef = doc(db, 'properties', booking.propertyId);
          const propertySnap = await getDoc(propertyRef);
          const property = propertySnap.exists() ? propertySnap.data() : {};
          data.push({ id: docSnap.id, ...booking, property });
        }

        setBookings(data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        alert('Failed to load bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  if (loading) return <div style={{ padding: '30px' }}>Loading your bookings...</div>;

  return (
    <div className="my-bookings-page">
      <h2>My Bookings</h2>

      {bookings.length === 0 ? (
        <p>You have not made any bookings yet.</p>
      ) : (
        <div className="bookings-grid">
          {bookings.map((booking) => (
            <div className="booking-card" key={booking.id}>
              <h3>{booking.property?.name || 'Unknown Property'}</h3>
              <p><strong>Address:</strong> {booking.property?.address}</p>
              <p><strong>Near:</strong> {booking.property?.hospitalNearby}</p>
              <p><strong>Booking Date:</strong> {booking.date}</p>
              <p><strong>Duration:</strong> {booking.duration} days</p>
              <p><strong>Special Needs:</strong> {booking.specialNeeds || 'None'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import './BookNow.css';

const BookNow = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    disease: '',
    specialNeeds: '',
    date: '',
    duration: '',
  });
  const [user, setUser] = useState(null);
  console.log('Booking property:', property);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const docRef = doc(db, 'properties', propertyId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProperty({ id: docSnap.id, ...docSnap.data() });
        } else {
          alert('Property not found.');
          navigate('/listings');
        }
      } catch (err) {
        console.error('Error fetching property:', err);
      }
    };

    fetchProperty();
  }, [propertyId, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please login to book a stay.');
      navigate('/login');
      return;
    }

    if (!property?.providerId) {
    alert('Property data is missing provider ID.');
    return;
    }

    try {
      await addDoc(collection(db, 'bookings'), {
      ...formData,
      userId: user.uid,
      propertyId: property.id,
      providerId: property.providerId,  // <-- this line is essential
      bookedAt: new Date(),
      status: 'pending',
    });

      alert('Booking request submitted!');
      navigate('/listings');
    } catch (err) {
      console.error('Booking error:', err);
      alert('Failed to book. Please try again.');
    }
  };

  return (
    <div className="booknow-page">
      <div className="booknow-card">
        <h2>Book a Stay</h2>

        {property ? (
          <div className="property-details">
            <h3>{property.name}</h3>
            <p><strong>Address:</strong> {property.address}</p>
            <p><strong>Near:</strong> {property.hospitalNearby}</p>
          </div>
        ) : (
          <p>Loading property...</p>
        )}

        <form className="booking-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Your Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="disease"
            placeholder="Disease Type"
            value={formData.disease}
            onChange={handleChange}
          />
          <input
            type="text"
            name="specialNeeds"
            placeholder="Special Needs (if any)"
            value={formData.specialNeeds}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="duration"
            placeholder="Duration of Stay (days)"
            value={formData.duration}
            onChange={handleChange}
            required
          />

          <button type="submit" className="submit-booking">Submit Booking</button>
        </form>
      </div>
    </div>
  );
};

export default BookNow;

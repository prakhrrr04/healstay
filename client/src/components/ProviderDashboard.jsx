import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './ProviderDashboard.css';

const ProviderDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        alert('You must be logged in to access this page.');
        navigate('/login');
        return;
      }

      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      const role = userSnap.exists() ? userSnap.data().role : null;

      if (role !== 'provider') {
        alert('Only providers can access the dashboard.');
        navigate('/');
        return;
      }

      const propertyQuery = query(collection(db, 'properties'), where('providerId', '==', user.uid));
      const propertySnapshot = await getDocs(propertyQuery);
      const listedProperties = propertySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProperties(listedProperties);

      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) return <div style={{ padding: '30px' }}>Loading your dashboard...</div>;

  return (
    <div className="dashboard-wrapper">
      <div className="nav-bar">
        <button onClick={() => navigate('/provider-bookings')}>Manage Bookings</button>
      </div>
      <h2>My Property Listings</h2>
      {properties.length === 0 ? (
        <p>You haven't listed any properties yet.</p>
      ) : (
        <div className="dashboard-grid">
          {properties.map((prop) => (
            <div className="property-card" key={prop.id}>
              <h3>{prop.name}</h3>
              <p><strong>Address:</strong> {prop.address}</p>
              <p><strong>Nearby Hospital:</strong> {prop.hospitalNearby}</p>
              <p><strong>Facilities:</strong> {prop.facilities?.join(', ')}</p>
              <p>{prop.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderDashboard;

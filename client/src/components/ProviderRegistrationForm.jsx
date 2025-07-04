import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './ProviderRegistrationForm.css';

const ProviderRegistrationForm = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [hospitalList, setHospitalList] = useState([]);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [hospitalNearby, setHospitalNearby] = useState('');
  const [facilities, setFacilities] = useState([]);
  const [description, setDescription] = useState('');

  const allFacilities = ['Wheelchair Access', 'Oxygen Supply', '24/7 Caretaker', 'Kitchen Access'];

  //login status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setCurrentUser(user);
      else navigate('/login');
    });
    return () => unsubscribe();
  }, []);

  //fetch the hospitals
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'hospitals'));
        const hospitals = snapshot.docs.map(doc => doc.data().name);
        setHospitalList(hospitals);
      } catch (err) {
        console.error('Error fetching hospitals:', err);
      }
    };
    fetchHospitals();
  }, []);

  const handleFacilityToggle = (facility) => {
    setFacilities(prev =>
      prev.includes(facility)
        ? prev.filter(f => f !== facility)
        : [...prev, facility]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      await addDoc(collection(db, 'properties'), {
      uid: currentUser.uid,
      name,
      contact,
      address,
      hospitalNearby,
      facilities,
      description,
      createdAt: new Date(),
      providerId: currentUser.uid  // ✅ This must exist
    });


      alert("Property submitted successfully!");
      navigate('/');
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to submit property");
    }
  };

  return (
    <div className="provider-form-wrapper">
      <div className="form-container">
        <h2>Register Your Property</h2>
        <p>Provide accurate details to help patients find your place easily.</p>
        <form onSubmit={handleSubmit}>
          <label>Name:
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
          </label>

          <label>Contact Info:
            <input type="text" required value={contact} onChange={(e) => setContact(e.target.value)} />
          </label>

          <label>Address:
            <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} />
          </label>

          {/* Changed hospital input to dropdown */}
          <label>Nearby Hospital:
            <select
              required
              value={hospitalNearby}
              onChange={(e) => setHospitalNearby(e.target.value)}
            >
              <option value="">Select a hospital</option>
              {hospitalList.map((hospital, index) => (
                <option key={index} value={hospital}>{hospital}</option>
              ))}
            </select>
          </label>

          <label>Description:
            <textarea required value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>

          <label>Facilities:</label>
          <div className="facilities-grid">
            {allFacilities.map(facility => (
              <label key={facility} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={facilities.includes(facility)}
                  onChange={() => handleFacilityToggle(facility)}
                />
                {facility}
              </label>
            ))}
          </div>

          <button type="submit">Submit Property</button>
        </form>
      </div>
    </div>
  );
};

export default ProviderRegistrationForm;

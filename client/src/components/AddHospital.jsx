import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import './AddHospital.css'; // optional styling

const AddHospital = () => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [specialties, setSpecialties] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !city) {
      alert('Name and city are required');
      return;
    }

    try {
      await addDoc(collection(db, 'hospitals'), {
        name,
        city,
        specialties: specialties.split(',').map((s) => s.trim()),
      });
      alert('Hospital added successfully!');
      setName('');
      setCity('');
      setSpecialties('');
    } catch (err) {
      console.error('Error adding hospital:', err);
      alert('Failed to add hospital');
    }
  };

  return (
    <div className="hospital-form-wrapper">
      <div className="hospital-form-container">
        <h2>Add New Hospital</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Hospital Name:
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            City:
            <input value={city} onChange={(e) => setCity(e.target.value)} required />
          </label>
          <label>
            Specialties (comma separated):
            <input value={specialties} onChange={(e) => setSpecialties(e.target.value)} />
          </label>
          <button type="submit">Add Hospital</button>
        </form>
      </div>
    </div>
  );
};

export default AddHospital;

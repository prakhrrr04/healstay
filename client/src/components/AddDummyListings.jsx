import React, { useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const AddDummyListings = () => {
  useEffect(() => {
    const dummyListings = [
      {
        name: 'Comfort Care Home',
        address: 'Sector 22, Delhi',
        hospitalNearby: 'AIIMS',
        facilities: ['Wheelchair Access', '24/7 Nurse', 'Air Conditioning'],
        description: 'Safe and affordable stay near AIIMS hospital.',
      },
      {
        name: 'Peace Inn',
        address: 'BTM Layout, Bangalore',
        hospitalNearby: 'Narayana Health',
        facilities: ['Oxygen Supply', 'Kitchen Access', 'Private Bathroom'],
        description: 'A cozy place equipped for patient needs.',
      },
      {
        name: 'Healing Homestay',
        address: 'Andheri West, Mumbai',
        hospitalNearby: 'Kokilaben Hospital',
        facilities: ['Elevator', 'WiFi', 'Attendant Room'],
        description: 'Spacious and supportive stay near hospital.',
      },
      {
        name: 'CureNest Apartment',
        address: 'Salt Lake, Kolkata',
        hospitalNearby: 'Apollo Gleneagles',
        facilities: ['Lift', 'Cooking Facilities', 'Clean Air Purifier'],
        description: 'Quiet place near Apollo, good for recovery.',
      },
    ];

    const addDummyData = async () => {
      try {
        for (let listing of dummyListings) {
          await addDoc(collection(db, 'properties'), listing);
        }
        alert('Dummy listings added!');
      } catch (err) {
        console.error('Error adding dummy data:', err);
      }
    };

    addDummyData();
  }, []);

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>Adding dummy listings...</h2>
      <p>This will only run once. Remove this route afterward.</p>
    </div>
  );
};

export default AddDummyListings;

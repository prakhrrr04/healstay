import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useLocation } from 'react-router-dom';
import './ListingsPage.css';

const ListingsPage = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get('query')?.toLowerCase() || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'properties'));
        const all = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setListings(all);

        const result = all.filter((item) =>
          item.hospitalNearby?.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query) ||
          item.address?.toLowerCase().includes(query)
        );
        setFiltered(result);
      } catch (err) {
        console.error('Error fetching listings:', err);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="listings-page">
      <h2>Available Properties</h2>
      {filtered.length === 0 ? (
        <p className="no-results">No results found for "{query}"</p>
      ) : (
        <div className="listings-grid">
          {filtered.map((item) => (
            <div className="listing-card" key={item.id}>
              <h3>{item.name}</h3>
              <p><strong>Location:</strong> {item.address}</p>
              <p><strong>Near:</strong> {item.hospitalNearby}</p>
              <p><strong>Facilities:</strong> {item.facilities?.join(', ')}</p>
              <p><strong>Description:</strong> {item.description}</p>
              <button
  onClick={() => navigate(`/book-now/${item.id}`)}
  className="book-now-btn"
>
  Book Now
</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListingsPage;

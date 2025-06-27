import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './ListingsPage.css';

const ListingsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtered, setFiltered] = useState([]);

  // Extract initial query from URL
  useEffect(() => {
    const initialQuery = new URLSearchParams(location.search).get('query') || '';
    setSearchTerm(initialQuery);
  }, [location.search]);

  // Fetch all listings on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'properties'));
        const all = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setListings(all);
        setFiltered(applyFilter(all, searchTerm));
      } catch (err) {
        console.error('Error fetching listings:', err);
      }
    };

    fetchData();
  }, []);

  // Re-filter listings when search term changes
  useEffect(() => {
    setFiltered(applyFilter(listings, searchTerm));
  }, [searchTerm, listings]);

  // Filter function
  const applyFilter = (data, term) => {
    const lower = term.toLowerCase();
    return data.filter(item =>
      item.hospitalNearby?.toLowerCase().includes(lower) ||
      item.description?.toLowerCase().includes(lower) ||
      item.address?.toLowerCase().includes(lower) ||
      item.facilities?.some(fac => fac.toLowerCase().includes(lower))
    );
  };

  return (
    <div className="listings-page">
      <h2>Available Properties</h2>

      {/* 🔍 Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by facilities, hospital, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="no-results">No results found for "{searchTerm}"</p>
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

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import './LandingPage.css';

const LandingPage = () => { 
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [showProviderPrompt, setShowProviderPrompt] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserRole(docSnap.data().role);
        } else {
          setUserRole(null);
        }
      } else {
        setUserRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserRole(null);
      alert('Logged out successfully');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to logout');
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/listings?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleRegisterClick = async () => {
  if (!auth.currentUser) {
    setShowProviderPrompt(true);  // Show modal instead of redirecting immediately
    return;
  }

  try {
    const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
    if (userDoc.exists() && userDoc.data().role === 'provider') {
      navigate('/register-provider');
    } else {
      alert('Only provider accounts can register properties.');
    }
  } catch (err) {
    console.error(err);
    alert('Error verifying user role.');
  }
};



  return (
    <div className="page">
      {/* NAVBAR */}
      <div className="navbar">
        <div className="container navbar-content">
          <div className="logo" onClick={() => navigate('/')}>HealStay</div>

          <div className="nav-search">
            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Search stays..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch();
                }}
              />
              <button onClick={handleSearch} className="search-icon-btn"> <i className="fas fa-search"></i> </button>
            </div>
          </div>

          <div className="nav-actions">
            {currentUser ? (
              <button className="nav-link" onClick={handleLogout}>Logout</button>
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/signup" className="signup-btn">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="hero">
        <div className="container">
          <h1>Welcome to <span className="highlight">HealStay</span></h1>
          <p>Find verified accommodations near hospitals tailored for patients and caregivers.</p>
          <div className="hero-buttons">
            <button onClick={handleRegisterClick} className="primary-btn">
              Register Property
            </button>
            <button onClick={() => navigate('/listings')} className="secondary-btn">
                Find a Stay
            </button>

          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="features-section">
        <div className="container">
          <h2>Why Choose HealStay?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🏥 Near Hospitals</h3>
              <p>Stays near top hospitals to reduce patient stress.</p>
            </div>
            <div className="feature-card">
              <h3>🛏️ Medical Support</h3>
              <p>Facilities like wheelchair access and oxygen supply.</p>
            </div>
            <div className="feature-card">
              <h3>✅ Verified Listings</h3>
              <p>Trusted homes with verified infrastructure.</p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          © {new Date().getFullYear()} HealStay — For every healing journey.
        </div>
      </footer>

      {showProviderPrompt && (
      <div className="modal-overlay">
      <div className="modal">
      <h3>Register as Provider</h3>
      <p>You need to login or sign up as a provider to register a property.</p>
      <div className="modal-buttons">
        <button onClick={() => navigate('/login')}>Login</button>
        <button onClick={() => navigate('/signup?role=provider')}>Sign Up</button>
        <button onClick={() => setShowProviderPrompt(false)}>Cancel</button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default LandingPage;

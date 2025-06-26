import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="page">
      {/* NAVBAR */}
      <div className="navbar">
        <div className="container navbar-content">
          <div className="logo">HealStay</div>
          <div className="nav-actions">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/signup" className="signup-btn">Sign Up</Link>
      </div>
    </div>
  </div>


<div className="hero">
  <div className="container">
    {/* Hero content here */}
          <h1>Welcome to <span className="highlight">HealStay</span></h1>
          <p>Find verified accommodations near hospitals tailored for patients and caregivers.</p>
          <div className="hero-buttons">
            <button onClick={() => navigate('/register-provider')} className="primary-btn">
              Register Property
            </button>
            <button onClick={() => navigate('/request-accommodation')} className="secondary-btn">
              Find a Stay
            </button>
          </div>    
  </div>
</div>

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



      {/* HERO SECTION
      <section className="hero">
        <div className="container hero-content">
          <h1>Welcome to <span className="highlight">HealStay</span></h1>
          <p>Find verified accommodations near hospitals tailored for patients and caregivers.</p>
          <div className="hero-buttons">
            <button onClick={() => navigate('/register-provider')} className="primary-btn">
              Register Property
            </button>
            <button onClick={() => navigate('/request-accommodation')} className="secondary-btn">
              Find a Stay
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      {/* <section className="features">
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
      </section> */}

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          © {new Date().getFullYear()} HealStay — For every healing journey.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

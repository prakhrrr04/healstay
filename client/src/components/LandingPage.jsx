import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* ✅ Login Button */}
      <div className="top-bar">
        <Link to="/login" className="login-link">Login</Link>
      </div>

      <header className="hero">
        <h1>Welcome to <span className="brand">HealStay</span></h1>
        <p>Find verified accommodations near hospitals tailored for patients and caregivers.</p>
        <div className="hero-buttons">
          <button className="primary-btn" onClick={() => navigate('/register-provider')}>
            Register Property
          </button>
          <button className="secondary-btn" onClick={() => navigate('/request-accommodation')}>
            Find a Stay
          </button>
        </div>
      </header>

      <section className="features">
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
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} HealStay — For every healing journey.
      </footer>
    </div>
  );
};

export default LandingPage;

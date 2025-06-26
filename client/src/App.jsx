import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import ProviderRegistrationForm from './components/ProviderRegistrationForm';
import ConsumerForm from './components/ConsumerForm';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignUpPage'; 
import ListingsPage from './components/ListingsPage'; // Add this at the top

// Inside <Routes>:




import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register-provider" element={<ProviderRegistrationForm />} />
        <Route path="/request-accommodation" element={<ConsumerForm />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} /> {/* ✅ This must exist */}
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ProviderRegistrationForm from './components/ProviderRegistrationForm';
import ConsumerForm from './components/ConsumerForm';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignUpPage'; 
import ListingsPage from './components/ListingsPage';
import ProviderDashboard from './components/ProviderDashboard'; 
import BookNow from './components/BookNow';
import MyBookings from './components/MyBookings'; 
import AddHospital from './components/AddHospital';
import ProviderBookings from './components/ProviderBookings';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register-provider" element={<ProviderRegistrationForm />} />
        <Route path="/request-accommodation" element={<ConsumerForm />} />
        <Route path="/add-hospital" element={<AddHospital />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/book-now/:propertyId" element={<BookNow />} />
        <Route path="/provider-dashboard" element={<ProviderDashboard />} />
        <Route path="/provider-bookings" element={<ProviderBookings />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;

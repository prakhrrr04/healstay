import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import ProviderRegistrationForm from './components/ProviderRegistrationForm';
import ConsumerForm from './components/ConsumerForm';
import Login from './components/login';

console.log("App loaded");

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register-provider" element={<ProviderRegistrationForm />} />
        <Route path="/request-accommodation" element={<ConsumerForm />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

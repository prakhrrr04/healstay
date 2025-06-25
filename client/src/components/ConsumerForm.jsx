import React from 'react';
import './ConsumerForm.css';

const ConsumerForm = () => {
  return (
    <div className="form-wrapper">
      <h2>Find a Stay</h2>
      <form className="consumer-form">
        <label>
          Full Name
          <input type="text" placeholder="Enter your full name" />
        </label>

        <label>
          Patient Disease Type
          <input type="text" placeholder="e.g. Cancer, Dialysis" />
        </label>

        <label>
          Required Proximity To
          <input type="text" placeholder="e.g. AIIMS Delhi" />
        </label>

        <label>
          Budget Range
          <input type="text" placeholder="e.g. ₹1000–₹3000 per night" />
        </label>

        <label>
          Special Needs
          <textarea placeholder="e.g. Wheelchair, Child Care, Diet Requirements" />
        </label>

        <label>
          Required From
          <input type="date" />
        </label>

        <label>
          Duration of Stay (days)
          <input type="number" />
        </label>

        <button type="submit">Request Stay</button>
      </form>
    </div>
  );
};

export default ConsumerForm;

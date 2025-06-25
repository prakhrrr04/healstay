import React from 'react';
import './ProviderRegistrationForm.css';

const ProviderRegistrationForm = () => {
  return (
    <div className="form-wrapper">
      <h2>Register Your Property</h2>
      <form className="provider-form">
        <label>
          Full Name
          <input type="text" placeholder="Enter your full name" />
        </label>

        <label>
          Property Location
          <input type="text" placeholder="City, State" />
        </label>

        <label>
          Capacity (No. of patients/family members)
          <input type="number" />
        </label>

        <label>
          Medical Facilities Available
          <textarea placeholder="E.g., Wheelchair access, Oxygen, Nurse on-call" />
        </label>

        <label>
          Nearby Hospitals
          <input type="text" placeholder="e.g. AIIMS Delhi, Fortis" />
        </label>

        <label>
          Pricing Model
          <select>
            <option>Free</option>
            <option>Subsidized</option>
            <option>Commercial</option>
          </select>
        </label>

        <label>
          Availability Dates
          <input type="date" />
        </label>

        <label>
          Type of Care Supported
          <input type="text" placeholder="e.g. Cancer Recovery, Post-Transplant" />
        </label>

        <button type="submit">Submit Property</button>
      </form>
    </div>
  );
};

export default ProviderRegistrationForm;

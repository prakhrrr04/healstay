import React, { useState } from 'react';
import '../App.css'; // Or wherever your CSS is

const facilities = [
  "Wheelchair Access",
  "Oxygen Supply",
  "Nurse Availability",
  "Ambulance Service",
  "In-house Pharmacy",
  "24x7 Support"
];

const pricingTypes = ["Free", "Subsidized", "Commercial"];

export default function ProviderRegistrationForm() {
  const [formData, setFormData] = useState({
    propertyName: '',
    providerName: '',
    email: '',
    contactNumber: '',
    location: '',
    capacity: '',
    hospital: '',
    facilities: [],
    pricing: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        facilities: checked
          ? [...prev.facilities, value]
          : prev.facilities.filter((f) => f !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Form Submitted! Check console for output.");
  };

  return (
    <div className="form-container">
      <h2>Provider Registration</h2>
      <p>Register your medical-supportive property</p>

      <form onSubmit={handleSubmit}>
        <div className="grid-2">
          <input name="propertyName" placeholder="Property Name" onChange={handleChange} />
          <input name="providerName" placeholder="Provider Name" onChange={handleChange} />
          <input name="email" placeholder="Email" type="email" onChange={handleChange} />
          <input name="contactNumber" placeholder="Contact Number" onChange={handleChange} />
          <input name="location" placeholder="Location" onChange={handleChange} />
          <input name="capacity" placeholder="Capacity" type="number" onChange={handleChange} />
        </div>

        <div>
          <label>Nearby Hospital(s)</label>
          <select name="hospital" onChange={handleChange}>
            <option value="">Select one</option>
            <option value="Apollo">Apollo</option>
            <option value="Fortis">Fortis</option>
            <option value="AIIMS">AIIMS</option>
          </select>
        </div>

        <div>
          <label>Facilities Available</label>
          <div className="facilities-grid">
            {facilities.map((facility) => (
              <label key={facility} className="checkbox-label">
                <input type="checkbox" value={facility} onChange={handleChange} />
                {facility}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label>Pricing Type</label>
          <div className="radio-group">
            {pricingTypes.map((type) => (
              <label key={type} className="radio-label">
                <input type="radio" name="pricing" value={type} onChange={handleChange} />
                {type}
              </label>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <button type="submit">Submit Registration</button>
        </div>
      </form>
    </div>
  );
}

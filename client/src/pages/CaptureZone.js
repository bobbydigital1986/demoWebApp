import React, { useState } from 'react';
import Bugsnag from '@bugsnag/js';

function CaptureZone() {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    location: '',
    captured: false
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Validate form data before submission
      if (!formData.name || !formData.species || !formData.location) {
        const validationError = new Error('All fields are required to capture an insect');
        Bugsnag.notify(validationError);
        setError(validationError.message);
        setTimeout(() => setError(null), 5000);
        return;
      }
      
      const response = await fetch('http://localhost:5000/api/insects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`Failed to capture insect: ${response.status}`);
      }
      
      setSuccess(true);
      setFormData({ name: '', species: '', location: '', captured: false });
      setTimeout(() => setSuccess(false), 3000);
      
    } catch (err) {
      Bugsnag.notify(err);
      setError('Error adding insect to collection: ' + err.message);
      console.error('Error adding insect:', err);
      setTimeout(() => setError(null), 5000);
    }
  };

  // Removed test error buttons - not suitable for production

  return (
    <div className="page">
      <h2>🦗 Capture Zone</h2>
      <p>
        Found a new insect? Record your discovery here! Fill in the details about your find
        and add it to your growing collection.
      </p>

      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}

      {success && (
        <div className="error-message" style={{ backgroundColor: '#d4edda', borderColor: '#c3e6cb', color: '#155724' }}>
          <strong>Success!</strong> Insect added to your collection!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Common Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Monarch Butterfly"
            required
          />
        </div>

        <div className="form-group">
          <label>Scientific Name:</label>
          <input
            type="text"
            name="species"
            value={formData.species}
            onChange={handleChange}
            placeholder="e.g., Danaus plexippus"
            required
          />
        </div>

        <div className="form-group">
          <label>Location Found:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Garden, Forest, Pond"
            required
          />
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="captured"
              checked={formData.captured}
              onChange={handleChange}
            />
            {' '}Mark as Captured
          </label>
        </div>

        <button type="submit" className="btn-primary">
          Add to Collection
        </button>
      </form>
    </div>
  );
}

export default CaptureZone;

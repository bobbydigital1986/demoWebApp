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
      const response = await fetch('http://localhost:5000/api/insects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', species: '', location: '', captured: false });
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Error adding insect:', err);
    }
  };

  const handleException = () => {
    try {
      // Simulate validation error
      if (formData.name === '') {
        throw new Error('Cannot capture insect without a name!');
      }
      throw new Error('Simulated capture failure - try again!');
    } catch (err) {
      Bugsnag.notify(err);
      setError(err.message);
      console.error('Caught error:', err);
      setTimeout(() => setError(null), 5000);
    }
  };

  const crashApp = () => {
    // This will crash the app
    const buggyArray = null;
    buggyArray.forEach(item => console.log(item)); // TypeError
  };

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

      <div className="error-buttons">
        <button className="btn-handled-error" onClick={handleException}>
          Generate Handled Exception
        </button>
        <button className="btn-crash" onClick={crashApp}>
          Crash Application
        </button>
      </div>

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

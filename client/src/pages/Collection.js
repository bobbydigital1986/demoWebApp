import React, { useState, useEffect } from 'react';
import Bugsnag from '@bugsnag/js';

function Collection() {
  const [insects, setInsects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInsects();
  }, []);

  const fetchInsects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/bugs');
      const data = await response.json();
      setInsects(data);
      setLoading(false);
    } catch (err) {
      Bugsnag.notify(err)  
      console.error('Error fetching insects:', err);
      setLoading(false);
    }
  };

  const handleException = () => {
    try {
      // Simulate a handled exception
      const invalidData = JSON.parse('invalid json');
      console.log(invalidData);
    } catch (err) {
      Bugsnag.notify(err);
      setError('Failed to parse insect data: ' + err.message);
      console.error('Caught error:', err);
      setTimeout(() => setError(null), 5000);
    }
  };

  const crashApp = () => {
    // Force a crash by accessing undefined property
    const undefinedObject = undefined;
    undefinedObject.map(item => item); // This will crash
  };

  return (
    <div className="page">
      <h2>🐛 My Insect Collection</h2>
      <p>
        Here's your personal collection of captured insects. Each entry includes detailed
        information about the species, where it was found, and its capture status.
      </p>

      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
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

      {loading ? (
        <p>Loading your collection...</p>
      ) : (
        <div className="insect-grid">
          {insects.map(insect => (
            <div key={insect.id} className="insect-card">
              <h3>{insect.name}</h3>
              <p><strong>Species:</strong> {insect.species}</p>
              <p><strong>Location:</strong> {insect.location}</p>
              <span className={insect.captured ? 'badge badge-captured' : 'badge badge-not-captured'}>
                {insect.captured ? 'Captured ✓' : 'Not Captured'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Collection;

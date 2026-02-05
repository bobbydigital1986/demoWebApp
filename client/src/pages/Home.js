import React, { useState } from 'react';
import Bugsnag from '@bugsnag/js';

function Home() {
  const [error, setError] = useState(null);

  const handleException = () => {
    try {
      // Simulate a handled exception
      throw new Error('This is a handled exception on the Home page!');
    } catch (err) {
      Bugsnag.notify(err);
      setError(err.message);
      console.error('Caught error:', err);
      setTimeout(() => setError(null), 5000); // Clear error after 5 seconds
    }
  };

  const crashApp = () => {
    // This will cause an unhandled error and crash the app
    const obj = null;
    obj.doSomething(); // This will throw TypeError
  };

  return (
    <div className="page">
      <h2>🦋 Welcome to Insect Capture</h2>
      <p>
        Welcome to your digital insect collection! Explore the fascinating world of insects,
        document your findings, and build an impressive collection of nature's tiny wonders.
      </p>
      
      <div className="stats-container">
        <div className="stat-card">
          <h3>52</h3>
          <p>Total Species</p>
        </div>
        <div className="stat-card">
          <h3>38</h3>
          <p>Captured</p>
        </div>
        <div className="stat-card">
          <h3>14</h3>
          <p>Remaining</p>
        </div>
      </div>

      <p>
        Navigate through the app to view your collection, capture new insects, and learn more
        about different species. Each insect has unique characteristics and behaviors waiting
        to be discovered!
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
    </div>
  );
}

export default Home;

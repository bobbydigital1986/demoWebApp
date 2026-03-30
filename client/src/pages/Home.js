import React, { useState } from 'react';
import Bugsnag from '@bugsnag/js';

function Home() {
  const [error, setError] = useState(null);

  // Removed test error buttons - not suitable for production

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
    </div>
  );
}

export default Home;

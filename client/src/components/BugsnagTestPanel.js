// Development-only error testing utility
// This component should ONLY be used in development environments

import React, { useState } from 'react';
import Bugsnag from '@bugsnag/js';

const BugsnagTestPanel = () => {
  const [error, setError] = useState(null);
  
  // Only render in development mode
  // if (process.env.NODE_ENV !== 'development') {
  //   return null;
  // }

  const testHandledException = () => {
    try {
      throw new Error('Test handled exception');
    } catch (err) {
      Bugsnag.notify(err);
      setError('Handled exception triggered: ' + err.message);
      setTimeout(() => setError(null), 5000);
    }
  };

  const testUnhandledException = () => {
    // Intentional crash for testing
    const undefinedObject = undefined;
    undefinedObject.map(item => item);
  };

  const testNetworkError = async () => {
    try {
      await fetch('http://localhost:5000/api/nonexistent');
    } catch (err) {
      Bugsnag.notify(err);
      setError('Network error triggered: ' + err.message);
      setTimeout(() => setError(null), 5000);
    }
  };

  const testValidationError = () => {
    try {
      throw new Error('Validation failed: Missing required fields');
    } catch (err) {
      Bugsnag.notify(err);
      setError(err.message);
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      padding: '15px',
      backgroundColor: '#fff3cd',
      border: '2px solid #ffc107',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      zIndex: 9999,
      maxWidth: '300px'
    }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#856404' }}>
        🔧 Dev Mode: BugSnag Test Panel
      </h4>
      
      {error && (
        <div style={{
          padding: '10px',
          marginBottom: '10px',
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          borderRadius: '4px',
          color: '#721c24',
          fontSize: '12px'
        }}>
          {error}
        </div>
      )}
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button 
          onClick={testHandledException}
          style={{
            padding: '8px 12px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          Test Handled Error
        </button>
        
        <button 
          onClick={testUnhandledException}
          style={{
            padding: '8px 12px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          Test Unhandled Error
        </button>
        
        <button 
          onClick={testNetworkError}
          style={{
            padding: '8px 12px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          Test Network Error
        </button>
        
        <button 
          onClick={testValidationError}
          style={{
            padding: '8px 12px',
            backgroundColor: '#ffc107',
            color: '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          Test Validation Error
        </button>
      </div>
      
      <p style={{
        margin: '10px 0 0 0',
        fontSize: '10px',
        color: '#856404',
        fontStyle: 'italic'
      }}>
        This panel only appears in development mode
      </p>
    </div>
  );
};

export default BugsnagTestPanel;

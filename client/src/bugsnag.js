import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import BugsnagPerformance from '@bugsnag/browser-performance';
import React from 'react';

// Initialize Bugsnag for error monitoring
Bugsnag.start({
  apiKey: process.env.REACT_APP_BUGSNAG_API_KEY || 'YOUR_BUGSNAG_API_KEY_HERE',
  plugins: [new BugsnagPluginReact(React)],
  releaseStage: process.env.NODE_ENV || 'development',
  enabledReleaseStages: ['production', 'staging', 'development'],
  appVersion: process.env.REACT_APP_VERSION || '1.0.0',
  // Enable source map support
  enabledBreadcrumbTypes: ['navigation', 'request', 'process', 'log', 'user', 'state', 'error', 'manual'],
  maxBreadcrumbs: 40,
  // Callback to add additional metadata
  onError: function(event) {
    event.addMetadata('app', {
      component: 'InsectCaptureApp',
      buildTime: new Date().toISOString()
    });
  }
});

// Initialize Bugsnag Performance monitoring
BugsnagPerformance.start({
  apiKey: process.env.REACT_APP_BUGSNAG_API_KEY || 'YOUR_BUGSNAG_API_KEY_HERE',
  releaseStage: process.env.NODE_ENV || 'development',
  enabledReleaseStages: ['production', 'staging', 'development'],
  appVersion: process.env.REACT_APP_VERSION || '1.0.0',
  // Automatic instrumentation
  autoInstrumentFullPageLoads: true,
  autoInstrumentRouteChanges: true,
  autoInstrumentNetworkRequests: true,
  // Network request configuration
  networkRequestCallback: (requestInfo) => {
    // You can modify or filter network requests here
    return requestInfo;
  }
});

export const BugsnagErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);
export default Bugsnag;

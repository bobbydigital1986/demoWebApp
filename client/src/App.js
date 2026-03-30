import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import CaptureZone from './pages/CaptureZone';
import InsectGuide from './pages/InsectGuide';
import BugsnagTestPanel from './components/BugsnagTestPanel';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <h1 className="logo">🦋 Insect Capture</h1>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/collection">My Collection</Link></li>
              <li><Link to="/capture">Capture Zone</Link></li>
              <li><Link to="/guide">Insect Guide</Link></li>
            </ul>
          </div>
        </nav>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/capture" element={<CaptureZone />} />
            <Route path="/guide" element={<InsectGuide />} />
          </Routes>
        </main>
        
        <footer className="footer">
          <p>© 2026 Insect Capture App - Explore & Document Nature 🐛</p>
        </footer>
        
        {/* Development-only BugSnag test panel */}
        <BugsnagTestPanel />
      </div>
    </Router>
  );
}

export default App;

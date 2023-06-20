import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

function NavigationBar() {
  return (
    <div className="navigation-bar">
      <div className="logo">VKR App</div>
      <Link to="/" className="logout-button">Logout</Link>
    </div>
  );
}

export default NavigationBar;


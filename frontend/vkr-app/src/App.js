import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import ChatPage from './components/ChatPage/ChatPage';
import './index.css';
import NavigationBar from './components/NavigationBar/NavigationBar';

function App() {
  return (
    <div className="app">
      <NavigationBar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/stats" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;



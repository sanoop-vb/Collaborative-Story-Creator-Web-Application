import logo from './logo.svg';
import './App.css';
import './index.css'
import React, { useState, useEffect } from 'react';


import StoryList from './Components/StoryList';
import CreateStory from './Components/CreateStory';
import StoryDetails from './Components/StoryDetails';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignInSignUp from './Components/Authenticaton/SignInSignUp';


import HomePage from './Components/Homepage';

function App() {
  const isAuthenticated = !!localStorage.getItem('access_token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInSignUp />} />
        
        {isAuthenticated ? (
          <>
            <Route path="/home" element={<HomePage />} />
            <Route path="/create" element={<CreateStory />} />
            <Route path="/stories" element={<StoryList />} />
            <Route path="/stories/:id" element={<StoryDetails />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
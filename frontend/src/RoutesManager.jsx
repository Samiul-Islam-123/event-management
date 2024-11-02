// src/RoutesManager.js
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios'; // Make sure to install axios

import LandingPage from './pages/public/LandingPage';
import EventsPage from './pages/private/EventsPage';
import ProfilePage from './pages/private/ProfilePage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import { FullScreenLoader } from './components/FullScreenLoader';
import EventsDetails from './pages/private/EventsDetails';
import Cookies from "js-cookie"

function RoutesManager() {
  const { isSignedIn, isLoaded, user } = useUser(); // Get the user object for additional info
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      setLoading(false);
      // Only send API request if the user is signed in
      if (isSignedIn && user) {
        //alert('Checking if user exists...'); // Alert before making the API call
        checkIfUserExists(user);
      }
    }
    console.log(user);
    console.log('isSignedIn:', isSignedIn);
  }, [isLoaded, isSignedIn, user]);

  const checkIfUserExists = async (user) => {
      //console.log(`${import.meta.env.VITE_API_URL}/user/check`);
      //console.log(user.emailAddresses[0].emailAddress)
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/check`, {
        email: user.emailAddresses[0].emailAddress, // Adjust based on your user object structure
      });
      console.log(response.data);

      if (!response.data.exists) {
        // If the user does not exist, send their data to the server
        //alert('User does not exist, sending user data to server...'); // Alert before sending data
        sendUserDataToServer(user);
      } else {
        localStorage.setItem('user_id',response.data.user._id)
        Cookies.set('user_id', response.data.user._id)
        console.log('User already exists, no need to save:', response.data.user);
      }
    } catch (error) {
      console.error('Error checking user existence:', error);
      alert('Error checking user existence.'); // Alert on error
    }
  };

  const sendUserDataToServer = async (user) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user`, {
        email: user.emailAddresses[0].emailAddress, // Adjust based on your user object structure
        username: user.fullName,
        clerkID: user.id
      });
      console.log('User data saved successfully:', response.data);
      //alert('User data saved successfully!'); // Alert on success
    } catch (error) {
      console.error('Error saving user data:', error);
      alert('Error saving user data.'); // Alert on error
    }
  };

  if (loading) {
    return <div><FullScreenLoader /></div>;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected Routes */}
      <Route path="/app/events" element={isSignedIn ? <EventsPage /> : <Navigate to="/login" />} />
      <Route path="/app/profile" element={isSignedIn ? <ProfilePage /> : <Navigate to="/login" />} />
      <Route path="/app/eventDetails/:eventID" element={isSignedIn ? <EventsDetails /> : <Navigate to="/login" />} />

      {/* Catch-all Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RoutesManager;
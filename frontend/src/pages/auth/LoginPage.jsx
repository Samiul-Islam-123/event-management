// src/pages/auth/LoginPage.js
import React from 'react';
import { SignIn } from '@clerk/clerk-react';

function LoginPage() {
  return (
    <div className=' h-screen w-screen flex flex-col justify-center items-center gap-8'>
      <h2 className=' text-6xl qwigley-regular'>Login</h2>
      <SignIn path="/login" routing="path" />
    </div>
  );
}

export default LoginPage;

// src/pages/SignupPage.js
import React from 'react';
import { SignUp } from '@clerk/clerk-react';

function SignupPage() {
  return (
    <div className=' h-screen w-screen flex flex-col justify-center items-center gap-8'>
      <h2 className=' text-6xl qwigley-regular'>Sign Up</h2>
      <SignUp path="/signup" routing="path" />
    </div>
  );
}

export default SignupPage;

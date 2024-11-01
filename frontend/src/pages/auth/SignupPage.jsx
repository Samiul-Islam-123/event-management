// src/pages/SignupPage.js
import React from 'react';
import { SignUp } from '@clerk/clerk-react';

function SignupPage() {
  return (
    <div>
      <h2>Sign Up</h2>
      <SignUp path="/signup" routing="path" />
    </div>
  );
}

export default SignupPage;

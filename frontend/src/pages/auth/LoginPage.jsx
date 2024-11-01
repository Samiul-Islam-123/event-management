// src/pages/auth/LoginPage.js
import React from 'react';
import { SignIn } from '@clerk/clerk-react';

function LoginPage() {
  return (
    <div>
      <h2>Login</h2>
      <SignIn path="/login" routing="path" />
    </div>
  );
}

export default LoginPage;

import React from 'react';
import { SignIn } from '@clerk/clerk-react';

function LoginPage() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-8">
      <h2 className="text-6xl qwigley-regular">Login</h2>
      <SignIn 
        routing="path"
        path="/login" // Added wildcard to handle auth flow routes
        redirectUrl="/app/profile"
        signUpUrl="/signup"
      />
    </div>
  );
}

export default LoginPage;
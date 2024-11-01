import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';

const key = `pk_test_ZnVuLXRvbWNhdC00Mi5jbGVyay5hY2NvdW50cy5kZXYk`;
console.log(key)

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <ClerkProvider  publishableKey={key}>
    <App />
    </ClerkProvider>
    </BrowserRouter>
)

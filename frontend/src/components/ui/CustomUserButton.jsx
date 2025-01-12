import { useUser, useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function CustomUserButton() {
  const { user } = useUser();
  const { signOut } = useClerk(); // Access the Clerk instance for signing out
  const pfp = user.imageUrl;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleProfileRedirect = () => {
    navigate('/app/profile');
    setIsOpen(false); // Close dropdown after navigating
  };

  const handleSignOut = async () => {
    try {
      await signOut(); // Sign out the user
      navigate('/'); // Redirect to the homepage or login page after sign-out
    } catch (error) {
      console.error('Sign-out failed:', error);
    }
  };

  const handleMouseEnter = () => {
    clearTimeout(timeoutId); // Clear any existing timeout
    setIsOpen(true); // Open dropdown on hover
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setIsOpen(false); // Close dropdown after a delay
    }, 200); // Adjust delay as necessary
    setTimeoutId(id);
  };

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="pfp h-10 w-10 rounded-full bg-black/40 overflow-hidden flex items-center justify-center">
        <img src={pfp} alt="Profile" />
      </div>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <button 
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
            onClick={handleProfileRedirect}
          >
            Go to Profile
          </button>
          <button 
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={handleSignOut} // Add sign-out logic here
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export default CustomUserButton;

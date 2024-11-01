import { UserButton, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function CustomUserButton() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleProfileRedirect = () => {
    navigate('/app/profile');
    setIsOpen(false); // Close dropdown after navigating
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
      <UserButton appearance={{
    elements: {
      userButtonAvatarBox: {
        width: 40,
        height: 40,
      },
    },
  }} afterSignOutUrl="/" />
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <button 
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
            onClick={handleProfileRedirect}
          >
            Go to Profile
          </button>
          {/* Add additional options here */}
          <button 
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => {
              // Sign out logic here
              // E.g., clerk.signOut();
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export default CustomUserButton;

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import EventCard from '../../components/ui/EventCard'; // Assuming we're using the same EventCard component
import { useUser } from '@clerk/clerk-react';
import CreateEventForm from '../../components/CreateEventForm';
import Modal from '../../components/ui/Modal'; // Import the Modal component

function ProfilePage() {
  const { user } = useUser();
  const [isCreatingEvent, setIsCreatingEvent] = useState(false); // State to manage the visibility of CreateEventForm
  const [createdEvents, setCreatedEvents] = useState([]); // State to store events created by the user
  const [boughtTickets, setBoughtTickets] = useState([]); // State to store tickets bought by the user

  // Fetch created events on component mount
  useEffect(() => {
    const fetchCreatedEvents = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/event/my-events/${localStorage.getItem('user_id').toString()}`);
        console.log(response)
        setCreatedEvents(response.data.events); // Update state with the fetched events
      } catch (error) {
        console.error('Error fetching created events:', error);
      }
    };

    fetchCreatedEvents();
  }, [user.id]); // Dependency array ensures this runs when the user.id changes

  // Mock data for tickets bought by the user (you may replace this with an API call)
  const fetchBoughtTickets = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/tickets?userId=${user.id}`);
      setBoughtTickets(response.data);
    } catch (error) {
      console.error('Error fetching bought tickets:', error);
    }
  };

  useEffect(() => {
    //fetchBoughtTickets();
  }, [user.id]); // Fetch bought tickets whenever user.id changes

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
        <img 
          src={user.imageUrl} 
          alt={user.fullName} 
          className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-8"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{user.fullName}</h1>
          <p className="text-gray-600 mb-1">{user.emailAddresses[0].emailAddress}</p>
          <button 
            onClick={() => setIsCreatingEvent(true)} // Show the CreateEventForm form
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Create New Event
          </button>
        </div>
      </div>

      {/* Modal for CreateEventForm */}
      <Modal isOpen={isCreatingEvent} onClose={() => setIsCreatingEvent(false)}>
        <CreateEventForm onCancel={() => setIsCreatingEvent(false)} /> {/* Pass the cancel handler */}
      </Modal>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Events Created by Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(createdEvents) && createdEvents.length > 0 ? (
        createdEvents.map(event => (
            <EventCard key={event.id} {...event} />
        ))
    ) : (
        <p>No events created yet.</p> // Message when there are no events
    )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Tickets Bought</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boughtTickets.map(ticket => (
            <EventCard key={ticket.id} {...ticket} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

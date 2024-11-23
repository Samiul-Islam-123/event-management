import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import EventCard from '../../components/ui/EventCard'; // Assuming we're using the same EventCard component
import { useUser } from '@clerk/clerk-react';
import CreateEventForm from '../../components/CreateEventForm';
import Modal from '../../components/ui/Modal'; // Import the Modal component
import Nav from '../../components/Nav';
import Cookies from "js-cookie";
import Ticket from '../../components/ui/Ticket';

function ProfilePage() {
  const { user } = useUser();
  const [isCreatingEvent, setIsCreatingEvent] = useState(false); // State to manage the visibility of CreateEventForm
  const [createdEvents, setCreatedEvents] = useState([]); // State to store events created by the user
  const [boughtTickets, setBoughtTickets] = useState(null); // State to store tickets bought by the user
  const [activeTab, setActiveTab] = useState('events'); // State for tab navigation

  // Fetch created events
  const fetchCreatedEvents = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/event/my-events/${Cookies.get('user_id')}`);
      setCreatedEvents(response.data.events); // Update state with the fetched events
    } catch (error) {
      console.error('Error fetching created events:', error);
    }
  };

  // Fetch bought tickets
  const fetchBoughtTickets = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/ticket/bought/${localStorage.getItem('user_id')}`);
      
      setBoughtTickets(response.data.boughtTickets);
    } catch (error) {
      console.error('Error fetching bought tickets:', error);
    }
  };

  useEffect(() => {
    fetchCreatedEvents();
    fetchBoughtTickets();
  }, [user.id]);

  return (
    <div className="container overflow-clip w-screen mx-auto px-4 py-8 pt-[15vh]">
      <Nav />
      <div className="flex flex-col md:flex-col md:justify-center items-center md:items-center mb-8">
        <img
          src={user.imageUrl}
          alt={user.fullName}
          className="w-32 h-32 rounded-full object-cover mb-4"
        />
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-2">{user.fullName}</h1>
          <p className="text-gray-600 mb-1">{user.emailAddresses[0].emailAddress}</p>
          <button
            onClick={() => setIsCreatingEvent(true)} // Show the CreateEventForm form
            className="px-4 py-2 mt-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Create New Event
          </button>
        </div>
      </div>

      {/* Modal for CreateEventForm */}
      <Modal isOpen={isCreatingEvent} onClose={() => setIsCreatingEvent(false)}>
        <CreateEventForm onCancel={() => setIsCreatingEvent(false)} /> {/* Pass the cancel handler */}
      </Modal>

      {/* Tab Navigation */}
      <div className="flex justify-center space-x-4 mb-8 border-b">
        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 ${activeTab === 'events' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600'}`}
        >
          Events Created by Me
        </button>
        <button
          onClick={() => setActiveTab('tickets')}
          className={`px-4 py-2 ${activeTab === 'tickets' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600'}`}
        >
          Tickets Bought
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'events' && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Events Created by Me</h2>
            <div className="flex flex-wrap gap-6">
              {Array.isArray(createdEvents) && createdEvents.length > 0 ? (
                createdEvents.map(event => (
                  <EventCard key={event.id} {...event} />
                ))
              ) : (
                <p>No events created yet.</p>
              )}
            </div>
          </div>
        )}
        {activeTab === 'tickets' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Tickets Bought</h2>
            <div className="flex flex-wrap gap-2">
              {boughtTickets ? (
                boughtTickets.map(ticket => (
                  <>
                  {console.log(ticket)}
                  <Ticket data={ticket} />
                  </>
                ))
              ) : (
                <p>No tickets bought yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;

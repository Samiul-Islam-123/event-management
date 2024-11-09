import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import EventCard from '../../components/ui/EventCard'; // Assuming we're using the same EventCard component
import { useUser } from '@clerk/clerk-react';
import CreateEventForm from '../../components/CreateEventForm';
import Modal from '../../components/ui/Modal'; // Import the Modal component
import Nav from '../../components/Nav';
import Cookies from "js-cookie"

function ProfilePage() {
  const { user } = useUser();
  const [isCreatingEvent, setIsCreatingEvent] = useState(false); // State to manage the visibility of CreateEventForm
  const [createdEvents, setCreatedEvents] = useState([]); // State to store events created by the user
  const [boughtTickets, setBoughtTickets] = useState([]); // State to store tickets bought by the user
  const [requestedTickets, setRequestedTicket] = useState([]);

  // Fetch created events on component mount
  const fetchCreatedEvents = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/event/my-events/${Cookies.get('user_id')}`);
      console.log(response)
      setCreatedEvents(response.data.events); // Update state with the fetched events
    } catch (error) {
      console.error('Error fetching created events:', error);
    }
  };
  const fetchRequestedTickets = async () => {
    try {
      console.log(`${import.meta.env.VITE_API_URL}/ticket-requests/${localStorage.getItem('user_id')}`)
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/ticket/ticket-requests/${localStorage.getItem('user_id')}`);
      console.log(response)
      setRequestedTicket(response.data);
    } catch (error) {
      console.error('Error fetching bought tickets:', error);
    }
  };
  useEffect(() => {

    fetchCreatedEvents();
    fetchRequestedTickets();
  }, [user.id]); // Dependency array ensures this runs when the user.id changes

  // Mock data for tickets bought by the user (you may replace this with an API call)

  const handleApprove = async (id) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/ticket/approve-ticket`,{
      ticketID : id
    });
    alert(res.data.message)
  }
  

  return (
    <div className="container overflow-clip w-screen mx-auto px-4 py-8 pt-[15vh] ">
      <Nav />
      <div className="flex flex-col md:flex-col md:justify-center items-center md:items-center  mb-8">
        <img 
          src={user.imageUrl} 
          alt={user.fullName} 
          className="w-32 h-32 rounded-full object-cover mb-4 "
        />
        <div className=' flex flex-col items-center'>
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

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Events Created by Me</h2>
        <div className="flex flex-wrap gap-6 gap-6">
        {Array.isArray(createdEvents) && createdEvents.length > 0 ? (
        createdEvents.map(event => (
            <EventCard key={event.id} {...event} />
        ))
    ) : (
        <p>No events created yet.</p> // Message when there are no events
    )}
        </div>
      </div>

      {requestedTickets && (
  <>
    <div>
      <h2 className="text-2xl font-semibold mb-4">Ticket Requests</h2>
      <div className="flex flex-wrap gap-6">
        {requestedTickets.map((ticket) => (
          <div key={ticket._id} className="p-4 border rounded-lg shadow-md bg-white w-80">
            {/* Display Event Poster */}
            {ticket.event.poster && (
              <img
                src={ticket.event.poster}
                alt={`${ticket.event.name} Poster`}
                className="w-full h-40 object-cover rounded mb-4"
              />
            )}
            <h3 className="text-lg font-bold mb-2">{ticket.event.name}</h3>
            <p className="text-sm text-gray-600 mb-1"><strong>Customer:</strong> {ticket.customer.username}</p>
            <p className="text-sm text-gray-600 mb-1"><strong>Date:</strong> {new Date(ticket.event.date).toLocaleDateString()}</p>
            <p className="text-sm text-gray-600 mb-3"><strong>Price:</strong> ${ticket.event.price}</p>
            <button
              onClick={() => handleApprove(ticket._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Approve
            </button>
          </div>
        ))}
      </div>
    </div>
  </>
)}



      <div>
        <h2 className="text-2xl font-semibold mb-4">Tickets Bought</h2>
        <div className="flex flex-wrap gap-6">
          {boughtTickets.map(ticket => (
            <EventCard key={ticket.id} {...ticket} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

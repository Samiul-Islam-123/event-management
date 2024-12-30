import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../../components/ui/EventCard';
import { useUser } from '@clerk/clerk-react';
import CreateEventForm from '../../components/CreateEventForm';
import Modal from '../../components/ui/Modal';
import Nav from '../../components/Nav';
import Cookies from "js-cookie";
import Ticket from '../../components/ui/Ticket';
import { useData } from '../../context/DataContext';
import StripeDashboard from '../../components/StripeDashboard';

function ProfilePage() {
  const { defaultTexts, setLoading } = useData();
  const { profilePage } = defaultTexts;
  const { user } = useUser();
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [createdEvents, setCreatedEvents] = useState([]);
  const [boughtTickets, setBoughtTickets] = useState(null);
  const [activeTab, setActiveTab] = useState('events');
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      console.log(user.primaryEmailAddress.emailAddress)
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/${user.id}`,);

      if (response.data.success === true) {
        console.log(response.data.user)
        setProfile(response.data.user)
      }

      else {
        console.log(response.data);
        alert(response.data.message)
      }
      // setCreatedEvents(response.data.events);
      setLoading(false);

    } catch (error) {
      console.error('Error fetching created events:', error);
    }
  }

  const fetchCreatedEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/event/my-events/${Cookies.get('user_id')}`);
      setCreatedEvents(response.data.events);
      setLoading(false);

    } catch (error) {
      console.error('Error fetching created events:', error);
    }
  };

  const fetchBoughtTickets = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/ticket/bought/${localStorage.getItem('user_id')}`);
      setBoughtTickets(response.data.boughtTickets);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching bought tickets:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
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
            onClick={() => {
              (profile.isOrganizer) ? setIsCreatingEvent(true) : alert("Please create a seller stripe account")
            }}
            className="px-4 py-2 mt-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            {profilePage.createEventButton}
          </button>

            {profile && (<>
            
          {profile.isOrganizer === false ? (<>
            <button
              onClick={async() => {
                setLoading(true);
                const res = await axios.post(`${import.meta.env.VITE_API_URL}/payment/create-stripe-account`,{
                  organizer : profile._id
                })
                if(res.data.success === true){
                  alert(res.data.message);
                  window.location.href = res.data.accountLinkUrl
                }

                else
                {
                  alert(response.data.message)
                  console.log(response)
                }
                setLoading(false)
              }}
              className="px-4 py-2 mt-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
              Create Seller stripe account
            </button>
          </>) : null}
              </>)}

        </div>
      </div>

      <Modal isOpen={isCreatingEvent} onClose={() => setIsCreatingEvent(false)}>
        <CreateEventForm onCancel={() => setIsCreatingEvent(false)} />
      </Modal>

      <div className="flex justify-center space-x-4 mb-8 border-b">
        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 ${activeTab === 'events' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600'}`}
        >
          {profilePage.tabs.events}
        </button>
        <button
          onClick={() => setActiveTab('tickets')}
          className={`px-4 py-2 ${activeTab === 'tickets' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600'}`}
        >
          {profilePage.tabs.tickets}
        </button>
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2 ${activeTab === 'dashboard' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600'}`}
        >
          {/* {profilePage.tabs.dashboard} */}
          {defaultTexts.stripeDashboard.title}
        </button>
      </div>

      <div>
        {activeTab === 'events' && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{profilePage.eventsSection.title}</h2>
            <div className="flex flex-wrap gap-6">
              {Array.isArray(createdEvents) && createdEvents.length > 0 ? (
                createdEvents.map(event => (
                  <EventCard key={event.id} {...event} />
                ))
              ) : (
                <p>{profilePage.eventsSection.noEvents}</p>
              )}
            </div>
          </div>
        )}
        {activeTab === 'tickets' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">{profilePage.ticketsSection.title}</h2>
            <div className="flex flex-wrap gap-2">
              {boughtTickets ? (
                boughtTickets.map(ticket => (
                  <React.Fragment key={ticket.id}>
                    {console.log(ticket)}
                    <Ticket data={ticket} />
                  </React.Fragment>
                ))
              ) : (
                <p>{profilePage.ticketsSection.noTickets}</p>
              )}
            </div>
          </div>
        )}
        {activeTab === 'dashboard' && (
          <StripeDashboard />
        )}
      </div>
    </div>
  );
}

export default ProfilePage;


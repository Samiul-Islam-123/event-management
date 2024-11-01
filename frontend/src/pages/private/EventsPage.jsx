import React, { useState } from 'react';
import EventCard from '../../components/ui/EventCard';
import Nav from '../../components/Nav';
import img from '../../assets/eventPage.jpg'

function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');

  // Mock data for events
  const upcomingEvents = [
    { id: 1, title: "Summer Music Festival", date: "Sat, 15th Jul 2024", organizer: "Music Lovers Inc.", description: "A weekend of live performances from top artists..." },
    { id: 2, title: "Tech Conference 2024", date: "Mon, 5th Aug 2024", organizer: "TechHub", description: "Explore the latest innovations in technology..." },
    { id: 3, title: "Food & Wine Expo", date: "Fri, 20th Sep 2024", organizer: "Gourmet Events", description: "Taste exquisite cuisines and fine wines from around the world..." },
  ];

  const featuredEvents = [
    { id: 4, title: "Annual Charity Gala", date: "Sat, 10th Jun 2024", organizer: "Helping Hands Foundation", description: "An elegant evening supporting various charitable causes..." },
    { id: 5, title: "International Film Festival", date: "Thu, 1st Aug 2024", organizer: "Cinema Arts Society", description: "Showcasing award-winning films from across the globe..." },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const results = [...upcomingEvents, ...featuredEvents].filter(
      event => event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-[30vh] md:pt-[45vh]">
      <Nav />
      <div className='absolute top-0  left-0 flex justify-center items-center w-full md:h-[40vh] h-[25vh] bg-black'>
        <img src={img} className=' absolute top-0 left-0 w-full h-full object-cover object-center opacity-65' alt="" />
        <h1 className='qwigley-regular text-8xl md:text-8xl z-10 text-white font-bold'>Events</h1>
      </div>
      
      <form onSubmit={handleSearch} className="mb-8 flex gap-2">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button 
          type="submit"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Search
        </button>
      </form>

      {searchResults.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map(event => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>
      )}

      <div className="mb-4">
        <button
          className={`mr-4 px-4 py-2 rounded-lg ${activeTab === 'upcoming' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming Events
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === 'featured' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('featured')}
        >
          Featured Events
        </button>
      </div>

      <div className="flex flex-wrap gap-6">
        {activeTab === 'upcoming' && upcomingEvents.map(event => (
          <EventCard key={event.id} {...event} />
        ))}
        {activeTab === 'featured' && featuredEvents.map(event => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
}

export default EventsPage;
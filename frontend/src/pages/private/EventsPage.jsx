import React, { useEffect, useState } from "react";
import EventCard from "../../components/ui/EventCard";
import Nav from "../../components/Nav";
import img from "../../assets/eventPage.jpg";
import axios from "axios";
import { useData } from "../../context/DataContext";

function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const { defaultTexts , setLoading} = useData();

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/event/`);
      if (response.data.success) {
        setUpcomingEvents(response.data.events);
      } else {
        alert(defaultTexts.eventCard.apiError || "Something went wrong :(");
      }
      setLoading(false);

    } catch (error) {
      console.error("Error fetching events:", error);
      alert(defaultTexts.eventCard.apiError || "Something went wrong :(");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSearch = (query) => {
    const results = upcomingEvents.filter((event) => {
      const nameMatch = event?.name?.toLowerCase().includes(query.toLowerCase());
      const descriptionMatch = event?.description
        ?.toLowerCase()
        .includes(query.toLowerCase());
      const organizerMatch = event?.organizer?.username
        ?.toLowerCase()
        .includes(query.toLowerCase());
      return nameMatch || descriptionMatch || organizerMatch;
    });
    setSearchResults(results);
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Debounce the search for performance
    const debounceTimeout = setTimeout(() => handleSearch(query), 300);
    return () => clearTimeout(debounceTimeout);
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-[30vh] md:pt-[45vh]">
      <Nav />
      <div className="absolute top-0 left-0 flex justify-center items-center w-full md:h-[40vh] h-[25vh] bg-black">
        <img
          src={img}
          className="absolute top-0 left-0 w-full h-full object-cover object-center opacity-65"
          alt=""
        />
        <h1 className="qwigley-regular text-8xl md:text-8xl z-10 text-white font-bold">
          {defaultTexts.eventCard.title}
        </h1>
      </div>

      <form className="mb-8 flex gap-2" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder={defaultTexts.eventCard.searchPlaceholder || "Search events..."}
          value={searchQuery}
          onChange={handleInputChange}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          {defaultTexts.eventCard.searchButton}
        </button>
      </form>

      {searchResults.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {defaultTexts.eventCard.searchResults}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>
      )}

      {/* Separation line between search results and upcoming events */}
      {searchResults.length > 0 && <hr className="my-8 border-gray-300" />}

      <div className="flex flex-wrap gap-6">
        {upcomingEvents &&
          upcomingEvents
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((event) => <EventCard key={event.id} {...event} />)}
      </div>
    </div>
  );
}

export default EventsPage;

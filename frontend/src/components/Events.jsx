import React, { useEffect, useState } from 'react'
import EventCard from './ui/EventCard'
import { FaArrowRightLong } from "react-icons/fa6";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Events = () => {

  const [allEvents, setAllEvents] = useState(null);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    console.log(`${import.meta.env.VITE_API_URL}/event/`);
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/event/`);

    console.log(response)

    if (response.data.success === true) {
      setAllEvents(response.data.events);
    }

    else {
      alert("Something Went wrong :(")
    }
  }

  useEffect(() => {
    fetchEvents();
  }, [])

  const upcomingEvents = allEvents
    ? [...allEvents]
      .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort by date in ascending order
      .slice(0, 5) // Pick the first 5 events
    : [];


  return (
    <section className=' w-full min-h-screen md:px-12 px-8'>
      <div className=' w-full flex gap-6 flex-col items-center   '>
        <h1 className='text-2xl text-[#3D004D] md:text-5xl qwigley-regular'>Events</h1>
        <h1 className="text-4xl md:text-5xl font-semibold">Grab Your <span className=" text-[#E167FF]">Seats</span></h1>
      </div>

      <div className='w-full flex-col flex min-h-screen py-20 '>
        <div className=' w-full flex items-center justify-between min-h-[42vh]  md:pl-12  flex-col mb-16'>
          <div className=' flex flex-col w-[80%]'>
            <div className='w-full'><h1 className=' md:text-4xl text-3xl text-[#3D004D] font-semibold mb-3'>Upcoming <br /> Events</h1>
            <hr className=' border-[2.5px] border-[#3D004D] w-16' /></div>
          </div>
          <div className=' w-[75vw] h-full bg-white flex items-center flex-wrap justify-center md:justify-start'>
            {upcomingEvents.map(event => (
              <EventCard key={event.id} {...event} />
            ))}

          </div>
        </div>

        <div className=' w-full flex items-center justify-between min-h-[42vh]  md:pl-12  flex-col '>
          <div className=' flex flex-col w-[80%]'>
            <div className='w-full'><h1 className=' md:text-4xl text-3xl text-[#3D004D] font-semibold mb-3'>All <br /> Events</h1>
            <hr className=' border-[2.5px] border-[#3D004D] w-16' /></div>
          </div>

          <div className=' w-[75vw] h-full bg-white flex items-center flex-wrap justify-center md:justify-start'>
            {/* <EventCard /> 
              <EventCard /> 
              <EventCard /> 
              <EventCard /> 

              <EventCard /> 
              <EventCard /> 
              <EventCard /> 
              <EventCard /> 

              <EventCard /> 
              <EventCard /> 
              <EventCard />  */}

            {
              allEvents && (<>
                {
                  allEvents.map(event => {
                    return (<>
                      <EventCard key={event.id} {...event} />
                    </>)
                  })
                }
              </>)
            }

            <div
              onClick={() => {
                navigate('/app/events')
              }}
              style={{
                cursor: "pointer"
              }} className=' rounded-full h-24 w-24 border border-black mt-9 ml-9 flex flex-col gap-0 justify-center items-center opacity-60 gap-1 hover:scale-110 duration-500 transition-all ease-in-out' >
              <FaArrowRightLong size={10} />
              <p className=' text-sm '>See more</p>
            </div>
          </div>
        </div>


      </div>
    </section>
  )
}

export default Events
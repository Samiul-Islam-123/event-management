import React from 'react'
import EventCard from './ui/EventCard'
import { FaArrowRightLong } from "react-icons/fa6";

const Events = () => {
  return (
    <section className=' w-full min-h-screen md:px-12 px-8'>
        <div className=' w-full flex gap-6 flex-col items-center   '>
            <h1 className='text-2xl text-[#3D004D] md:text-5xl qwigley-regular'>Events</h1>
            <h1 className="text-4xl md:text-5xl font-semibold">Grab Your <span className=" text-[#E167FF]">Seats</span></h1>
        </div>

        <div className='w-full flex-col flex min-h-screen py-20 '>
          <div className=' w-full flex  justify-between min-h-[42vh]  md:pl-12 md:flex-row flex-col mb-16'>
            <h1 className=' md:text-4xl text-3xl font-semibold mb-8'>Upcoming <br /> Events</h1>

            <div className=' w-[75vw] h-full bg-white flex items-center flex-wrap justify-center md:justify-start'>
              <EventCard /> 
              <EventCard /> 
              <EventCard /> 
              <EventCard /> 
            </div>
          </div>

          <div className=' w-full flex  justify-between min-h-[42vh]  md:pl-12 md:flex-row flex-col '>
            <h1 className=' md:text-4xl text-3xl font-semibold mb-8'>All <br /> Events</h1>

            <div className=' w-[75vw] h-full bg-white flex items-center flex-wrap justify-center md:justify-start'>
              <EventCard /> 
              <EventCard /> 
              <EventCard /> 
              <EventCard /> 

              <EventCard /> 
              <EventCard /> 
              <EventCard /> 
              <EventCard /> 

              <EventCard /> 
              <EventCard /> 
              <EventCard /> 

              <div className=' rounded-full h-24 w-24 border border-black mt-9 ml-9 flex flex-col gap-0 justify-center items-center opacity-60 gap-1 hover:scale-110 duration-500 transition-all ease-in-out' >
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
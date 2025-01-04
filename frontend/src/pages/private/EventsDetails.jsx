import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CiCalendar, CiLocationOn } from "react-icons/ci";
import { VscOrganization } from "react-icons/vsc";
import { FaRegCalendar, FaRegClock, FaRegUser } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import RegisterForm from "./RegisterEvent";
import { useData } from "../../context/DataContext";
import {FaPlayCircle } from "react-icons/fa"


const EventsDetails = () => {
    const { eventID } = useParams();
    const [details, setDetails] = useState(null);
    const navigate = useNavigate();
    const [ticketQuantity, setTicketQuantity] = useState(1);
    const [isBought, setIsBought] = useState(false);
    const { defaultTexts, setDefaultTexts, setLoading } = useData();


    const fetchEventDetails = async () => {
        setLoading(true);
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/event/${eventID}`
        );
        if (response.data.success === true) {
            setDetails(response.data.event);
        } else alert(response.data.message);
        setLoading(false)
    };

    const checkTicketBought = async () => {
        setLoading(true)
        console.log({
            user_id: localStorage.getItem('user_id'),
            event_id: eventID
        })
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/ticket/check-ticket-bought/`, {
            user_id: localStorage.getItem('user_id'),
            event_id: eventID
        })

        setIsBought(response.data.status);
        if (response.data.status === null && response.data.success === false) {
            alert(response.data.message);
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchEventDetails();
        checkTicketBought()
    }, []);

    return (
        <section className="w-screen min-h-screen bg-gray-50">
            <Nav />
            {details && (
                <div style={{
                    marginTop: "75px"
                }} className="container mx-auto px-6">
                    {/* Event Poster Section */}
                    <div className="relative">
                        <img
                            src={details.poster}
                            alt="Event Poster"
                            className="w-full h-96 object-cover rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Event Information Section */}
                    <div className="mt-10 md:flex md:gap-12">
                        <div className="md:w-2/3 w-full">
                            <h1 className="text-4xl font-semibold text-[#E167FF] mb-3">
                                {details.name}
                            </h1>
                            <p className="text-lg text-gray-700 mb-8">{details.description}</p>

                            <div className="space-y-6">
                                {/* Organizer */}
                                <div className="flex items-center gap-4 text-gray-600">
                                    <VscOrganization size={28} />
                                    <h2 className="text-xl font-medium">{details.organizer.username}</h2>
                                </div>

                                {/* Email Section */}
                                <div className="flex items-center gap-4 text-gray-600">
                                    <FaRegUser size={28} />
                                    <h2 className="text-xl font-medium">
                                        <a href={`mailto:${details.organizer.email}`} className="text-blue-500 hover:underline">
                                            {details.organizer.email}
                                        </a>
                                    </h2>
                                </div>

                                {/* Date */}
                                <div className="flex items-center gap-4 text-gray-600">
                                    <FaRegCalendar size={28} />
                                    <h2 className="text-xl font-medium">
                                        {new Date(details.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </h2>
                                </div>

                                {/* Start time - End time */}
                                {(details.startTime && details.endTime) && (<>
                                    <div className="flex items-center gap-4 text-gray-600">
                                        <FaRegClock size={28} />
                                        {console.log(details.startTime, details.endTime)}

                                        <h2 className="text-xl font-medium">
                                            {(() => {
                                                const startTime = details.startTime.split(" "); // Splitting by space if needed
                                                const startDate = new Date();
                                                const [startHour, startMinute] = startTime[0].split(":");
                                                startDate.setHours(startHour, startMinute, 0, 0); // Set hours and minutes for the start time

                                                const endTime = details.endTime.split(" ");
                                                const endDate = new Date();
                                                const [endHour, endMinute] = endTime[0].split(":");
                                                endDate.setHours(endHour, endMinute, 0, 0); // Set hours and minutes for the end time

                                                return (
                                                    <>
                                                        {startDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} - 
                                                        { endDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                                                    </>
                                                );
                                            })()}
                                        </h2>
                                    </div>
                                    <>
                                    {(() => {
                                        // Convert startTime and endTime strings to Date objects
                                        const [startHour, startMinute] = details.startTime.split(":");
                                        const [endHour, endMinute] = details.endTime.split(":");

                                        const currentDate = new Date();
                                        const startDate = new Date(currentDate);
                                        const endDate = new Date(currentDate);

                                        // Set the time for start and end dates
                                        startDate.setHours(parseInt(startHour), parseInt(startMinute), 0, 0);
                                        endDate.setHours(parseInt(endHour), parseInt(endMinute), 0, 0);

                                        // Get current time
                                        const currentTime = new Date();

                                        // Check if current time is between startTime and endTime
                                        if (currentTime >= startDate && currentTime <= endDate) {
                                            return (
                                                <div className="w-fit flex items-center text-white bg-green-500 px-4 py-2 rounded-lg shadow-md">
                                                    <FaPlayCircle size={20} className="mr-2" />
                                                    <p className="font-semibold">Live</p>
                                                </div>
                                            );
                                        } else {
                                            return null;
                                        }
                                    })()}
                                </>
                                </>)}




                                {/* Location */}
                                <div className="flex items-center gap-4 text-gray-600">
                                    <IoLocationOutline size={28} />
                                    <h2 className="text-xl font-medium">{details.location}</h2>
                                </div>

                                {/* Ticket Price */}
                                <div className="flex items-center gap-4 text-gray-600 mt-4 p-4 border rounded-lg">
                                    <h2 className="text-xl">{defaultTexts.eventDetails.ticketPriceLabel}</h2>
                                    <h1 className="text-3xl font-bold text-[#E167FF]">
                                        ${details.price}
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* Registration or Event Management Section */}
                        <div className="md:w-1/3 w-full mt-8 md:mt-0 md:border-l-2 md:border-gray-300 pl-8">
                            {details.organizer._id === localStorage.getItem("user_id") ? (
                                <div>
                                    {/* Analytics for Organizers */}
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                                        {defaultTexts.eventDetails.eventanalytics}
                                    </h3>

                                    <div className="space-y-4">
                                        {/* Ticket Sales Overview */}
                                        <div>
                                            <h4 className="text-lg font-medium text-gray-700">Ticket Overview</h4>
                                            <p>
                                                <strong>{defaultTexts.eventDetails.totalTickets}</strong> {details.limit}
                                            </p>
                                            <p>
                                                <strong>{defaultTexts.eventDetails.ticketsSold}</strong> {details.tickets.length}
                                            </p>
                                            <p>
                                                <strong>{defaultTexts.eventDetails.ticketsRemaining}</strong>{" "}
                                                {details.limit - details.tickets.length}
                                            </p>
                                        </div>

                                        {/* Financial Overview */}
                                        <div>
                                            <h4 className="text-lg font-medium text-gray-700">{defaultTexts.eventDetails.financialOverview}</h4>
                                            <p>
                                                <strong>{defaultTexts.eventDetails.pricePerTicket}</strong> ${details.price}
                                            </p>
                                            <p>
                                                <strong>{defaultTexts.eventDetails.totalSales}</strong> $
                                                {details.price * details.tickets.length}
                                            </p>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="space-x-4 mt-6">
                                            <button onClick={() => [
                                                navigate('/app/edit-Event/' + eventID)
                                            ]} className="bg-blue-500 text-white p-3 rounded-lg">
                                                {defaultTexts.eventDetails.editEventButton}
                                            </button>
                                            <button onClick={async () => {
                                                const confirmation = confirm("Sure ?")
                                                if (confirmation) {

                                                    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/event/${details._id}`)
                                                    if (response.data.success === true)
                                                        navigate('/app/profile')

                                                    else {
                                                        console.log(response.data);
                                                        alert(response.data.message)
                                                    }
                                                }
                                            }} className="bg-blue-500 text-white p-3 rounded-lg">
                                                Delete event
                                            </button>
                                        </div>


                                    </div>
                                </div>
                            ) : (

                                <>
                                    {isBought != null && isBought === true ? (<>
                                        {defaultTexts.eventDetails.viewTicketButton}
                                    </>) : (<>
                                        <RegisterForm
                                            details={details}
                                            ticketQuantity={ticketQuantity}
                                            setTicketQuantity={setTicketQuantity}
                                        />
                                    </>)}
                                </>

                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default EventsDetails;

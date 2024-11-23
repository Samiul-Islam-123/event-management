import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CiCalendar, CiLocationOn } from "react-icons/ci";
import { VscOrganization } from "react-icons/vsc";
import { FaRegCalendar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import RegisterForm from "./RegisterEvent";

const EventsDetails = () => {
    const { eventID } = useParams();
    const [details, setDetails] = useState(null);
    const navigate = useNavigate();
    const [ticketQuantity, setTicketQuantity] = useState(1);
    const [isBought, setIsBought] = useState(false);

    const fetchEventDetails = async () => {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/event/${eventID}`
        );
        if (response.data.success === true) {
            setDetails(response.data.event);
        } else alert(response.data.message);
    };

    const checkTicketBought = async () => {
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

                                {/* Location */}
                                <div className="flex items-center gap-4 text-gray-600">
                                    <IoLocationOutline size={28} />
                                    <h2 className="text-xl font-medium">{details.location}</h2>
                                </div>

                                {/* Ticket Price */}
                                <div className="flex items-center gap-4 text-gray-600 mt-4 p-4 border rounded-lg">
                                    <h2 className="text-xl">Ticket Price:</h2>
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
                                        Event Analytics
                                    </h3>

                                    <div className="space-y-4">
                                        {/* Ticket Sales Overview */}
                                        <div>
                                            <h4 className="text-lg font-medium text-gray-700">Ticket Overview</h4>
                                            <p>
                                                <strong>Total Tickets:</strong> {details.limit}
                                            </p>
                                            <p>
                                                <strong>Tickets Sold:</strong> {details.tickets.length}
                                            </p>
                                            <p>
                                                <strong>Tickets Remaining:</strong>{" "}
                                                {details.limit - details.tickets.length}
                                            </p>
                                        </div>

                                        {/* Financial Overview */}
                                        <div>
                                            <h4 className="text-lg font-medium text-gray-700">Financial Overview</h4>
                                            <p>
                                                <strong>Price per Ticket:</strong> ${details.price}
                                            </p>
                                            <p>
                                                <strong>Total Sales:</strong> $
                                                {details.price * details.tickets.length}
                                            </p>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="space-x-4 mt-6">
                                            <button className="bg-blue-500 text-white p-3 rounded-lg">
                                                Edit Event
                                            </button>
                                            <button className="bg-green-500 text-white p-3 rounded-lg">
                                                Manage Tickets
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (

                                <>
                                    {isBought != null && isBought === true ? (<>
                                        View ticket
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

import React from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { FaPlayCircle } from "react-icons/fa";

const EventCard = ({ _id, name, description, date, organizer, price, poster, location, startTime, endTime }) => {
    const { defaultTexts } = useData();
    const navigate = useNavigate();

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    return (
        <div
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/app/eventDetails/${_id}`)}
            className="w-[290px] h-[360px] rounded-lg flex flex-col overflow-hidden border border-black m-3 shadow-lg shadow-gray-200 bg-white hover:shadow-gray-400 hover:scale-105 transition-all ease-in-out"
        >
            <div className="w-full h-[45%] bg-slate-300 overflow-hidden">
                <img src={poster} alt="event poster" className="object-cover h-full w-full" />
            </div>
            <div className="p-3 flex flex-col justify-between flex-1">
                <div className="flex justify-between">
                    <h1 className="text-xl font-semibold">
                        {name}
                    </h1>
                    {startTime && endTime && (
                        <>
                            {(() => {
                                // Convert startTime and endTime strings to Date objects
                                const [startHour, startMinute] = startTime.split(":");
                                const [endHour, endMinute] = endTime.split(":");

                                const eventDate = new Date(date); // Get event's date
                                const startDate = new Date(eventDate);
                                const endDate = new Date(eventDate);

                                // Set the time for start and end dates
                                startDate.setHours(parseInt(startHour), parseInt(startMinute), 0, 0);
                                endDate.setHours(parseInt(endHour), parseInt(endMinute), 0, 0);

                                // Get current time
                                const currentTime = new Date();

                                // Check if current time is between startDate and endDate
                                if (currentTime >= startDate && currentTime <= endDate) {
                                    return (
                                        <div className="flex items-center text-green-500">
                                            <FaPlayCircle size={20} className="mr-2" />
                                            <p>Live</p>
                                        </div>
                                    );
                                } else {
                                    return null;
                                }
                            })()}
                        </>
                    )}
                </div>
                <p className="opacity-70">
                    {truncateText(description, 45)} {/* Adjust the max length as needed */}
                </p>
                <p className="font-medium">
                    <br /> <span className="text-xl">{location}</span>
                </p>
                <div className="flex">
                    <p className="font-semibold">
                        {new Date(date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </p>
                </div>
                <div className="flex justify-between">
                    <p className="font-medium">
                        {defaultTexts.eventCard.organizedBy} <br /> <span className="text-[#E167FF]">{organizer.username}</span>
                    </p>

                    {Array.isArray(price) ? (<>Is array</>) : (<><p className="text-2xl font-semibold text-[#E167FF]">
                        ${price}
                    </p></>)}

                    {/*  */}
                </div>
            </div>
        </div>
    );
};

export default EventCard;

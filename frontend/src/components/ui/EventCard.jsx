import React from "react";
import img3 from '../../assets/image3.jpg';
import { useNavigate } from "react-router-dom";

const EventCard = ({ _id, name, description, date, organizer, price, poster, location }) => {

    const navigate = useNavigate();
// import { CiCalendar } from "react-icons/ci";


    return (
        <div onClick={() => {
            navigate(`/app/eventDetails/${_id}`)
        }} className=" w-[290px] h-[360px] rounded-lg flex flex-col overflow-hidden border border-black m-3 shadow-lg shadow-gray-200 hover:shadow-gray-400 hover:scale-105 transition-all ease-in-out">
            <div className=" w-full h-[45%] bg-slate-300 overflow-hidden">
                <img src={poster} alt="event poster" className=" object-cover h-full w-full" />
            </div>
            <div className=" p-3 flex flex-col justify-between flex-1">
                <h1 className=" text-xl font-semibold">
                    {name}
                </h1>
                <p className=" opacity-70">
                    {description}
                </p>
                        <p className=" font-medium">
                            <br /> <span className="text-xl">{location}</span>
                        </p>
                <div className="flex">
                    <p className=" font-semibold">
                        {new Date(date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </p>

                </div>
                <div className="flex justify-between">
                    <p className=" font-medium">
                        Organized By <br /> <span className=" text-[#E167FF]">{organizer.username}</span>
                    </p>

                    <p className="text-2xl font-semibold text-[#E167FF]">
                        ${price}
                    </p>

                    {/* <button className=" px-5 py-2 bg-[#E167FF] hover:bg-[#3D004D] rounded-xl text-white transition-all ease-in-out ">
                        Buy Now
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default EventCard;

import React from "react";
import img3 from '../../assets/image3.jpg';
import { CiCalendar } from "react-icons/ci";


const EventCard = () => {
    return (
        <div className=" w-[290px] h-[360px] rounded-lg flex flex-col overflow-hidden border border-black m-3 shadow-lg shadow-gray-200 hover:shadow-gray-400 hover:scale-105 transition-all ease-in-out">
            <div className=" w-full h-[45%] bg-slate-300 overflow-hidden">
              <img src={img3} alt="" className=" object-cover h-full w-full"/>
            </div>
            <div className=" p-3 flex flex-col justify-between flex-1">
                <h1 className=" text-xl font-semibold">
                    Special Sports Challenge
                </h1>
                <p className=" opacity-70">
                    A sports challenge event is all about pushing limits and
                    celebrating....
                </p>
                <div className="flex items-center gap-2">
                    <CiCalendar size={20} />
                    <p className=" font-semibold">Thu, 24th Jan 2024</p>
                </div>
                <div className="flex justify-between">
                    <p className=" font-medium">
                        Organized By <br /> <span className=" text-[#E167FF]">Organizer Name</span>
                    </p>

                    <button className=" px-5 py-2 bg-[#E167FF] hover:bg-[#3D004D] rounded-xl text-white transition-all ease-in-out ">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventCard;

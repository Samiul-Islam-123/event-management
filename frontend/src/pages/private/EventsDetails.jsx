import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import img from "../../assets/image3.jpg";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CiCalendar, CiLocationOn } from "react-icons/ci";
import { VscOrganization } from "react-icons/vsc";
import { FaRegCalendar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

const EventsDetails = () => {
    const { eventID } = useParams();
    const [details, setDetails] = useState(null);
    const navigate = useNavigate();

    const fetchEventDetails = async () => {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/event/${eventID}`
        );
        if (response.data.success === true) {
            setDetails(response.data.event);
        } else alert(response.data.message);
    };

    useEffect(() => {
        fetchEventDetails();
    }, []);

    return (
        <section className=" w-screen min-h-screen ">
            <Nav />
            {details && (
                <>
                    <div className=" w-full h-screen relative bg-black flex items-center md:px-12 px-6">
                        <img
                            src={details.poster}
                            alt=""
                            className="absolute left-0 w-full h-full object-cover "
                        />

                        {/* <div className="flex w-[80vw] md:w-[40vw] z-10 flex-col text-white">
                            <div className=" md:mb-5 wifull mb-2">
                                <h1 className=" md:text-7xl text-4xl font-bold">
                                    {details.name}
                                </h1>
                            </div>
                            <div className=" md:text-2xl text-xl">
                                <p className=" font-medium">
                                    Organized By{" "}
                                    <span className=" text-[#E167FF]">
                                        {details.organizer.username}
                                    </span>
                                </p>
                            </div>
                            <div className="flex md:flex-row flex-col md:items-center  md:gap-3 gap-1 md:mb-8 mb-3">
                                <div className="flex items-center gap-1">
                                    <CiCalendar size={20} />
                                    <p className=" font-semibold">
                                        {new Date(
                                            details.date
                                        ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>

                                <div className="flex items-center gap-1">
                                    <CiLocationOn size={20} />
                                    <p className=" font-semibold">
                                        {details.location}
                                    </p>
                                </div>
                            </div>

                            <div className=" w-fit h-[10vh] bg-white rounded-lg flex items-center justify-between px-6">
                                <h1 className=" text-[#E167FF] text-3xl font-bold mr-5">
                                    ${details.price}
                                </h1>
                                <button className=" px-7 py-2 w-fit bg-[#E167FF] hover:bg-[#3D004D] text-2xl font-semibold rounded-lg text-white transition-all ease-in-out ">
                                    Buy Now
                                </button>
                            </div>
                        </div> */}

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="divider-img-898043"
                            viewBox="0 0 1080 137"
                            preserveAspectRatio="none"
                        >
                            <path d="M 0,137 V 59.03716 c 158.97703,52.21241 257.17659,0.48065 375.35967,2.17167 118.18308,1.69101 168.54911,29.1665 243.12679,30.10771 C 693.06415,92.25775 855.93515,29.278599 1080,73.61449 V 137 Z"></path>
                            <path
                                d="M 0,10.174557 C 83.419822,8.405668 117.65911,41.78116 204.11379,44.65308 290.56846,47.52499 396.02558,-7.4328 620.04248,94.40134 782.19141,29.627636 825.67279,15.823104 1080,98.55518 V 137 H 0 Z"
                                className=" opacity-50"
                            ></path>
                            <path
                                d="M 0,45.10182 C 216.27861,-66.146913 327.90348,63.09813 416.42665,63.52904 504.94982,63.95995 530.42054,22.125806 615.37532,25.210412 700.33012,28.295019 790.77619,132.60682 1080,31.125744 V 137 H 0 Z"
                                className=" opacity-25"
                            ></path>
                        </svg>
                    </div>

                    <div className="z-10 w-full flex md:flex-row flex-col h-screen md:px-12 px-6 py-5">
                        <div className=" md:w-1/2 w-full">
                            {/* <h1 className=" text-[17vw] md:text-[7.3vw] font-black bg-gradient-to-b from-black  to-white inline-block text-transparent bg-clip-text h-fit opacity-30">
                                ABOUT
                            </h1> */}
                            <div>
                                <h1 className=" md:text-8xl text-7xl font-semibold text-[#E167FF] qwigley-regular mb-3">
                                    {details.name}
                                </h1>
                                <p className=" text-xl">
                                    {details.description}
                                </p>
                            </div>

                            <div className=" flex gap-10 flex-col mt-10">
                                <div className=" flex gap-5 items-center opacity-90">
                                    <div className="">
                                        <VscOrganization size={35} />
                                    </div>
                                    <h1 className=" text-2xl font-semibold">
                                        {details.organizer.username}
                                    </h1>
                                </div>

                                <div className=" flex gap-5 items-center opacity-90">
                                    <div className="">
                                        <FaRegCalendar size={35} />
                                    </div>
                                    <h1 className=" text-2xl font-semibold">
                                        {new Date(
                                            details.date
                                        ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </h1>
                                </div>

                                <div className=" flex gap-5 items-center opacity-90">
                                    <div className="">
                                        <IoLocationOutline size={35} />
                                    </div>
                                    <h1 className=" text-2xl font-semibold">
                                        {details.location}
                                    </h1>
                                </div>
                            </div>
                        </div>

                        <div className=" md:w-1/2 w-full flex flex-col gap-8 md:px-8 py-12 md:border-l-2  md:border-black/30">
                            {/* <div className=' flex gap-5 items-center opacity-60'>
                                <div className=' w-20 h-20 border-[3px] border-black rounded-xl flex items-center justify-center'>
                                    <VscOrganization size={35} />

                                </div>
                                <h1 className=' text-2xl'>{details.organizer.username}</h1>
                            </div>

                            <div className=' flex gap-5 items-center opacity-60'>
                                <div className=' w-20 h-20 border-[3px] border-black rounded-xl flex items-center justify-center'>
                                    <FaRegCalendar size={35} />
                                </div>
                                <h1 className=' text-2xl'>{new Date(details.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}</h1>
                            </div>

                            <div className=' flex gap-5 items-center opacity-60'>
                                <div className=' w-20 h-20 border-[3px] border-black rounded-xl flex items-center justify-center'>
                                    <IoLocationOutline size={35} />
                                </div>
                                <h1 className=' text-2xl'>{details.location}</h1>
                            </div> */}

                            <div className=" w-fit h-[10vh] bg-white rounded-lg flex items-center border-2 justify-between md:px-6 px-2">
                                <h1 className=" text-[#E167FF] text-5xl font-bold mx-16">
                                    ${details.price}
                                </h1>
                                <button
                                    onClick={() => {
                                        navigate(
                                            `/app/register-event/${eventID}`
                                        );
                                    }}
                                    className=" px-7 py-3 w-fit bg-[#E167FF] hover:bg-[#3D004D] text-2xl font-semibold rounded-lg text-white transition-all ease-in-out "
                                >
                                    Register
                                </button>
                            </div>

                            {/* {
                                localStorage.getItem('user_id') === details.organizer._id && (<>
                                    <button className=" px-7 py-3 w-fit bg-[#E167FF] hover:bg-[#3D004D] text-2xl font-semibold rounded-lg text-white transition-all ease-in-out ">
                                    Edit Event details
                                </button>
                                </>)
                            } */}
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default EventsDetails;

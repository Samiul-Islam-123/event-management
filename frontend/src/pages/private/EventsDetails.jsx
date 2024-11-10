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
        <section className="w-screen min-h-screen">
            <Nav />
            {details && (
                <>
                    <div className="w-full h-screen relative bg-black flex items-center md:px-12 px-6">
                        <img
                            src={details.poster}
                            alt=""
                            className="absolute left-0 w-full h-full object-cover"
                        />

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="divider-img-898043"
                            viewBox="0 0 1080 137"
                            preserveAspectRatio="none"
                        >
                            <path d="M 0,137 V 59.03716 c 158.97703,52.21241 257.17659,0.48065 375.35967,2.17167 118.18308,1.69101 168.54911,29.1665 243.12679,30.10771 C 693.06415,92.25775 855.93515,29.278599 1080,73.61449 V 137 Z"></path>
                            <path
                                d="M 0,10.174557 C 83.419822,8.405668 117.65911,41.78116 204.11379,44.65308 290.56846,47.52499 396.02558,-7.4328 620.04248,94.40134 782.19141,29.627636 825.67279,15.823104 1080,98.55518 V 137 H 0 Z"
                                className="opacity-50"
                            ></path>
                            <path
                                d="M 0,45.10182 C 216.27861,-66.146913 327.90348,63.09813 416.42665,63.52904 504.94982,63.95995 530.42054,22.125806 615.37532,25.210412 700.33012,28.295019 790.77619,132.60682 1080,31.125744 V 137 H 0 Z"
                                className="opacity-25"
                            ></path>
                        </svg>
                    </div>

                    <div className="z-10 w-full flex md:flex-row flex-col h-full md:px-12 px-6 py-5">
                        <div className="md:w-2/3 w-full">
                            <div>
                                <h1 className="md:text-8xl text-6xl font-semibold text-[#E167FF] qwigley-regular mb-3">
                                    {details.name}
                                </h1>
                                <p className="text-xl">{details.description}</p>
                            </div>

                            <div className="flex gap-10 flex-col mt-10">
                                <div className="flex gap-5 items-center opacity-90">
                                    <VscOrganization size={35} />
                                    <h1 className="text-2xl font-semibold">
                                        {details.organizer.username}
                                    </h1>
                                </div>

                                <div className="flex gap-5 items-center opacity-90">
                                    <FaRegCalendar size={35} />
                                    <h1 className="text-2xl font-semibold">
                                        {new Date(details.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </h1>
                                </div>

                                <div className="flex gap-5 items-center opacity-90">
                                    <IoLocationOutline size={35} />
                                    <h1 className="text-2xl font-semibold">
                                        {details.location}
                                    </h1>
                                </div>

                                {/* Price Section */}
                                <div className="flex gap-5 items-center mt-5 opacity-90 border p-5 rounded-lg border-[#E167FF] w-fit">
                                    <h2 className="text-xl ">Ticket Price:</h2>
                                    <h1 className="text-4xl font-bold text-[#E167FF]">
                                        ${details.price}
                                    </h1>
                                </div>
                            </div>
                        </div>

                        <div className="md:w-1/3 w-full flex flex-col gap-8 md:px-8 py-12 md:border-l-2 md:border-black/30">
                            <RegisterForm
                                details={details}
                                ticketQuantity={ticketQuantity}
                                setTicketQuantity={setTicketQuantity}
                            />
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default EventsDetails;

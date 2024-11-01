import React, { useEffect, useRef } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import CustomUserButton from "./ui/CustomUserButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Nav = () => {
    const { isSignedIn } = useUser();
    const navigate = useNavigate();
    const navRef = useRef(null);

    useEffect(() => {
        ScrollTrigger.create({
            trigger: document.body,
            start: "100vh -100vh", // starts 100vh up
            onEnter: () => gsap.to(navRef.current, { backgroundColor: "rgb(0,0,0,0.7)", duration: 0.6 }),
            onLeaveBack: () => gsap.to(navRef.current, { backgroundColor: "rgba(0,0,0,0.1)", duration: 0.6 }),
            
        });
    }, []);

    return (
        <nav
            ref={navRef}
            className="nav  w-full z-40 text-white bg-black/30 h-[8vh] flex justify-between items-center md:px-12 px-8 fixed top-0 left-0">
            <div className="logo qwigley-regular text-2xl md:text-4xl">
                <h2>Les sorties de Diane</h2>
            </div>

            <ul className="flex gap-10 font-semibold text-lg">
                <li>Home</li>
                <li className="events relative inline-block">
                    <button className="text-white focus:outline-none flex gap-1 items-center">
                        Events <RiArrowDropDownLine size={26} />
                    </button>
                    <div className="event-dropdown absolute hidden space-y-1 bg-white rounded shadow-lg w-36 group-hover:block">
                        <a href="/app/events" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">All Events</a>
                        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">Upcoming Events</a>
                        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">Featured Events</a>
                    </div>
                </li>
                <li>Contact</li>
            </ul>

            {/* Profile with Clerk UserButton */}
            <div className="profile h-10 w-10 rounded-full bg-black/40 flex items-center justify-center">
                {isSignedIn ? (
                    <CustomUserButton />
                ) : (
                    <FaUserAlt />
                )}
            </div>
        </nav>
    );
};

export default Nav;

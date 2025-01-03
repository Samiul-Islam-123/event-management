import React, { useEffect, useRef, useState } from "react";
import { RiArrowDropDownLine, RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import CustomUserButton from "./ui/CustomUserButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useData } from "../context/DataContext";
import LanguageToggleSlider from "./ui/LanguageToggleButton";
import LanguageDropdown from "./ui/LanguageToggleButton";

gsap.registerPlugin(ScrollTrigger);

const Nav = () => {
    const { isSignedIn } = useUser();
    const navigate = useNavigate();
    const navRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { defaultTexts, setDefaultTexts, language, setLanguage } = useData();


    useEffect(() => {
        ScrollTrigger.create({
            trigger: document.body,
            start: "100vh -100vh",
            onEnter: () => gsap.to(navRef.current, { backgroundColor: "rgb(0,0,0,0.7)", duration: 0.6 }),
            onLeaveBack: () => gsap.to(navRef.current, { backgroundColor: "rgba(0,0,0,0.1)", duration: 0.6 }),
        });
        console.log(language)
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav
            ref={navRef}
            className="nav  w-full z-40 text-white bg-black/30 h-[8vh] flex justify-between items-center md:px-12 px-8 fixed top-0 left-0">
            <div onClick={() => {
                navigate('/');
            }} className="logo qwigley-regular text-2xl md:text-4xl" style={{
                cursor: "pointer"
            }}>
                <h2>{defaultTexts.nav.logo}</h2>
            </div>

            

            {/* Overlay for Dark Background when Menu is Open */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={toggleMenu} // close menu when clicking outside the sidebar
                ></div>
            )}

            {/* Sidebar Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-[#0c0311] text-white transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                    } transition-transform duration-300 ease-in-out md:hidden z-50`}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
                    {/* Profile Icon */}
                    <div className="profile h-10 w-10 rounded-full bg-black/40 flex items-center justify-center">
                        {isSignedIn ? (
                            <CustomUserButton />
                        ) : (
                            <FaUserAlt />
                        )}
                    </div>

                    {/* Close Icon */}
                    <button onClick={toggleMenu} className="text-2xl text-white">
                        <RiCloseLine />
                    </button>
                </div>

                {/* Menu Items for mobo*/}
                <ul className="flex flex-col gap-6 font-semibold text-lg px-6 mt-8">
                    <li className="cursor-pointer" onClick={() => {
                        setIsMenuOpen(false)
                        navigate('/')
                    }}>{defaultTexts.nav.menuItems[0]}</li>
                    {/* <li className="events relative inline-block cursor-pointer" onClick={() => setIsMenuOpen(false)}>
                            <button className="flex gap-1 items-center">
                                Events <RiArrowDropDownLine size={26} />
                            </button>
                            <div className="event-dropdown flex flex-col space-y-1 mt-2 md:bg-white  md:text-gray-800 text-white rounded shadow-lg md:w-36 w-full">
                                <a href="/app/events" className="block px-4 py-2 md:hover:bg-blue-100 border-b-[1px]">All Events</a>
                                <a href="#" className="block px-4 py-2 md:hover:bg-blue-100 border-b-[1px]">Upcoming Events</a>
                                <a href="#" className="block px-4 py-2 md:hover:bg-blue-100 border-b-[1px]">Featured Events</a>
                            </div>
                        </li> */}
                    <li className="cursor-pointer" onClick={() => {
                        setIsMenuOpen(false)
                        navigate('/app/events')
                    }}>{defaultTexts.nav.menuItems[1]}</li>
                    <li className="cursor-pointer" onClick={() => {
                        setIsMenuOpen(false)
                        navigate('/contact-us')
                    }}>{defaultTexts.nav.menuItems[2]}</li>
                </ul>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex gap-10 font-semibold text-lg">
                <li style={{
                    cursor: "pointer"
                }} onClick={() => {
                    navigate('/');
                }}>{defaultTexts.nav.menuItems[0]}</li>
                {/* <li className="events relative inline-block">
                    <button className="text-white focus:outline-none flex gap-1 items-center">
                        Events <RiArrowDropDownLine size={26} />
                    </button>
                    <div className="event-dropdown absolute hidden space-y-1 bg-white rounded shadow-lg w-36 group-hover:block">
                        <a href="/app/events" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">All Events</a>
                        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">Upcoming Events</a>
                        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">Featured Events</a>
                    </div>
                </li> */}
                <li style={{
                    cursor: "pointer"
                }} onClick={() => {
                    navigate('/app/events')
                }}>{defaultTexts.nav.menuItems[1]}</li>
                <li style={{
                    cursor: "pointer"
                }} onClick={() => {
                    navigate('/contact-us')
                }}>{defaultTexts.nav.menuItems[2]}</li>

                {/* <li style={{
                    cursor: "pointer"
                }} onClick={() => {
                    language === 'en' ? setLanguage('fr') : setLanguage('en')
                }}>Switch to {language === 'en' ? "French" : "English"} </li> */}

                
            </ul>

            <div className=" flex gap-5">
                <div className=""><LanguageDropdown /></div>

                

                {/* Hamburger Icon for Mobile */}
                <button className="md:hidden text-white text-3xl" onClick={toggleMenu}>
                    {isMenuOpen ? <RiCloseLine /> : <RiMenu3Line />}
                </button>
                {/* Profile Icon for Desktop */}
                <div className="profile h-10 w-10 rounded-full bg-black/40 hidden md:flex items-center justify-center" >
                {isSignedIn ? (
                    <CustomUserButton />
                ) : (
                    <a href="/login"><FaUserAlt /></a>
                )}
                </div>
            </div>
        </nav>

    );
};

export default Nav;

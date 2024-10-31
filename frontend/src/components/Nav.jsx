import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

const Nav = () => {
    return (
        <nav className=" w-full z-10 text-white h-[10vh] flex justify-between items-center md:px-12 px-8 absolute top-0 left-0">
            <div className=" logo">wwwwwwwww</div>

            <ul className=" flex gap-10 font-semibold">
                <li className="">Home</li>
                <li className="events relative inline-block"
                  
                >
                    <button class=" text-white  focus:outline-none flex gap-1 items-center"

                    >
                        Events <RiArrowDropDownLine size={26} />
                    </button>

                    <div class=" event-dropdown absolute hidden  space-y-1 bg-white rounded shadow-lg w-36 group-hover:block">
                        <a
                            href="#"
                            class="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                        >
                            All Events
                        </a>
                        <a
                            href="#"
                            class="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                        >
                            Upcoming Events
                        </a>
                        <a
                            href="#"
                            class="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                        >
                            Featured Events
                        </a>
                    </div>
                </li>
                <li className="">Contact</li>
            </ul>

            <div className=" profile h-10 w-10 rounded-full bg-black/40"></div>
        </nav>
    );
};

export default Nav;

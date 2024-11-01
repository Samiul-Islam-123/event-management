import React, { useEffect, useRef } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

import { gsap } from "gsap";
import Carousel from "./ui/Carousel";
import Nav from "./Nav";

const Hero = () => {
    
    
    return (
        <>
        
        <section className="w-full h-screen bg-black/60 relative">
        
            <div className="absolute w-full h-full overflow-hidden">
                <Carousel />
                    
            </div>
            <div className="absolute bottom-20 left-12 flex flex-col text-white">
                <div className="mb-12">
                    <h1 className="md:text-8xl text-6xl font-semibold">
                        Live the moment,
                    </h1>
                    <h1 className="md:text-8xl text-6xl font-semibold">
                        Love the <span className="text-[#E167FF]">experience.</span>
                    </h1>
                </div>
                <div className="border-white text-white border-2 font-semibold rounded-lg px-10 py-6 w-fit flex items-center gap-2  hover:gap-5 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2),0_-8px_16px_rgba(0,0,0,0.2)]  hover:bg-black/20  hover:shadow-white/40  transition-all ease-in-out duration-500">
                    <h1 className="text-xl ">All Events</h1>
                    <FaArrowRightLong color="white"  />
                </div>
            </div>
        </section>
        </>
    );
};

export default Hero;

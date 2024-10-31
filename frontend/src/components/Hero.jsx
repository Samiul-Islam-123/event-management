import React, { useEffect, useRef } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

import { gsap } from "gsap";
import Carousel from "./ui/Carousel";

const Hero = () => {
    
    
    return (
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
                        Love the <span className="text-[#ffda35]">experience.</span>
                    </h1>
                </div>
                <div className="border-white border-2 rounded-lg px-10 py-6 w-fit flex items-center gap-2">
                    <h1 className="text-xl text-white">All Events</h1>
                    <FaArrowRightLong color="white" />
                </div>
            </div>
        </section>
    );
};

export default Hero;

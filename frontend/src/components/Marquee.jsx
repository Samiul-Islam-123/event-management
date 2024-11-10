import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Marquee = () => {
    useEffect(() => {
        gsap.set(".mslides", { scale: 1 });
        gsap.registerPlugin(ScrollTrigger);
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".marqueeCont",
                start: "top bottom",
                end: "bottom top",
                
                scrub: 0.5,
                
            },
        });

        tl.to(
            ".lft",
            {
                xPercent: -10,
                ease: "power2",
                stagger: 0.03
            },
            "b"
        ).to(
            ".rgt",
            {
                xPercent: 10,
                ease: "power2",
                stagger: 0.03
            },
            "b"
        );
    }, []);
    return (
        <div className="marqueeCont w-full h-[65vh] overflow-hidden">
            {/* <div className="heading absolute top-[5%] left-1/2 -translate-x-1/2 w-60 text-center">
                <h1 className=" text-xl font-regular">
                    Crafting a new paradigm of healthcare, one that is
                </h1>
            </div> */}
            <div className="  mSlides relative scale-[1] w-[90%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="lft row -translate-x-1/2 w-full py-5 flex items-center gap-8">
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Events
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Outings
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Gathering
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Sports
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Conference
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>

                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Events
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Outings
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Gathering
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Sports
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Conference
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>

                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Events
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Outings
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Gathering
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Sports
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Conference
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>

                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Events
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Outings
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Gathering
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Sports
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Conference
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>

                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Events
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Outings
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Gathering
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Sports
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Conference
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>

                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Events
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Outings
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Gathering
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Sports
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Conference
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>

                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Events
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Outings
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Gathering
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Sports
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Conference
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>

                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Events
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Outings
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Gathering
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Sports
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Conference
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                </div>
                <div className="rgt row -translate-x-1/3 w-full py-5 flex items-center gap-8">
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Events
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Outings
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Gathering
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Sports
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Conference
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>

                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Events
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Outings
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Gathering
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Sports
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Conference
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>

                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Events
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Outings
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Gathering
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Sports
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Conference
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>

                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Events
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Outings
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Gathering
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Sports
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Conference
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>

                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Events
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Outings
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Gathering
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Sports
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Conference
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>

                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Events
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Outings
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Gathering
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Sports
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Conference
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>

                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Events
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Outings
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Gathering
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Sports
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Conference
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>

                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Events
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Outings
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Gathering
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Sports
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Conference
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                </div>

                <div className="lft row -translate-x-2/3 w-full py-5 flex items-center gap-8">
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Events
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Outings
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Gathering
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Sports
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Conference
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>

                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Events
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Outings
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Gathering
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Sports
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Conference
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>

                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Events
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Outings
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Gathering
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Sports
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Conference
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>

                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Events
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Outings
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Gathering
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Sports
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Conference
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>

                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Events
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Outings
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Gathering
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Sports
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Conference
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>

                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Events
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Outings
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Gathering
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Sports
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Conference
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>

                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Events
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Outings
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Gathering
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Sports
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Conference
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>

                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Events
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Outings
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Gathering
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Sports
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                    <div className="elem flex items-center gap-8">
                        <h1 className='font-semibold font-["Pp_Neue_Machina"] text-6xl opacity-60 '>
                            Conference
                        </h1>
                        <div className="imgdiv w-[3.5rem] h-[3.5rem] rounded-full bg-[#E167FF]"></div>
                    </div>
                </div>

                

                
            </div>
        </div>
    );
};

export default Marquee;

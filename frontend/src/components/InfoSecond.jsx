import React from "react";
import img3 from '../assets/image3.jpg'

const InfoSecond = () => {
    return (
        <section className=" w-full min-h-screen md:px-12 px-8 md:pt-10 pt-32 flex flex-col items-center">
            <h1 className=" text-[7.3vw] font-black bg-gradient-to-b from-black  to-white inline-block text-transparent bg-clip-text h-fit opacity-30">
                PARTICIPATE WITH US
            </h1>

            <div className="  flex w-full justify-center  flex-wrap md:gap-32 items-center mt-8 md:mt-14">
                <div className="flex flex-col w-[80vw] md:w-[30vw]">
                    <div className=" mb-8 md:mb-14 ">
                        <h1 className="text-4xl md:text-5xl font-semibold">
                            Bringing <span className=" text-[#E167FF]">people{" "}</span>
                        </h1>
                        <h1 className="text-4xl md:text-5xl font-semibold">
                            together
                        </h1>
                    </div>

                    <div>
                        <p className=" text-sm md:text-lg">
                            Experience the pinnacle of culture, elegance,
                            entertainment, gastronomy and dining at Les Sorties
                            de Diane. This exceptional series of events
                            showcases the talents of renowned artists and
                            performers and immerses you in the world of art,
                            music, literature and gastronomy. Prepare to be
                            captivated by captivating exhibitions and
                            captivating performances held in exclusive venues,
                            creating an intimate and enchanting atmosphere. Each
                            event is a unique experience, one that inspires you
                            and leaves you wanting more. Indulge in the beauty
                            of the arts and join us at Les Sorties de Diane for
                            unforgettable evenings that will ignite your
                            passion.
                        </p>
                    </div>
                </div>

                <div className=" md:w-[33vw] md:h-[12vw] w-[75vw] h-[48vw]  relative mt-12">
                    <div className=" absolute z-10 top-0 left-0  border border-black rounded-[50px] md:w-[30vw] md:h-[15vw] w-[70vw] h-[40vw]"></div>
                    <div className=" absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  rounded-[50px] md:w-[30vw] md:h-[15vw] w-[70vw] h-[40vw] overflow-hidden">
                        <img src={img3} alt="" className=" object-cover h-full w-full"/>
                    </div>
                    <div className=" absolute z-10 bottom-0 right-0 border border-black rounded-[50px] md:w-[30vw] md:h-[15vw] w-[70vw] h-[40vw]"></div>
                </div>
            </div>
        </section>
    );
};

export default InfoSecond;

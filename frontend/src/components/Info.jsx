import React from "react";

const Info = () => {
    return (
        <section className=" w-full min-h-screen">
            <div className=" w-full h-[12vh] border-[#3D004D] border flex items-center justify-center">
                <h1>Welcome everyone to Diane's outings</h1>
            </div>

            <div className="  flex w-full justify-center h-[88vh] flex-wrap md:gap-32 items-center">
                <div className=" md:w-[30vw] md:h-[30vw] w-[75vw] h-[75vw]  relative mt-12">
                    <div className=" absolute z-20 top-0 left-0  border border-black rounded-[50px] md:w-[20vw] md:h-[20vw] w-[50vw] h-[50vw]"></div>
                    <div className=" absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-black rounded-[50px] md:w-[20vw] md:h-[20vw] w-[50vw] h-[50vw]"></div>
                    <div className=" absolute z-20 bottom-0 right-0 border border-black rounded-[50px] md:w-[20vw] md:h-[20vw] w-[50vw] h-[50vw]"></div>
                </div>

                <div className="flex flex-col w-[80vw] md:w-[30vw]">
                    <div className=" mb-8 md:mb-14">
                        <h1 className="text-4xl md:text-5xl font-semibold">We inspire </h1>
                        <h1 className="text-4xl md:text-5xl font-semibold">
                            people to go out more
                        </h1>
                    </div>

                    <div>
                        <p className=" text-sm md:text-lg">
                            Diane’s Nights Out is a series of exceptional events
                            that promise unforgettable evenings filled with
                            culture, elegance and entertainment. Immerse
                            yourself in the world of art, music and literature
                            as Diane’s Nights Out showcases the talents of
                            renowned artists and performers. Our carefully
                            selected events take place in exclusive venues,
                            creating an intimate and enchanting atmosphere for
                            you to enjoy. From captivating exhibitions to
                            captivating performances, each event is a unique
                            experience that will leave you inspired and wanting
                            more. Join us at Diane’s Nights Out and indulge in
                            the beauty of the arts.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Info;

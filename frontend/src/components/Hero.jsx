import React from "react";

const Hero = () => {
    return (
        <section className=" w-full h-screen bg-black/60 relative">
            <div className="absolute bottom-20 left-12 flex flex-col">
                <div className="mb-12">
                    <h1 className=" md:text-8xl text-6xl font-semibold">
                        Live the moment,
                    </h1>
                    <h1 className=" md:text-8xl text-6xl font-semibold">
                        Love the experience.
                    </h1>
                </div>

                <div className=" border-white border-2 rounded-lg px-10 py-6 w-fit">
                    <h1 className=" text-xl text-white">All Events</h1>
                </div>
            </div>
        </section>
    );
};

export default Hero;

import Image from "next/image";
import React from "react";

import bg1 from "../../assets/bg-small-1.svg";
import bgX from "../../assets/X.svg";
import heroImage from "../../assets/heroSportsman.svg";

const HeroMain = () => {
  return (
    <main className="relative w-full h-screen bg-secondary">
      {/* Hero Content - Centered on larger screens */}
      <div className="absolute w-full h-full md:w-[50%] md:h-[80%] flex flex-col md:flex-row sm:gap-2 md:gap-4 sm:top-[10%] md:top-30 left-0 md:left-[21rem] px-4 md:px-0  overflow-hidden">
        <div className="w-full mt-22 md:mt-0 md:w-1/2 h-1/2 md:h-full bg-accent flex items-center justify-center">
          <Image
            src={heroImage}
            alt="heroImage"
            className="object-cover my-4 md:my-10 w-[80%] h-auto"
          />
        </div>
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-transparent flex items-center md:items-start justify-center md:justify-start">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-center md:text-end text-accent">
            Drop the buzz. <br /> Get the game.
          </h1>
        </div>
      </div>

      {/* top section */}
      <section className="w-full h-1/2 bg-secondary flex flex-col md:flex-row">
        {/* Left column */}
        <div className="hidden md:block bg-secondary w-full md:w-[30%] h-full overflow-hidden">
          <Image src={bg1} alt="bg1" className="object-cover w-full h-full" />
        </div>

        {/* Middle columns - hidden on mobile */}
        <div className="hidden md:block bg-primary w-[8%] h-full mx-0 md:mx-4"></div>
        <div className="hidden md:block bg-accent w-[3%] h-full"></div>

        {/* Right column */}
        <div className="bg-secondary w-full flex flex-col">
          <div className="w-full h-[50%] bg-white flex items-end">
            <p className="text-accent text-sm tracking-wider pl-4 md:pl-10 pb-4 md:pb-2">
              Official <span className="font-semibold">Blitz Sports</span>
            </p>
          </div>
          <div className="w-full h-full bg-secondary flex items-center justify-end gap-4 md:gap-10 pr-4 md:pr-10">
            <Image
              src={bgX}
              alt="bgx"
              className="p-2 w-8 h-8 md:w-auto md:h-auto"
            />
            <div className="h-4 w-4 md:h-[20px] md:w-[20px] bg-accent"></div>
          </div>
        </div>
      </section>

      {/* bottom section */}
      <section className="w-full h-1/2 bg-secondary flex flex-col">
        <div className="bg-white w-full h-[10%]"></div>
        <div className="flex w-full h-full flex-col md:flex-row">
          {/* Left column - hidden on mobile */}
          <div className="hidden md:flex bg-secondary w-full md:w-[30%] h-full items-center justify-center">
            <Image src={bgX} alt="bgx" className="object-cover" />
          </div>

          {/* Middle columns - hidden on mobile */}
          <div className="hidden md:block bg-primary w-[8%] h-full mx-0 md:mx-4"></div>
          <div className="hidden md:block bg-accent w-[3%] h-full"></div>

          {/* Right column */}
          <div className=" w-full h-full flex bg-secondary">
            <div className="w-full md:w-[80%] h-full flex items-center justify-around">
              <div className="h-2 w-2 md:h-[10px] md:w-[10px] bg-accent rounded-full"></div>
              <div className="h-2 w-2 md:h-[10px] md:w-[10px] bg-accent rounded-full"></div>
            </div>
            <div className="hidden md:block bg-primary w-[8%] h-full"></div>
            <div className="hidden md:block w-[12%] h-full"></div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HeroMain;

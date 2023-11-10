import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import IntroCard from "../components/IntroCard";

export default function Intro() {
  return (
    <>
      <Navbar />
      <div className="hero w-full bg-white p-6">
        <div className="hero-content text-black flex flex-col text-center">
          <span className="text-xl md:text-3xl font-black">
            Crowdsourced Map
          </span>
          <span className="text-xl md:text-3xl text-blue font-black">
            for everyone
          </span>
          <span className="text-xl md:text-3xl text-[#8e88ee] font-black">
            in every place
          </span>
        </div>
      </div>
      <div className="w-full bg-dark-grey text-black p-12 flex justify-around flex-wrap md:flex-nowrap">
        <IntroCard/>
      </div>
      <div className="w-full bg-white flex py-10 flex-col md:flex-row items-center md:py-30">
        <div className="flex flex-col w-full justify-center items-center md:items-start md:ml-20 mb-0 md:mb-20">
          <span className="text-blue font-black text-3xl lg:text-4xl xl:text-6xl mb-6">
            About
          </span>
          <span className="text-black font-black text-xl lg:text-2xl xl:text-5xl mb-4">
            We are here to make
          </span>
          <span className="text-yellow font-black text-xl lg:text-2xl xl:text-5xl">
            An Engaged Community
          </span>
        </div>
        <div className="border-black border-l-0 m-10 md:border-l-8 md:m-0">
          <div className="bg-blue h-60 mb-2">
            <img
              src="/images/introMapimage.png"
              className=" object-cover w-full h-full"
            />
          </div>
          <p className="text-black mb-2">
            Nebula is a community-driven mapping platform that goes beyond
            traditional navigation. By leveraging the power of crowdsourcing,
            Nebula transforms ordinary maps into dynamic, interactive, and
            valuable repositories of local knowledge.
          </p>
          <span className="text-blue font-black">Read more</span>
        </div>
      </div>
      <Footer />
    </>
  );
}

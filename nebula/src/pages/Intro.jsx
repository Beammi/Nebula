import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import IntroCard from "../components/IntroCard";
import { useState, useRef } from "react"
import Link from "next/link"

export default function Intro() {
  const [menu, setMenu] = useState(false)
  const scrollRef = useRef(null)

  const scrollToFeatures = () => {
    // const featuresSection = document.getElementById("features-section");
    // featuresSection.scrollIntoView({ behavior: "smooth", block: "center" });
    // if (featuresSection) {
    //   // featuresSection.scrollIntoView({ behavior: "smooth", block: "center" });
    // }
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
    console.log("scroll: ", scrollRef);
  };

  const scrollToAbout = () => {

    scrollRef.current?.scrollIntoView({behavior: "smooth"})
    console.log("scroll: ", scrollRef);
  };

  const scrollToContact = () => {

    scrollRef.current?.scrollIntoView({behavior: "smooth"})
    console.log("scroll: ", scrollRef);
  };

  return (
    <>
      {/* <Navbar /> */}
      <nav className="w-full bg-white p-4 flex items-center justify-between md:flex md:justify-between md:items-center border-b-2 border-black">
        <a href="/Intro" className="text-black text-2xl md:text-3xl font-black">
          Nebula
        </a>
        <ul
          className={`md:flex md:items-center z-[1] md:z-auto md:static rounded-b-lg absolute bg-white md:bg-white w-full shadow-xl md:shadow-none left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-300 ${
            menu ? "top-[74px] opacity-100" : "top-[-400px]"
          }`}
        >
          <li className="mx-2 my-6 md:my-0">
            <a href="/Intro" className="text-black font-black mx-4 hover:text-blue duration-500 cursor-pointer">
              Home
            </a>
          </li>
          <li className="mx-2 my-6 md:my-0">
            <a ref={scrollRef}  id="features-section" className="text-black font-black mx-4 hover:text-blue duration-500 cursor-pointer"  onClick={() => scrollToFeatures()}>
              Features
            </a>
          </li>
          <li className="mx-2 my-6 md:my-0">
            <a ref={scrollRef}  id="about-section" className="text-black font-black mx-4 hover:text-blue duration-500 cursor-pointer" onClick={() => scrollToAbout()}>
              About
            </a>
          </li>
          <li className="mx-2 my-6 md:my-0">
            <a ref={scrollRef} className="text-black font-black mx-4 hover:text-blue duration-500 cursor-pointer" onClick={() => scrollToContact()}>
              Contact
            </a>
          </li>
          <li className="mx-2 my-6 md:my-0">
            <Link href="/home_unregistered" className="text-blue underline ml-4 md:mx-2">Try Nebula</Link>
            <span className="text-blue ml-2 md:ml-2">or</span>
          </li>
          <Link href="/register">
            <button className="text-white bg-blue py-2 px-5 rounded-lg mx-4 md:mx-4 hover:bg-color">
              Register
            </button>
          </Link>
        </ul>
        <button
          onClick={() => setMenu(!menu)}
          className="text-white bg-blue py-2 px-2 rounded-lg mx-4 md:mx-4 hover:bg-color md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </button>
      </nav>
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

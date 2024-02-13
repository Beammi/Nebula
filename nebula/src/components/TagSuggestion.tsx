import Button from "./Button";
import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import TimeLimitBox from "./TimeLimitBox";
import Image from "next/image";
import closeIcon from "../../public/images/close.png";
import smallHashtag from "../../public/images/smallHashtag_blue.png";
import filterIcon from "../../public/images/filter-icon.png"
import marketPic from "../../public/images/marketPic.png"
import bigBenPic from "../../public/images/bigBenPic.png"
import yellowPin from "../../public/images/yellowPin.png"
import yellowFlag from "../../public/images/yellowFlag.png"

import Link from 'next/link'
// import smallHashtag from "../../public/images/smallHashtag.png";
import NebuTag from "./NebuTag";

export default function TagSuggestion(props) {
  const tagSuggestionState = props.toggle;
  const action = props.action;
  const tagName = props.tagName;

  const mockHashtagData = [
    {
      "title": "Markets in London",
      "address": "Borough Market, Southbank Market, Blackfriars Road Food Market",
      "description": "A nice view of Big Ben during the sunset. You can get this view from the Queen’s Walk near Sea Life Lond...",
      "type": "tour",
      "username": "nat2100"
    },
    {
      "title": "Big Ben",
      "address": "London SW1A 0AA, United Kingdom",
      "description": "A Landmark of England. One of the most popolar clock tower in the entire world.",
      "type": "nebu",
      "username": "beammi4567"
    },
    {
      "title": "Markets in London",
      "address": "Borough Market, Southbank Market, Blackfriars Road Food Market",
      "description": "A nice view of Big Ben during the sunset. You can get this view from the Queen’s Walk near Sea Life Lond...",
      "type": "tour",
      "username": "birdie007"
    },
    {
      "title": "Big Ben",
      "address": "London SW1A 0AA, United Kingdom",
      "description": "A Landmark of England. One of the most popolar clock tower in the entire world.",
      "type": "nebu",
      "username": "nat2100"
    },
  ]

  return (
    <div
      className={`fixed top-1/2 left-1/2 rounded-lg tranforms -translate-x-1/2 -translate-y-1/2 transition-all ease-in duration-500 ${
        tagSuggestionState
          ? "visible opacity-100 drop-shadow-2xl"
          : "rounded-sm invisible opacity-0"
      } `}
    >
      <div className="rounded-lg shadow-md bg-dim-grey lg:w-[60rem] font-bold text-black p-7 ">
        <div className="flex justify-start my-2 lg:px-0 px-7">
          <h3 className="text-2xl text-black flex gap-x-3"><figure> <Image src={smallHashtag} alt="pic" width={30}/> </figure> {tagName}</h3>
          <div className="ml-auto dropdown dropdown-end dropdown-hover mr-4">
            <div tabIndex={0} role="button" className="btn btn-sm m-1 normal-case bg-white drop-shadow-md text-black border-none hover:border-none hover:bg-grey">Filter <figure className=''><Image src={filterIcon} alt="pic" className="" width={22} height={20}/></figure> </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-1 bg-grey text-black border-none hover:border-none hover:bg-grey rounded-box w-max">                    
              <li><a href='https://www.google.com/' className='hover:text-black'>High Rated</a></li>
              <li><a href='https://www.google.com/' className='hover:text-black'>Newest</a></li>
              <li><a href='https://www.google.com/' className='hover:text-black'>Oldest</a></li>
            </ul>
          </div>
          <button onClick={action}>
            <Image
              src={closeIcon}
              alt="clsbtn"
              className=""
              width={20}
            />
          </button>
        </div>

        <div className="w-full h-[3px] bg-grey "></div>

        <div className="text-black mt-5 w-fit h-[500px] overflow-y-scroll ">
          
          {mockHashtagData.map((data, index) => (
            <div key={index} className="card lg:card-side bg-white shadow-md w-full px-4 lg:py-0 py-4 mb-4 flex flex-col lg:flex-row">
              <figure className="w-full lg:w-[20%] flex-shrink-0"><Image src={marketPic} alt="pic" className=" lg:h-auto"/></figure>
              <div className="card-body flex flex-col justify-between">
                {
                  (data.type === "nebu") &&
                  <h2 className="card-title w-full lg:w-full flex flex-col lg:flex-row">
                    <figure className="lg:w-[3%]"><Image src={yellowPin} alt="pic" /></figure>
                    {data.title} 
                    <p className="font-normal text-base text-black-grey w-fit text-center lg:text-start">added by {data.username}</p>
                  </h2>
                }
                {
                  (data.type === "tour") &&
                  <h2 className="card-title w-full lg:w-full flex flex-col lg:flex-row">
                    <figure className="lg:w-[3%]"><Image src={yellowFlag} alt="pic"/></figure>
                    {data.title} 
                    <p className="font-normal text-base text-black-grey w-fit text-center lg:text-start">added by {data.username}</p>
                  </h2>
                }                
                <p className="font-medium">{data.address}</p>
                <p className="font-medium">{data.description}</p>
                <div className='flex flex-row mt-1 gap-x-2'>
                  <Link href="https://www.google.com/" className=" px-2 py-1 w-fit bg-yellow text-white rounded-lg normal-case border-0 text-sm cursor-pointer">#tourist_attraction</Link>
                  <Link href="https://www.google.com/" className=" px-2 py-1 w-fit bg-grey text-black rounded-lg normal-case border-0 text-sm cursor-pointer">#bridge</Link>
                  <Link href="https://www.google.com/" className=" px-2 py-1 w-fit bg-grey text-black rounded-lg normal-case border-0 text-sm cursor-pointer">#natLikes</Link>
                </div>
                
              </div>
            </div>
          ))}
          
          
        </div>
      </div>
    </div>
  );
}

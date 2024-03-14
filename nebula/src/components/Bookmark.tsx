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
import blueBookmark from "../../public/images/blueBookmark.png"
import filledoutBlueBookmark from "../../public/images/filledoutBlueBookmark.png"

import Link from 'next/link'

export default function Bookmark(props) {
  const state = props.toggle;
  const action = props.action;
  const tagName = props.tagName;

  const mockHashtagData = [
    {
      "title": "Markets in London",
      "address": "Borough Market, Southbank Market, Blackfriars Road Food Market",
      "description": "A nice view of Big Ben during the sunset. You can get this view from the Queen’s Walk near Sea Life London. A spectacular view",
      "type": "tour",
      "username": "nat2100"
    },
    {
      "title": "Big Ben",
      "address": "London SW1A 0AA, United Kingdom",
      "description": "A must destination in UK. Coming in daytime makes your picture much better while the image at night also looks exceptional. This is worth it, there are many attractions near this place. You should come before you die. I recommend it!!",
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
        state
          ? "visible opacity-100 drop-shadow-2xl"
          : "rounded-sm invisible opacity-0"
      } `}
    >
      <div className="rounded-lg shadow-md bg-dim-grey w-[23rem] lg:w-[35rem] h-auto lg:h-[40rem] font-bold text-black p-7">
        <div className="flex justify-start my-2 items-center">
          <div className="flex gap-x-5 ml-3 items-center">
            <figure className=""> <Image src={filledoutBlueBookmark} alt="pic" width={27}/> </figure>
            <h3 className="text-xl lg:text-2xl text-black flex gap-x-2">Bookmark items</h3>
          </div>          
          <div className="ml-auto dropdown dropdown-end dropdown-hover mr-4">
            <div tabIndex={0} role="button" className="btn btn-sm m-1 normal-case bg-white drop-shadow-md text-black border-none hover:border-none hover:bg-grey flex flex-nowrap">Filter <figure className='w-full'><Image src={filterIcon} alt="pic" className="" /></figure> </div>
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
              className="ml-auto"
              width={20}
            />
          </button>
        </div>

        <div className="w-full h-[3px] bg-grey "></div>

        <div className="text-black mt-5 w-fit h-[500px] overflow-y-scroll">
          
          {mockHashtagData.map((data, index) => (
            <div key={index} className="card lg:card-side bg-white shadow-md w-full px-4 lg:py-0 py-4 mb-4 flex flex-col lg:flex-row lg:items-start">
              <figure className="w-full lg:w-[37%] flex-shrink-0 lg:mt-10"><Image src={marketPic} alt="pic" className=" lg:h-auto"/></figure>
              <div className="card-body flex flex-col justify-between">
                {
                  (data.type === "nebu") &&
                  <h2 className="card-title w-full lg:w-full flex flex-col lg:flex-row flex-wrap">
                    <div className="flex w-full gap-3 flex-col lg:flex-row">
                      <figure className="lg:w-[10%]"><Image src={yellowPin} alt="pic"/></figure>
                      <p className="w-full text-center lg:text-start">{data.title}</p>
                    </div>  
                    <p className="font-normal text-base text-black-grey w-full text-center lg:text-start">added by {data.username}</p>
                  </h2>
                }
                {
                  (data.type === "tour") &&
                  <h2 className="card-title w-full lg:w-full flex flex-col lg:flex-row flex-wrap">
                    <div className="flex w-full gap-3 flex-col lg:flex-row">
                      <figure className="lg:w-[10%]"><Image src={yellowFlag} alt="pic"/></figure>
                      <p className="w-full text-center lg:text-start">{data.title}</p>
                    </div>                    
                    <p className="font-normal text-base text-black-grey w-full text-center lg:text-start">added by {data.username}</p>
                  </h2>
                }                
                <p className="font-medium">{data.address}</p>
                <p className="font-normal overflow-hidden lg:h-auto line-clamp-2 lg:line-clamp-3">{data.description}</p>
                <div className='flex flex-row mt-1'>
                  <div className='flex gap-2 flex-wrap'>
                    <Link href="https://www.google.com/" className="px-2 py-1 bg-yellow text-white rounded-lg normal-case border-0 text-sm cursor-pointer">#tourist_attraction</Link>
                    <Link href="https://www.google.com/" className="px-2 py-1 bg-grey text-black rounded-lg normal-case border-0 text-sm cursor-pointer">#bridge</Link>
                    <Link href="https://www.google.com/" className="px-2 py-1 bg-grey text-black rounded-lg normal-case border-0 text-sm cursor-pointer">#natLikes</Link>
                    <Link href="https://www.google.com/" className="px-2 py-1 bg-grey text-black rounded-lg normal-case border-0 text-sm cursor-pointer">#natLikes</Link>
                  </div>
                </div>
                
              </div>
            </div>
          ))}
          
          
        </div>
      </div>
    </div>
  );
}

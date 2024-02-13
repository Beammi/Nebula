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
import Link from 'next/link'
// import smallHashtag from "../../public/images/smallHashtag.png";
import NebuTag from "./NebuTag";

export default function TagSuggestion(props) {
  const tagSuggestionState = props.toggle;
  const action = props.action;
  const tagName = props.tagName;

  const [uploadedImages, setUploadedImages] = useState([]);
  const [OpenTag, setOpenTag] = useState(false);

  function openTagModal(){
    setOpenTag(!OpenTag);
  }

  const handleImagesUpload = (uploadedImage) => {
    // Handle the uploaded image(s) as needed
    console.log("Uploaded Image:", uploadedImage);
    setUploadedImages((prevImages) => [...prevImages, uploadedImage]);
  };

  return (
    <div
      className={`fixed top-1/2 left-1/2 rounded-lg tranforms -translate-x-1/2 -translate-y-1/2 transition-all ease-in duration-500 ${
        tagSuggestionState
          ? "visible opacity-100 drop-shadow-2xl"
          : "rounded-sm invisible opacity-0"
      } `}
    >
      <div className="modal-box bg-dim-grey w-max font-bold text-black p-7">
        <div className="flex justify-start my-2">
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

        <div className="text-black mt-5 w-fit">
          

          <div className="card lg:card-side bg-white shadow-md w-fit">
            <figure><Image src={marketPic} alt="pic" className="w-full"/></figure>
            <div className="card-body">
              <h2 className="card-title">Markets in London</h2>
              <p>Places: Borough Market, Southbank Market, Blackfriars Road Food Market</p>
              <div className='flex flex-row mt-1 gap-x-2'>
                <Link href="https://www.google.com/" className=" px-2 py-1 w-fit bg-yellow text-white rounded-lg normal-case border-0 text-sm cursor-pointer">#tourist_attraction</Link>
                <Link href="https://www.google.com/" className=" px-2 py-1 w-fit bg-grey text-black rounded-lg normal-case border-0 text-sm cursor-pointer">#bridge</Link>
                <Link href="https://www.google.com/" className=" px-2 py-1 w-fit bg-grey text-black rounded-lg normal-case border-0 text-sm cursor-pointer">#natLikes</Link>
              </div>
              {/* <div className="card-actions justify-end">
                <button className="btn btn-primary">Listen</button>
              </div> */}
            </div>
          </div>

          <div className="card lg:card-side bg-white shadow-md mt-4 w-fit">
            <figure><Image src={bigBenPic} alt="pic" className="w-full"/></figure>
            <div className="card-body">
              <h2 className="card-title">Big Ben</h2>
              <p>Address: London, SW1A 0AA, United Kingdom</p>
              <p>A nice view of Big Ben during the sunset. You can get this view from the Queen’s Walk near Sea Life Lond...</p>
              <div className='flex flex-row mt-1 gap-x-2'>
                <Link href="https://www.google.com/" className=" px-2 py-1 w-fit bg-yellow text-white rounded-lg normal-case border-0 text-sm cursor-pointer">#tourist_attraction</Link>
                <Link href="https://www.google.com/" className=" px-2 py-1 w-fit bg-grey text-black rounded-lg normal-case border-0 text-sm cursor-pointer">#bridge</Link>
                <Link href="https://www.google.com/" className=" px-2 py-1 w-fit bg-grey text-black rounded-lg normal-case border-0 text-sm cursor-pointer">#natLikes</Link>
              </div>
              {/* <div className="card-actions justify-end">
                <button className="btn btn-primary">Listen</button>
              </div> */}
            </div>
          </div>


          
        </div>
      </div>
    </div>
  );
}

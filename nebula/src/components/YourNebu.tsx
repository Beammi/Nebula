import Button from "./Button";
import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import TimeLimitBox from "./TimeLimitBox";
import Image from "next/image";
import closeIcon from "../../public/images/close.png";
import smallHashtag from "../../public/images/smallHashtag_blue.png";
import filterIcon from "../../public/images/filter-icon.png"
import skyPic from "../../public/images/skyPic.png"
import profilePic from "../../public/images/lionelPic.png"
import holmesPic from "../../public/images/holmesPic.png"
import ferryWheelPic from "../../public/images/ferryWheelPic.png"
// import closeIcon from "../../public/images/close.png"


import Link from 'next/link'
// import smallHashtag from "../../public/images/smallHashtag.png";
import NebuTag from "./NebuTag";

export default function YourNebu(props) {
  const accountProfileState = props.toggle;
  const action = props.action;
  const accountName = props.accountName;
  const [showInfo, setShowInfo] = useState([false])
  const [showAllSelectBox, setShowAllSelectBox] = useState(false)

  const data = [{
    "title": "Big Ben",
    "description": "A must destination in UK. Coming in daytime makes your picture much better while the image at night also looks exceptional. This is worth it, there are many attractions near this place. You should come before you die. I recommend it!!"
  },
  {
    "title": "London Stadium",
    "description": "A must destination in UK. Coming in daytime makes your picture much better while the image at night also looks exceptional. This is worth it, there are many attractions near this place. You should come before you die. I recommend it!!"
  },
  {
    "title": "Sherlock homes museum",
    "description": "A must destination in UK. Coming in daytime makes your picture much better while the image at night also looks exceptional. This is worth it, there are many attractions near this place. You should come before you die. I recommend it!!"
  }]

  console.log("This is account name: ", accountName);

  function handleSelect(){

  }
  

  return (
    <div
      className={`fixed top-1/2 left-1/2 rounded-lg tranforms -translate-x-1/2 -translate-y-1/2 transition-all ease-in duration-500 ${
        accountProfileState
          ? "visible opacity-100 drop-shadow-2xl"
          : "rounded-sm invisible opacity-0"
      } `}
    >
      <div className="relative flex flex-col rounded-lg shadow-md bg-dim-grey w-[20rem] lg:w-[35rem] font-bold text-black h-[32rem] lg:h-[40rem] overflow-y-scroll">
        <div className="flex flex-col justify-start">
            <button onClick={action} className="absolute top-0 right-0 mt-4 mr-4 z-10">
                <Image
                    src={closeIcon}
                    alt="clsbtn"
                    className=""
                    width={20}
                />
            </button>
        </div>
        <div className="flex flex-col mt-12 px-10 pb-5">
            <h2 className="text-2xl text-center">Your Nebu</h2>
            {data.map((data, index) => (
                <>
                    <div className="flex flex-row text-white font-normal pl-5 py-1 mt-3 bg-blue rounded-lg w-full drop-shadow-md cursor-pointer"
                        onClick={() => {
                            const updatedShowInfo = [...showInfo]; // Make a copy of the showInfo array
                            updatedShowInfo[index] = !updatedShowInfo[index]; // Toggle the value at the specific index
                            setShowInfo(updatedShowInfo); // Update the state with the modified array
                        }}>
                            {data.title}
                            {/* <input type="checkbox" className="checkbox ml-auto mr-5 checkbox-accent border-[1.5px] border-white" /> */}
                            <input type="checkbox" className={`${showAllSelectBox ? "visible opacity-100" : "invisible opacity-0"} checkbox ml-auto mr-5 checkbox-accent border-[1.5px] border-dashed border-white`} />
                    </div>
                    <div className={`transition-all ease-in duration-00 ${showInfo[index] ? 'h-auto opacity-100' : 'h-0 opacity-0'}`}>
                        { showInfo[index] && (
                            <div className="flex flex-col bg-white mt-3 pl-5 py-2 pr-2 rounded-lg gap-y-3 drop-shadow-md">
                                <h3 className="text-md mt-2">{data.title}</h3>
                                <div className='flex flex-row lg:flex-row mt-1 gap-2 flex-wrap lg:w-auto'>
                                    <Link href="https://www.google.com/" className="px-1 lg:px-2 py-1 w-fit bg-yellow text-white rounded-lg normal-case border-0 text-sm cursor-pointer">#tourist_attraction</Link>
                                    <Link href="https://www.google.com/" className=" px-1 lg:px-2 py-1 w-fit bg-grey text-black rounded-lg normal-case border-0 text-sm cursor-pointer">#bridge</Link>
                                    <Link href="https://www.google.com/" className=" px-1 lg:px-2 py-1 w-fit bg-grey text-black rounded-lg normal-case border-0 text-sm cursor-pointer">#natLikes</Link>
                                </div>
                                <p className="font-normal">{data.description}</p>
                                <div className="flex gap-x-2 w-2/3 overflow-x-scroll">
                                    <figure> <Image alt="pic" src={ferryWheelPic}/> </figure>
                                    <figure> <Image alt="pic" src={holmesPic}/> </figure>
                                </div>
                                <button className="rounded-lg py-2 px-4 normal-case font-normal text-white ml-auto mr-5 bg-blue">Edit</button>
                            </div>
                        )}
                    </div>
                </>
            ))}
            
            <button className="rounded-lg mt-16 py-2 px-4 normal-case font-normal text-white ml-auto mr-5 bg-blue" onClick={() => setShowAllSelectBox(!showAllSelectBox)}>Select</button>
            
            
        </div>


        

        
      </div>
    </div>
  );
}

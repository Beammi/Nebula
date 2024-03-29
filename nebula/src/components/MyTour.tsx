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


export default function MyTour(props) {
  const mockData = [{
    "title": "'A Must' London Show",
    "description": "A must destination in UK. Coming in daytime makes your picture much better while the image at night also looks exceptional. This is worth it, there are many attractions near this place. You should come before you die. I recommend it!!",
    "place": ["Big Ben", "Tower Bridge", "London Eye", "Wembley Stadium"]
  },
  {
    "title": "Flower Garden Tour",
    "description": "A must destination in UK. Coming in daytime makes your picture much better while the image at night also looks exceptional. This is worth it, there are many attractions near this place. You should come before you die. I recommend it!!",
    "place": ["Big Ben", "Tower Bridge", "London Eye", "Wembley Stadium"]
  },
  {
    "title": "Street Musician Tour",
    "description": "A must destination in UK. Coming in daytime makes your picture much better while the image at night also looks exceptional. This is worth it, there are many attractions near this place. You should come before you die. I recommend it!!",
    "place": ["Big Ben", "Tower Bridge", "London Eye", "Wembley Stadium"]
  }]
  const state = props.toggle;
  const action = props.action;
  const accountName = props.accountName;
  const [showInfo, setShowInfo] = useState([false])
  const [showAllSelectBox, setShowAllSelectBox] = useState(false)
  const [data, setData] = useState(mockData)
  // const [data, setData] = u
  const [checkedStatus, setCheckedStatus] = useState(data.map(() => false)); // Initialize array with 'false' values for each checkbox
  const [showDeletePopUp, setShowDeletePopUp] = useState(false)
  

  function handleCheckboxClick(index) {
    const newCheckedStatus = [...checkedStatus]; // Make a copy of the checkedStatus array
    newCheckedStatus[index] = !newCheckedStatus[index]; // Toggle the checked status at the specific index
    setCheckedStatus(newCheckedStatus); // Update the state with the modified array
    // console.log("Checkbox change at: ", index);
    
  }

  // console.log("This is account name: ", accountName);

  // function handleSelect(){

  function handleDeleteData(){
    const updatedData = data.filter((_, i) => !checkedStatus[i]); // if checked(= true), we will not count so false
    setData(updatedData); // Update the data array
    setShowDeletePopUp(false);
    setCheckedStatus([false])
  }
  

  return (
    <div
      className={`fixed top-1/2 left-1/2 rounded-lg tranforms -translate-x-1/2 -translate-y-1/2 transition-all ease-in duration-500 ${
        state
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
            <h2 className="text-2xl text-center">My Tour</h2>
            {data.map((data, index) => (
                <>
                    <div className="flex flex-row text-white font-normal py-1 mt-3 bg-blue rounded-lg w-full drop-shadow-md">
                      <p className="w-full pl-5 cursor-pointer"
                          onClick={() => {
                            const updatedShowInfo = [...showInfo]; // Make a copy of the showInfo array
                            updatedShowInfo[index] = !updatedShowInfo[index]; // Toggle the value at the specific index
                            setShowInfo(updatedShowInfo); // Update the state with the modified array
                        }}>{data.title}</p>            
                      <input type="checkbox" 
                        className={`${showAllSelectBox ? "visible opacity-100" : "invisible opacity-0"} checkbox ml-auto mr-5 checkbox-accent border-[1.5px] border-dashed border-white`} 
                        checked={checkedStatus[index]} // Set checked status based on the state
                        onChange={() => handleCheckboxClick(index)}/>
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
                                <div className="flex flex-row flex-wrap">
                                    <p className="font-normal">Places:&nbsp;</p>
                                    {data.place.map((place, placeIndex) => (
                                        <React.Fragment key={placeIndex}>
                                        <p className="font-normal">{place}</p>
                                        {placeIndex !== data.place.length - 1 && <p className="font-normal">,&nbsp;</p>}
                                        </React.Fragment>
                                    ))}
                                </div>                                
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
            
            { showAllSelectBox ?
              <div className="flex px-1 lg:px-10">
                <button className="mr-auto justify-self-start rounded-lg mt-16 py-2 px-4 normal-case font-normal text-black bg-dark-grey" onClick={() => setShowAllSelectBox(!showAllSelectBox)}>Cancel</button>
                <button className="ml-auto rounded-lg mt-16 py-2 px-4 normal-case font-normal text-white bg-red" onClick={() => setShowDeletePopUp(!showDeletePopUp)}>Delete</button>
              </div>
              : 
              <button className="rounded-lg mt-16 py-2 px-4 normal-case font-normal text-white ml-auto mr-10 bg-blue" onClick={() => setShowAllSelectBox(!showAllSelectBox)}>Select</button>              
            }

            <div
              className={`fixed top-1/2 left-1/2 rounded-lg tranforms -translate-x-1/2 -translate-y-1/2 transition-opacity ease-in duration-200  ${
                showDeletePopUp
                  ? "visible opacity-100 shadow-md bg-dim-grey w-[20rem] lg:w-[35rem] border-2"
                  : "rounded-sm invisible opacity-0"
              } `}
            >
              <div className="flex flex-col p-7">
                <p className="text-lg">Do you want to confirm to delete your Nebu?</p>
                <div className="flex px-10">
                  <button className="mr-auto justify-self-start rounded-lg mt-16 py-2 px-4 normal-case font-normal text-black bg-dark-grey" onClick={() => setShowDeletePopUp(!showDeletePopUp)}>Cancel</button>
                  <button className="ml-auto rounded-lg mt-16 py-2 px-4 normal-case font-normal text-white bg-red" onClick={() => handleDeleteData()}>Confirm</button>
                </div>
              </div>
            </div>
            
            
        </div>


        

        
      </div>
    </div>
  );
}

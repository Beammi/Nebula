import React, { useState } from 'react'
import Image, { StaticImageData } from 'next/image'

import towerBridgePic from "../../public/images/tower-bridge-pic.png"
import shareIcon from "../../public/images/share-pic.png"
import directionsIcon from "../../public/images/directions-pic.png"
import recommendIcon from "../../public/images/recommend-tour-pic.png"
import bookmarkIcon from "../../public/images/bookmark-pic.png"
import filterIcon from "../../public/images/filter-icon.png"

import smallPin from "../../public/images/small-pin.png"
import smallShop from "../../public/images/small-shop.png"
import smallClock from "../../public/images/small-clock.png"
import smallWorld from "../../public/images/small-world.png"
import smallPhone from "../../public/images/small-phone.png"
import otherNebuPic1 from "../../public/images/others-nebu-1.png"
import otherNebuPic2 from "../../public/images/others-nebu-2.png"
import Link from 'next/link'

import Button from "./Button"

// interface PlaceInfoPanelProps { 
//   placeData: { // not necessary to know lat, lon
//     name: string;
//     description: string;
//     image?: StaticImageData;
//     pinSize?: string;
//     // Add other properties as needed
//   } | null;
//   toggle: boolean;
//   action?: any;
// }
  
export default function PlaceInfoPanel({toggle, action, placeData}) {

  const [overviewSection, setOverviewSection] = useState(true)
  const [rateCommentSection, setRateCommentSection] = useState(false)
  const [othersNebuSection, setOthersNebuSection] = useState(false)

  function openOverviewSection(){
    setOverviewSection(true)
    setRateCommentSection(false)
    setOthersNebuSection(false)
  }

  function openRateCommentSection(){
    setOverviewSection(false)
    setRateCommentSection(true)
    setOthersNebuSection(false)
  }

  function opneOthersNebuSection(){
    setOverviewSection(false)
    setRateCommentSection(false)
    setOthersNebuSection(true)
  }
  

  return (
    <div className={`absolute overflow-y-scroll 2xl:w-1/4 lg:w-1/3 z-10 h-screen rounded-sm bg-white text-black transition-all duration-300 ease-in-out 
      ${toggle ? "opacity-100 drop-shadow-2xl" : "hidden"}`}>
      
      <div className=' text-black '>
      
        {placeData ? (
          <div>
            
            <figure><Image src={towerBridgePic} alt="pic" className="pt-0 mb-1 w-full"/></figure>
            <div className='flex flex-col pl-4 pt-2 gap-y-1'>
              <div className='flex flex-row'>
                <h3 className='font-bold text-xl text-black  bg-white w-fit'>{placeData.name}</h3>
                {/* <figure className='ml-auto'><Image src={shareIcon} alt="pic" className="mr-4" width={31}/></figure> */}
              </div>

              <div className='flex flex-row'>
                <div className="rating">
                  <input type="radio" name="rating-1" className="mask mask-star bg-yellow h-4 " />
                  <input type="radio" name="rating-1" className="mask mask-star bg-yellow h-4" />
                  <input type="radio" name="rating-1" className="mask mask-star bg-yellow h-4" />
                  <input type="radio" name="rating-1" className="mask mask-star bg-yellow h-4" checked/>
                  <input type="radio" name="rating-1" className="mask mask-star bg-yellow h-4" />
                  <label className='text-sm leading-4 text-yellow'>4.0</label>
                </div>
                <label className='text-sm text-black-grey ml-3 leading-4'>Added by nat2100</label>
              </div>

              <div className='flex flex-row mt-1 gap-x-1 overflow-x-auto'>
                

                <button className="btn btn-outline btn-sm text-blue rounded-2xl normal-case hover:bg-light-grey">
                  <figure ><Image src={recommendIcon} alt="pic" className="" width={14} height={21}/></figure>
                  Recommend Tour
                </button>

                <button className="btn btn-outline btn-sm text-black rounded-2xl normal-case hover:bg-light-grey">
                  <figure ><Image src={bookmarkIcon} alt="pic" className="" width={26} height={26}/></figure>
                  Save
                </button>

                <button className="btn btn-outline btn-sm text-black rounded-2xl normal-case hover:bg-light-grey ">
                  <figure ><Image src={shareIcon} alt="pic" className="" width={23}/></figure>
                  Share
                </button>
              </div>

              <div className='flex flex-row mt-1 gap-x-2'>
                <Link href="https://www.google.com/" className=" px-2 py-1 w-fit bg-yellow text-white rounded-lg normal-case border-0 text-sm cursor-pointer">#tourist_attraction</Link>
                <Link href="https://www.google.com/" className=" px-2 py-1 w-fit bg-grey text-black rounded-lg normal-case border-0 text-sm cursor-pointer">#bridge</Link>
                <Link href="https://www.google.com/" className=" px-2 py-1 w-fit bg-grey text-black rounded-lg normal-case border-0 text-sm cursor-pointer">#natLikes</Link>
              </div>

              {/* <p>{placeData.description}</p> */}
            </div>

            <div className='flex flex-col pt-2'>
                <div className='flex flex-row mt-4 ml-7 gap-x-7'>
                  
                  <div className='flex flex-col items-center justify-end'>
                    <button className={`btn transition-all duration-150 ease-in-out normal-case bg-transparent hover:bg-transparent text-black  active:text-blue hover:text-black-grey border-x-0 border-t-0 border-b-4 border-white hover:border-b-4 hover:border-grey  font-medium rounded-none
                      ${overviewSection ? 'text-blue border-b-4 border-blue' : ''}`}
                      onClick={openOverviewSection}>Overview</button>
                  </div>

                  <div className='flex flex-col items-center justify-end'>                                      
                    <button className={`btn transition-all duration-150 ease-in-out normal-case bg-transparent hover:bg-transparent text-black  active:text-blue hover:text-black-grey border-x-0 border-t-0 border-b-4 border-white hover:border-b-4 hover:border-grey  font-medium rounded-none
                      ${rateCommentSection ? 'text-blue border-b-4 border-blue' : ''}`}
                      onClick={openRateCommentSection}>Rate & Comment</button>
                  </div>

                  <div className='flex flex-col items-center justify-end'>
                    <button className={`btn transition-all duration-150 ease-in-out normal-case bg-transparent hover:bg-transparent text-black  active:text-blue hover:text-black-grey border-x-0 border-t-0 border-b-4 border-white hover:border-b-4 hover:border-grey  font-medium rounded-none
                        ${othersNebuSection ? 'text-blue border-b-4 border-blue' : ''}`}
                        onClick={opneOthersNebuSection}>Others Nebu</button>
                  </div>
                </div>

                <div className="w-full h-[3px] bg-grey "></div>

                {overviewSection &&
                  <>
                    <p className='ml-7 mt-10 pr-6'>{placeData.description}</p>
                    <div className="w-full h-[3px] bg-grey mt-10"></div>
                  </>                  
                }

                
            </div>

            {overviewSection && 
              <div className='flex flex-col my-8 ml-7 gap-y-6 transition-all delay-300 ease-in-out'>
                <div className='flex flex-row'>
                  <figure className=''><Image src={smallPin} alt="pic" className="mr-4" width={16} height={22}/></figure>
                  <p className='leading-5'>Tower Bridge Rd, London SE1 2UP, United Kingdom</p>
                </div>

                <div className='flex flex-row'>
                  <figure className=''><Image src={smallShop} alt="pic" className="mr-4" width={22} height={20}/></figure>
                  <p className='leading-5'>Mon - Sat, 8.00 - 22.00</p>
                </div>

                <div className='flex flex-row'>
                  <figure className=''><Image src={smallClock} alt="pic" className="mr-4" width={19.7} height={18}/></figure>
                  <p className='leading-5'>End this Monday</p>
                </div>

                <div className='flex flex-row'>
                  <figure className=''><Image src={smallWorld} alt="pic" className="mr-4" width={19} height={19}/></figure>
                  <p className='leading-5'>http://www.towerbridge.org.uk/</p>
                </div>

                <div className='flex flex-row'>
                  <figure className=''><Image src={smallPhone} alt="pic" className="mr-4" width={18.6} height={18.6}/></figure>
                  <p className='leading-5'>+44 2074033761</p>
                </div>
              </div>
            }

            {rateCommentSection && 
              <div className='flex flex-col my-8 ml-7 gap-y-8 transition-all delay-300 ease-in-out'>

                <div
                  className="px-3 flex items-top bg-white cursor-pointer">
                  <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&h=500"
                      className="h-12 w-12 border-2 border-white rounded-full mt-1" alt="" />
                  {/* <Image src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=3880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="pic" className="" width={48} height={48}/>                   */}
                  <div className="ml-4 pr-7">
                      <p className="text-sm font-medium text-black mb-1">Natlntt</p>
                      <input type="text" placeholder="Type your comment..." className="input input-bordered bg-white rounded-none border-x-0 border-t-0 border-b-2 focus:outline-0 focus:outline-offset-0 focus:border-black transition-all delay-100 ease-in-out w-full max-w-xs" />
                  </div>
                </div>                

                <div
                  className="px-3 flex items-top bg-white cursor-pointer">
                  <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2550&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500"
                      className="h-12 w-12 border-2 border-white rounded-full mt-1" alt="" />                  
                  <div className="ml-4 pr-7">
                      <p className="text-sm font-medium text-black mb-1">Beammi_2000</p>
                      <p className="text-xs -mt-0.5 font-normal text-black" x-text="user.email">The full of tourism make an enjoyable environment. Good picture with every angle. It remind me to the last trip that I come.</p>
                  </div>
                </div>

                <div
                  className="px-3 flex items-top bg-white cursor-pointer">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500"
                      className="h-12 w-12 border-2 border-white rounded-full mt-1" alt="" />                  
                  <div className="ml-4 pr-7">
                      <p className="text-sm font-medium text-black mb-1">BirdieInwZaa</p>
                      <p className="text-xs -mt-0.5 font-normal text-black" x-text="user.email">The full of tourism make an enjoyable environment. Good picture with every angle. It remind me to the last trip that I come.</p>
                  </div>
                </div>

                <div
                  className="px-3 flex items-top bg-white cursor-pointer">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=3988&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500"
                      className="h-12 w-12 border-2 border-white rounded-full mt-1" alt="" />                  
                  <div className="ml-4 pr-7">
                      <p className="text-sm font-medium text-black mb-1">Henry7</p>
                      <p className="text-xs -mt-0.5 font-normal text-black" x-text="user.email">The full of tourism make an enjoyable environment. Good picture with every angle. It remind me to the last trip that I come.</p>
                  </div>
                </div>

              </div>
            }

            {othersNebuSection &&
              <div className='flex flex-col my-4 mx-7 transition-all delay-300 ease-in-out'>          

                <div className="ml-auto dropdown dropdown-end dropdown-hover">
                  <div tabIndex={0} role="button" className="btn btn-sm m-1 normal-case bg-dark-grey text-black border-none hover:border-none hover:bg-light-grey">Filter <figure className=''><Image src={filterIcon} alt="pic" className="" width={22} height={20}/></figure> </div>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-1 bg-dark-grey text-black border-none hover:border-none hover:bg-light-grey rounded-box w-max">                    
                    <li><a href='https://www.google.com/' className='hover:text-black'>High Rated</a></li>
                    <li><a href='https://www.google.com/' className='hover:text-black'>Newest</a></li>
                    <li><a href='https://www.google.com/' className='hover:text-black'>Oldest</a></li>
                  </ul>
                </div>

                <div className='flex flex-col gap-y-7 mt-2'>
                  <div
                    className="px-3 flex items-top bg-white cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2550&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500"
                        className="h-12 w-12 border-2 border-white rounded-full mt-1" alt="" />                  
                    <div className="ml-4 pr-7">
                      <p className="text-sm font-medium text-black -mb-0.5">Beammi_2000</p>
                      <div className="rating flex my-1">
                        <input type="radio" name="rating-1" className="mask mask-star bg-yellow h-3 w-5" />
                        <input type="radio" name="rating-1" className="mask mask-star bg-yellow h-3 w-5" />
                        <input type="radio" name="rating-1" className="mask mask-star bg-yellow h-3 w-5" />
                        <input type="radio" name="rating-1" className="mask mask-star bg-yellow h-3 w-5" checked/>
                        <input type="radio" name="rating-1" className="mask mask-star bg-black-grey h-3 w-5" />
                        <label className='text-sm leading-4 text-yellow'>4.0</label>
                      </div>
                      <p className="text-sm -mt-0.5 font-normal text-black " >When the night comes, the view is fantastic. This is unbelievable.</p>
                      <figure><Image src={otherNebuPic1} alt="pic" className="pt-0 my-2 rounded-md"/></figure>
                    </div>
                  </div>

                  <div
                    className="px-3 flex items-top bg-white cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500"
                        className="h-12 w-12 border-2 border-white rounded-full mt-1" alt="" />                  
                    <div className="ml-4 pr-7">
                      <p className="text-sm font-medium text-black -mb-0.5">BirdieInwZaa</p>
                      <div className="rating flex my-1">
                        <input type="radio" name="rating-1" className="mask mask-star bg-yellow h-3 w-5" />
                        <input type="radio" name="rating-1" className="mask mask-star bg-yellow h-3 w-5" />
                        <input type="radio" name="rating-1" className="mask mask-star bg-yellow h-3 w-5" />
                        <input type="radio" name="rating-1" className="mask mask-star bg-yellow h-3 w-5" checked/>
                        <input type="radio" name="rating-1" className="mask mask-star bg-black-grey h-3 w-5" />
                        <label className='text-sm leading-4 text-yellow'>4.0</label>
                      </div>
                      <p className="text-sm -mt-0.5 font-normal text-black" >Closed-up view with a clear sky is mind blowing.</p>
                      <figure><Image src={otherNebuPic2} alt="pic" className="pt-0 my-2 rounded-md"/></figure>
                    </div>
                  </div> 
                </div>             

              </div>              
            }
            
            {/* Add other information as needed */}
          </div>
        ) : (
          <p>No place selected</p>
        )}

        
      </div>

    </div>
  );
};

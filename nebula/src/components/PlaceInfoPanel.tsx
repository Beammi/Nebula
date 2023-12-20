import React from 'react'
import Image, { StaticImageData } from 'next/image'

import towerBridgePic from "../../public/images/tower-bridge-pic.png"
import shareIcon from "../../public/images/share-pic.png"
import directionsIcon from "../../public/images/directions-pic.png"
import recommendIcon from "../../public/images/recommend-tour-pic.png"
import bookmarkIcon from "../../public/images/bookmark-pic.png"

import smallPin from "../../public/images/small-pin.png"
import smallShop from "../../public/images/small-shop.png"
import smallClock from "../../public/images/small-clock.png"
import smallWorld from "../../public/images/small-world.png"
import smallPhone from "../../public/images/small-phone.png"
import Link from 'next/link'

interface PlaceInfoPanelProps { 
  placeData: { // not necessary to know lat, lon
    name: string;
    description: string;
    image?: StaticImageData;
    pinSize?: string;
    // Add other properties as needed
  } | null;
  toggle: boolean;
  action: any;
}
  
const PlaceInfoPanel: React.FC<PlaceInfoPanelProps> = ({toggle, action, placeData }) => {

  return (
    <div className={`absolute overflow-y-scroll z-10 w-[400px] h-screen rounded-sm bg-white text-black transition-all duration-300 ease-in-out 
      ${toggle ? "opacity-100 drop-shadow-2xl" : "hidden"}`}>
      
      <div className=' text-black '>
      
        {placeData ? (
          <div>
            <figure><Image src={towerBridgePic} alt="pic" className="pt-0 mb-1" width={400}/></figure>
            <div className='flex flex-col pl-5 pt-2 gap-y-1'>
              <div className='flex flex-row'>
                <h3 className='font-bold text-xl text-black  bg-white w-fit'>{placeData.name}</h3>
                <figure className='ml-auto'><Image src={shareIcon} alt="pic" className="mr-4" width={31}/></figure>                
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

              <div className='flex flex-row mt-1 gap-x-2 overflow-x-auto'>
                <button className="btn btn-outline btn-sm text-red rounded-2xl normal-case hover:bg-light-grey ">
                  <figure ><Image src={directionsIcon} alt="pic" className="" width={23}/></figure>
                  Directions
                </button>

                <button className="btn btn-outline btn-sm text-blue rounded-2xl normal-case hover:bg-light-grey">
                  <figure ><Image src={recommendIcon} alt="pic" className="" width={14} height={21}/></figure>
                  Recommend Tour
                </button>

                <button className="btn btn-outline btn-sm text-black rounded-2xl normal-case hover:bg-light-grey">
                  <figure ><Image src={bookmarkIcon} alt="pic" className="" width={26.5} height={26}/></figure>
                  Save
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
                    <p className='text-center w-min leading-4 text-blue'>Overview</p>
                    <div className='w-14 h-1.5 bg-blue rounded-md mt-4'></div>
                  </div>

                  <div className='flex flex-col items-center justify-end'>
                    <p className='text-center w-min leading-4'>Rate & Comment</p>
                    <div className='w-14 h-1.5 bg-white rounded-md mt-2'></div>
                  </div>

                  <div className='flex flex-col items-center justify-end'>
                    <p className='text-center w-min leading-4'>Others Nebu</p>
                    <div className='w-14 h-1.5 bg-white rounded-md mt-2'></div>
                  </div>
                </div>

                <div className="w-full h-[3px] bg-grey "></div>

                <p className='ml-7 mt-10 pr-6'>{placeData.description}</p>

                <div className="w-full h-[3px] bg-grey mt-10"></div>
            </div>

            <div className='flex flex-col mt-8 ml-7 gap-y-6'>
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
            
            {/* Add other information as needed */}
          </div>
        ) : (
          <p>No place selected</p>
        )}

        
      </div>

    </div>
  );
};

export default PlaceInfoPanel;
import React from 'react'
import Image, { StaticImageData } from 'next/image'

import smallPhone from "../../public/images/small-phone.png"
import towerBridgePic from "../../public/images/tower-bridge-pic.png"

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

  const myAction = action;
  const myToggle = toggle;


  // const panelStyle: React.CSSProperties = {
  //   width: '300px',
  //   height: '100vh',
  //   padding: '10px',
  //   backgroundColor: '#fff',
  //   position: 'absolute',
  //   top: 0,
  //   zIndex: -10,
  //   left: placeData ? '0' : '-300px', // Show/hide the panel based on placeData presence
  //   transition: 'left 0.3s ease-in-out', // Add a smooth transition
  // };

  console.log("O: ", placeData);
  

  return (
    <div className={`fixed z-10 mx-48 mt-24 w-[400px] h-fit pl-9 pt-[96px] rounded-md bg-white text-black top-0 left-0 tranforms -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out 
      ${myToggle ? "opacity-100 drop-shadow-2xl" : "hidden"}`}>
      
      {/* <h2 className='mt-10 text-black bg-blue'>hello</h2> */}
      <div className=' bg-dark-grey text-black'>
      
        {placeData ? (
          <>
            <figure><Image src={towerBridgePic} alt="pic" className="pt-2" width={360}/></figure>
            <h3 className='font-bold text-lg text-black'>{placeData.name}</h3>
            <p>{placeData.description}</p>
            {/* Add other information as needed */}
          </>
        ) : (
          <p>No place selected</p>
        )}

        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn" onClick={myAction}>
              Close
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default PlaceInfoPanel;
//LocationShowAndSearchInTour.tsx

import React from "react";
import { useState } from "react";
import { useLocation } from "@/contexts/LocationContext";
import { getCurrentLocation, getPlaceName } from "@/utils/navigationUtils";
import { useRouter } from "next/router";
import AddTour from "../tour/AddTour";
import { useTour } from '@/contexts/TourContext'; 
import { TourContextType } from '../../types/tourContext';
interface ILocationSearchPlaceInTour {
  text?: string;
  location?: [number, number];
  onLocationChange?: (location: [number, number], placeName: string) => void; // Callback for changing the location
  mode:string;
}

const LocationSearchPlaceInTour: React.FunctionComponent<
  ILocationSearchPlaceInTour
> = ({ text, location, onLocationChange, mode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [placeText, setPlaceText] = useState([]);
  const { addPlace,addWaypoint } = useTour() as TourContextType;

  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [closeChangeLocation, setCloseChangeLocation] = useState(true);

  const handleClickChange = () => {
    console.log("Change location to:", searchTerm);
    setShowPopup(true); // Show the popup
  };
  const handleClosePopup = () => {
    setShowPopup(false); // Hide the popup
  };

 

  const router = useRouter();

  const handleConfirm = async () => {
    // Example: Assuming you fetch the location and place name based on searchTerm
    // const location: [number, number] = [0, 0]; // Placeholder for actual location fetching logic
    // const placeName: string = searchTerm; // Placeholder for actual place name fetching logic
    console.log("context in location search ",mode)
    const newPlace = {
      id: Date.now(), // or a better ID generation strategy
      name: text,
      location,
    };
    if(mode==="waypoint"){
      addWaypoint(newPlace)
    }else{
      addPlace(newPlace);

    }

    
    // Navigate back to the AddTour page or handle closing the modal as needed
    router.push('/home?addTour=true');
  };

  return (
    <>
      {closeChangeLocation && (
        <div className="fixed left-2/4 bottom-0 w-auto text-center z-10 transform -translate-x-1/2">
          <div className="card w-48 md:w-96 bg-white text-black shadow-lg">
            <div className="card-body w-full">
              <h2 className="card-title">Location</h2>
              <p className="h-10 overflow-y-auto text-sm">{text}</p>
              <div className="card-actions flex justify-between pt-2">
                <div>
                  <button
                    className="btn btn-sm btn-primary text-blue bg-white border-none hover:bg-dark-grey"
                    onClick={handleClickChange}
                  >
                    Change location
                  </button>
                </div>
                <div>
                  <button
                    className="btn btn-sm btn-primary text-white"
                    onClick={handleConfirm}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
          <AddTour placeText={placeText} toggle={undefined} action={undefined}/>
        </div>
      )}

    </>
  );
};
export default LocationSearchPlaceInTour;

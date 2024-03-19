//LocationShowAndSearch.tsx

import React from "react";
import { useState } from "react";
import { useLocation } from "@/contexts/LocationContext";
import { getCurrentLocation, getPlaceName } from "@/utils/navigationUtils";
import { useRouter } from "next/router";
import AddTour from "../AddTour";

interface ILocationSearchPlaceInTour {
  text?: string;
  location?: [number, number];
  onLocationChange?: (location: [number, number], placeName: string) => void; // Callback for changing the location
}

const LocationSearchPlaceInTour: React.FunctionComponent<
  ILocationSearchPlaceInTour
> = ({ text, location, onLocationChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    currentPlace,
    setCurrentPlace,
    setEnableContinuousUpdate,
    setCurrentPosition,
  } = useLocation();
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [closeChangeLocation, setCloseChangeLocation] = useState(true);
  async function searchPlace(query) {
    // Replace spaces with '+' in the query for URL encoding
    const formattedQuery = query.replace(/\s/g, "+");

    // Construct the URL for the Nominatim API request
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      formattedQuery
    )}`;

    try {
      // Perform the fetch request to the Nominatim API
      const response = await fetch(url, {
        method: "GET", // GET request to perform the search
        headers: {
          // Set a meaningful User-Agent header
          "User-Agent": "Nebula/1.0 (63011290@kmitl.ac.th)",
        },
      });

      // Parse the JSON response
      const data = await response.json();

      // Log the entire response data to see what's available
      console.log(data);

      // Example: Log the latitude and longitude of the first result
      if (data.length > 0) {
        console.log(`Latitude: ${data[0].lat}, Longitude: ${data[0].lon}`);
        setCurrentPosition([data[0].lat, data[0].lon]);
        try {
          const placeName = await getPlaceName(data[0].lat, data[0].lon);
          setCurrentPlace(placeName);
        } catch (error) {
          console.error("Failed to fetch place name:", error);
        }
      } else {
        console.log("No results found.");
      }
    } catch (error) {
      console.error("Error searching place:", error);
    }
  }
  const handleClickChange = () => {
    console.log("Change location to:", searchTerm);
    setEnableContinuousUpdate(false); // Stop continuous location updates
    setShowPopup(true); // Show the popup

    // If you had coordinates for the new location, you would call onLocationChange
    // e.g., onLocationChange([newLat, newLng], searchTerm);
  };
  const handleClosePopup = () => {
    setShowPopup(false); // Hide the popup
    // setEnableContinuousUpdate(true)
  };

  const handleSearchPlace = () => {
    searchPlace(searchTerm);
  };

  const router = useRouter();

  const handleConfirm = () => {
    router.push("/home");
    setCloseChangeLocation(false);
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
        </div>
      )}
      {/* Popup Card */}
      {showPopup && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="card bg-white p-4 rounded-lg shadow-lg z-50">
            <div className="flex flex-col items-center">
              <div className="card-body w-48 md:w-full h-40 md:h-80">
                <h2 className="card-title text-black">Search Location</h2>
                <label className="input input-sm md:input-md input-bordered flex items-center gap-2 w-40 md:w-full">
                  <input
                    type="text"
                    className="w-32 md:w-full h-4 md:h-10"
                    placeholder="Search"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
                <button
                  className="btn btn-primary text-white"
                  onClick={handleSearchPlace}
                >
                  Search
                </button>
              </div>

              <button
                className="btn btn-sm btn-error"
                onClick={handleClosePopup}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default LocationSearchPlaceInTour;

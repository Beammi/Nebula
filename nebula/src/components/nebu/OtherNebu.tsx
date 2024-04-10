// OtherNebu.tsx

import React, { useState, useEffect } from "react"
import { format } from "date-fns"

const OtherNebu = ({ originalNebuId, placeName, sortOption }) => {
  const [nebus, setNebus] = useState([]);

  useEffect(() => {
    const fetchOtherNebu = async () => {
      const response = await fetch(
        `/api/nebu/getOtherNebu?place_name=${encodeURIComponent(placeName)}&sortOption=${sortOption}`
      );
      if (response.ok) {
        const data = await response.json();
        // Filter out the original Nebu from the list
        const filteredData = data.filter((nebu) => nebu.nebu_id !== originalNebuId);
        setNebus(filteredData);
      } else {
        // Handle error or no data case
        console.error("Failed to fetch other Nebu");
      }
    };

    if (placeName) {
      fetchOtherNebu();
    }
  }, [placeName, originalNebuId, sortOption]); // Add originalNebuId as a dependency

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <span key={index} className={`inline-block w-4 h-4 ${index < rating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
        ))}
      </div>
    );
  };

  const getInitials = (email) => email.substring(0, 2).toUpperCase();
  const formatDate = (dateString: string | null) => {
    return dateString ? format(new Date(dateString), "PPPp") : "";
  }

  return (
    <div className="flex flex-col gap-y-7 mt-2">
      {nebus.map((nebu, index) => (
        <div key={index} className="px-3 flex items-top bg-white cursor-pointer">
          {nebu.creator_profile_picture ? (
            <img src={nebu.creator_profile_picture} className="h-12 w-12 rounded-full border-2 border-white" alt="" />
          ) : (
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-500 text-white text-sm">
              {getInitials(nebu.creator_email)}
            </div>
          )}
          <div className="ml-4 pr-7">
            <p className="text-sm font-medium text-black -mb-0.5">{nebu.creator_email}</p>
            <p className="text-xs text-black-grey">{formatDate(nebu.created_time)}</p>
            <div className="rating flex -mt-1">
              {renderStars(nebu.average_rating)} 
            </div>
            <p className="text-sm mt-2 font-normal text-black">{nebu.description}</p>
            {nebu.images && nebu.images.length > 0 && (
              <img src={nebu.images[0]} className="pt-0 mt-4 mb-2 rounded-md" alt="picture" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OtherNebu;

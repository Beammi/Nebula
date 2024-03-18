import React, { useState } from "react";

const Dropdown = ({ selected, setSelected }) => {
  const [isActive, setIsActive] = useState(false);

  const options = ["Restaurant", "Cafe with Wifi", "Public Toliet", "Bar", "Attraction","Landmark", 
    "Street Market", "Party", "Motor Show", "Football Match", "Concert", "Product Opening"];

  return (
    <div className="pt-4 relative">
      <div
        className="bg-yellow p-2 rounded-md cursor-pointer w-32"
        onClick={() => setIsActive(!isActive)}
      >
        {selected}
      </div>
      {isActive && (
        <div className="absolute top-full w-32 h-24 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                setSelected(option);
                setIsActive(false);
              }}
              className="p-1 bg-white hover:bg-dark-grey cursor-pointer"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

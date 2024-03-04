import Button from "./Button";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import close from "../../public/images/close.png";
import NebuTag from "./NebuTag";
import Officialdropdown from "./Officialdropdown";
import AddPlaceModal from "./AddPlaceModal";

export default function AddTour(props) {
  const addTourState = props.toggle;
  const action = props.action;

  const [confirmedAdditionalTags, setConfirmedAdditionalTags] = useState([]);
  const [selected, setSelected] = useState("Official's Tag");
  const [OpenTag, setOpenTag] = useState(false);
  const [AddPlace, setAddPlace] = useState(false);


  const handleTagConfirm = (officialTag, additionalTag) => {
    if (additionalTag.length > 0) {
      setConfirmedAdditionalTags((prevTags) => [...prevTags, ...additionalTag]);
    }

    setOpenTag(false);
  };

  function openTagModal() {
    setOpenTag(!OpenTag);
  }

  function openAddPlaceModal() {
    setAddPlace(!AddPlace);
  }

  return (
    <>
      <div
        className={`fixed top-1/2 left-1/2 rounded-lg tranforms -translate-x-1/2 -translate-y-1/2 transition-all ease-in duration-500 ${
          addTourState
            ? "visible opacity-100 drop-shadow-2xl"
            : "rounded-sm invisible opacity-0"
        } `}
      >
        <div className=" bg-white font-bold modal-box w-screen text-black">
          <div className="flex justify-end mb-2">
            <button onClick={action}>
              <Image src={close} alt="clsbtn" className="pt-2" width={20} />
            </button>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg">Tour name</h3>
            <input
              type="text"
              className="p-2 bg-grey rounded-md focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue"
            />
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="text-lg">Description</h3>
            <textarea
              name="postContent"
              rows={5}
              cols={40}
              className="p-2 resize-none bg-grey rounded-md focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue"
            />
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="text-lg">Tags</h3>
            <div className="flex items-center ">
              <div>
                <Officialdropdown
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>
              <div className="pt-4 flex ml-2 overflow-x-auto">
                {confirmedAdditionalTags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-blue p-2 rounded-lg text-white mr-2 w-max h-fit"
                  >
                    {tag}
                  </div>
                ))}
              </div>
              <NebuTag
                toggle={OpenTag}
                action={() => setOpenTag(false)}
                onConfirm={handleTagConfirm}
              />
              <Button
                buttonStyle="btn text-black border-none cursor-pointer bg-grey hover:bg-black hover:text-white md:py-2 md:px-4 text-center text-2xl rounded-full ml-2"
                label="+"
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  openTagModal();
                }}
              ></Button>
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="text-lg">Route</h3>
            <div></div>
            <div className="flex flex-row items-center">
              <Button
                type="button"
                buttonStyle="p-2 mt-2 bg-blue text-white rounded-lg"
                label="Add place"
              ></Button>
              <Button
                buttonStyle="btn text-black border-none cursor-pointer bg-grey hover:bg-black hover:text-white md:py-2 md:px-4 text-center text-2xl rounded-full ml-2"
                label="+"
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  openAddPlaceModal();
                }}
              ></Button>
              <AddPlaceModal
                toggle={AddPlace}
                action={() => setAddPlace(false)}
                onAddPlace={action} // Passing the action function to close AddTour
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

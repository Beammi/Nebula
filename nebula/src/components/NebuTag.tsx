// NebuTag.jsx
import React, { useRef, useState } from "react";
import closeIcon from "../../public/images/close.png";
import Image from "next/image";

const NebuTag = (props) => {
  const { toggle, action } = props;
  const isOpen = toggle || false;

  const suggestions = ["Technology", "Nature", "Food", "Travel"];
  const [inputValue, setInputValue] = useState("");
  const [additionalTag, setAdditionalTag] = useState("");
  const [additionalTags, setAdditionalTags] = useState([]);

  const handleConfirm = () => {

    if (additionalTag.trim() !== ""){
      setAdditionalTags((prevTags) => [...prevTags, additionalTag]);
      setAdditionalTag("");
    }

    if (inputValue.trim() !== "" || additionalTag.trim() !== "") {
      props.onConfirm([inputValue], [additionalTag]);
    }
  };

  return (
    <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all ease-in duration-500 ${isOpen ? "visible opacity-100 drop-shadow-2xl" : "invisible opacity-0"}`}>
      <div className="flex flex-col p-6 bg-white">
        <div className="flex justify-end mb-2">
          <button onClick={(event) => { event.preventDefault(); action(); }}>
            <Image src={closeIcon} alt="Close button" className="pt-2" width={20} />
          </button>
        </div>
        <div className="my-2">
          <p className="py-2">Additional Tag</p>
          <input
            className="bg-grey text-black p-1 focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue rounded-md"
            type="text"
            value={additionalTag}
            onChange={(e) => setAdditionalTag(e.target.value)}
          />
        </div>
        <div className="flex justify-center mt-4">
          <button className="bg-blue text-white p-2 rounded-md" onClick={(event) => { event.preventDefault(); handleConfirm(); }}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default NebuTag;

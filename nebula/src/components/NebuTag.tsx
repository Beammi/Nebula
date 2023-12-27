// NebuTag.jsx
import React, { useRef, useState } from "react";
import closeIcon from "../../public/images/close.png";
import Image from "next/image";

const NebuTag = (props) => {
  const { toggle, action, onConfirm } = props;
  const isOpen = toggle || false;

  const suggestions = ["Technology", "Nature", "Food", "Travel"];
  const [isFocus, setIsFocus] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [officialTags, setOfficialTags] = useState([]);
  const [additionalTag, setAdditionalTag] = useState("");
  const [additionalTags, setAdditionalTags] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef(null);

  const handleConfirm = () => {
    {/* 
    setOfficialTags((prevTags) => [...prevTags, inputValue]);
    setAdditionalTags((prevTags) => [...prevTags, additionalTag]);
    setInputValue(""); // Clear Official's Tag input value
    setAdditionalTag(""); // Clear Additional Tag input value
    onConfirm([inputValue], [additionalTag]);
    */}

    if (inputValue.length === 0){
      alert("Please input at least 1 Official's Tag")
      return
    }

    if (inputValue.trim() !== "") {
      setOfficialTags((prevTags) => [...prevTags, inputValue]);
      setInputValue("");
    }

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
      <div className="flex flex-col p-6 bg-red">
        <div className="flex justify-end mb-2">
          <button onClick={(event) => { event.preventDefault(); action(); }}>
            <Image src={closeIcon} alt="Close button" className="pt-2" width={20} />
          </button>
        </div>
        <div className="my-2 relative">
          <p>Official's Tag</p>
          <input
            className="bg-white text-black p-1 focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue rounded-md"
            type="text"
            onFocus={() => setIsFocus(true)}
            onBlur={() => { if (!isHovered) setIsFocus(false); }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            ref={(el) => { inputRef.current = el; }}
          />
          {isFocus && (
            <div
              className="shadow-lg absolute w-full"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {suggestions.map((suggestion, index) => {
                const isMatch = suggestion.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
                return (
                  <div key={index}>
                    {isMatch && (
                      <div
                        className="p-2 bg-white hover:bg-blue cursor-pointer"
                        onClick={() => {
                          setInputValue(suggestion);
                          inputRef.current.focus();
                        }}
                      >
                        {suggestion}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="my-2">
          <p>Additional Tag</p>
          <input
            className="bg-white text-black p-1 focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue rounded-md"
            type="text"
            value={additionalTag}
            onChange={(e) => setAdditionalTag(e.target.value)}
          />
        </div>
        <div className="flex justify-center mt-4">
          <button className="bg-white p-2 rounded-md" onClick={(event) => { event.preventDefault(); handleConfirm(); }}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default NebuTag;

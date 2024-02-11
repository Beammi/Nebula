import { useState } from "react"
import Button from "./Button"
import Image from 'next/image'
import {mockData} from "./mockData"
import smallPin from "../../public/images/smallPin.png"
import smallFlag from "../../public/images/smallFlag.png"
import smallUser from "../../public/images/smallUser.png"
import smallTag from "../../public/images/smallTag.png"
<<<<<<< HEAD
<<<<<<< HEAD
import TagSuggestion  from "@/components/TagSuggestion"
=======
>>>>>>> 1ecfda2 (search bar suggestion)
=======
>>>>>>> 8000afa (tag suggestion ver.1)
import React from "react"
=======
import TagSuggestion  from "@/components/TagSuggestion"
>>>>>>> 5a4570b (tag suggestion ver.1)

interface ISearchBar {
  text?: string
}

const SearchBar: React.FunctionComponent<ISearchBar> = ({ text }) => {

  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showTagSuggestion, setShowTagSuggestion] = useState(false);
  const [tagSuggestionValue, setTagSuggestionValue] = useState("");
  const [suggestions, setSuggestions] = useState<{ value: string; type: string }[]>([]);

  function closeTagSuggestion() {
    setShowTagSuggestion(false);
  }

  // Function to handle suggestion click
  const handleSuggestionClick = (suggestion: { value: string; type: string }) => {

    if(suggestion.type === "tag") {
      setShowTagSuggestion(true);
      setTagSuggestionValue(suggestion.value)
      setInputValue("");
    }
    else{
      setInputValue(suggestion.value);
    }

    setShowSuggestions(false);
  };

  // Function to handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    // Mocking suggestions, you should replace this with your own suggestion logic
    setSuggestions(mockSuggestions(value));
    // Show suggestions if input value is not empty
    setShowSuggestions(value.trim() !== ""); // true = have, false = empty
  };

  // Mock function to generate suggestions (replace with your own logic)
  const mockSuggestions = (value: string): { value: string; type: string }[] => {

    let result: { value: string; type: string }[] = [];
    const uniqueTags: { [tag: string]: boolean } = {};
    const uniqueTours: { [tour: string]: boolean } = {};

    result.push(
      ...mockData.filter((item) =>
        item.place.toLowerCase().includes(value.toLowerCase())
      )
      .map((item) => ({value: item.place, type: "place"}))
    )

    mockData.forEach((item) => {
      if (item.tag.toLowerCase().includes(value.toLowerCase()) && !uniqueTags[item.tag.toLowerCase()]) {
        result.push({value: item.tag, type: "tag"});
        uniqueTags[item.tag.toLowerCase()] = true;
      }
      if (item.tour.toLowerCase().includes(value.toLowerCase()) && !uniqueTours[item.tour.toLowerCase()]) {
        result.push({value: item.tour, type: "tour"});
        uniqueTours[item.tour.toLowerCase()] = true;
      }
    });

    result.push(
      ...mockData.filter((item) =>
        item.first_name.toLowerCase().includes(value.toLowerCase())
      )
      .map((item) => ({value: item.first_name, type: "user"}))
    )    
    
    return result
  };
  
  const [IsOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showTagSuggestion, setShowTagSuggestion] = useState(false);
  const [suggestions, setSuggestions] = useState<{ value: string; type: string }[]>([]);

  function closeTagSuggestion() {
    setShowTagSuggestion(false);
    console.log("closeee");
  }

  // Function to handle suggestion click
  const handleSuggestionClick = (suggestion: { value: string; type: string }) => {

    if(suggestion.type === "tag") {
      setShowTagSuggestion(true);
    }
    else{
      setInputValue(suggestion.value);
    }

    setShowSuggestions(false);
  };

  // Function to handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    // Mocking suggestions, you should replace this with your own suggestion logic
    setSuggestions(mockSuggestions(value));
    // Show suggestions if input value is not empty
    setShowSuggestions(value.trim() !== ""); // true = have, false = empty
  };

  // Mock function to generate suggestions (replace with your own logic)
  const mockSuggestions = (value: string): { value: string; type: string }[] => {

    let result: { value: string; type: string }[] = [];
    const uniqueTags: { [tag: string]: boolean } = {};
    const uniqueTours: { [tour: string]: boolean } = {};

    result.push(
      ...mockData.filter((item) =>
        item.place.toLowerCase().includes(value.toLowerCase())
      )
      .map((item) => ({value: item.place, type: "place"}))
    )

    mockData.forEach((item) => {
      if (item.tag.toLowerCase().includes(value.toLowerCase()) && !uniqueTags[item.tag.toLowerCase()]) {
        result.push({value: item.tag, type: "tag"});
        uniqueTags[item.tag.toLowerCase()] = true;
      }
      if (item.tour.toLowerCase().includes(value.toLowerCase()) && !uniqueTours[item.tour.toLowerCase()]) {
        result.push({value: item.tour, type: "tour"});
        uniqueTours[item.tour.toLowerCase()] = true;
      }
    });

    result.push(
      ...mockData.filter((item) =>
        item.first_name.toLowerCase().includes(value.toLowerCase())
      )
      .map((item) => ({value: item.first_name, type: "user"}))
    )    
    
    return result
  };
  

  return (
    
      <div className="relative w-full 2xl:w-[30%] lg:w-2/5 md:w-1/4 sm:w-3/4 p-4 max-w-md">
        <input
          type="text"
          className="pl-10 pr-4 py-2 w-full input input-bordered bg-[#fefefe] text-black shadow-neutral-500 shadow-sm"
          placeholder={text}
          value={inputValue}
          onChange={handleInputChange}
        />
        <img
          src="/images/icnSearch.svg"
          alt="search icon"
          className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6"
        />
        <div className="absolute right-8 top-8 transform -translate-y-1/2">
          <Button buttonStyle="bg-white text-black rounded-full btn-circle btn block md:hidden" label="NL" onClick={() => setIsOpen(!IsOpen)}></Button>
        </div>

        {showSuggestions && (
          // <div className="absolute mt-2 w-full bg-white shadow-lg rounded-lg text-black">
          <div className="absolute mt-2 w-full bg-white shadow-lg rounded-lg text-black transition-opacity delay-300 duration-500 ease-in-out opacity-100">
            {suggestions.map((suggestion, index) => (
              <div className="flex flex-row" key={index}>
                <div
                  className="py-2 pl-4 cursor-pointer hover:bg-gray-400 flex items-center gap-x-3"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {(suggestion.type === "place") && 
                    <figure><Image src={smallPin} alt="pic" className="" width={20}/></figure>
                  }
                  {(suggestion.type === "tour") && 
                    <figure><Image src={smallFlag} alt="pic" className="" width={15}/></figure>
                  }
                  {(suggestion.type === "tag") && 
                    <figure><Image src={smallTag} alt="pic" className="" width={19}/></figure>
                  }
                  {(suggestion.type === "user") && 
                    <figure><Image src={smallUser} alt="pic" className="" width={18}/></figure>
                  }
                  <span>{suggestion.value}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* { showTagSuggestion &&
          <TagSuggestion toggle={showTagSuggestion} action={closeTagSuggestion}/>
        } */}

        <TagSuggestion toggle={showTagSuggestion} action={closeTagSuggestion} tagName={tagSuggestionValue}/>

        <div className={`flex flex-col bg-white fixed right-12 p-8 shadow-lg rounded-lg opacity-0 top-24 transition-all ease-in duration-200 ${IsOpen ? 'opacity-100' : 'right-[-200px]'}`}>
              <ul className="flex flex-col gap-4 text-[black]">
                  <li>Profile</li>
                  <li>Your Nebu</li>
                  <li>Your Tour</li>
                  <li>Setting</li>
              </ul>
        </div>
        {/* <button className="p-2 btn bg-white">
        <img src="/images/icnSearch.svg" alt="search icon" />
      </button> */}
        {showSuggestions && (
          // <div className="absolute mt-2 w-full bg-white shadow-lg rounded-lg text-black">
          <div className="absolute mt-2 w-full bg-white shadow-lg rounded-lg text-black transition-opacity delay-300 duration-500 ease-in-out opacity-100">
            {suggestions.map((suggestion, index) => (
              <div className="flex flex-row" key={index}>
                <div
                  className="py-2 pl-4 cursor-pointer hover:bg-gray-400 flex items-center gap-x-3"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {(suggestion.type === "place") && 
                    <figure><Image src={smallPin} alt="pic" className="" width={20}/></figure>
                  }
                  {(suggestion.type === "tour") && 
                    <figure><Image src={smallFlag} alt="pic" className="" width={15}/></figure>
                  }
                  {(suggestion.type === "tag") && 
                    <figure><Image src={smallTag} alt="pic" className="" width={19}/></figure>
                  }
                  {(suggestion.type === "user") && 
                    <figure><Image src={smallUser} alt="pic" className="" width={18}/></figure>
                  }
                  <span>{suggestion.value}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* { showTagSuggestion &&
          <TagSuggestion toggle={showTagSuggestion} action={closeTagSuggestion}/>
        } */}

        <TagSuggestion toggle={showTagSuggestion} action={closeTagSuggestion}/>

      </div>
    
  )
}
export default SearchBar

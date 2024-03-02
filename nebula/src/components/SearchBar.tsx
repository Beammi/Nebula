import { useState } from "react"
import Button from "./Button"
import Image from 'next/image'
import {mockData} from "./mockData"
import smallPin from "../../public/images/smallPin.png"
import smallFlag from "../../public/images/smallFlag.png"
import smallUser from "../../public/images/smallUser.png"
import smallTag from "../../public/images/smallTag.png"
import TagSuggestion  from "@/components/TagSuggestion"
import AccountProfile from "@/components/AccountProfile"
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import Bookmark from "@/components/Bookmark"
import MyNebu from "@/components/MyNebu"
import MyTour from "@/components/MyTour"
=======
import MyNebu from "@/components/MyNebu"
>>>>>>> ff453ee (change 'Your Nebu' to 'My Nebu')
=======
import MyNebu from "@/components/MyNebu"
>>>>>>> 1d23e70 (change 'Your Nebu' to 'My Nebu')
=======
import MyNebu from "@/components/MyNebu"
>>>>>>> 4d8d319 (change 'Your Nebu' to 'My Nebu')
import { useRouter } from "next/router"
import React from "react"


interface ISearchBar {
  text?: string
}

const SearchBar: React.FunctionComponent<ISearchBar> = ({ text }) => {

  const router = useRouter()
  const [IsOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showTagSuggestion, setShowTagSuggestion] = useState(false);
  const [showAccountProfile, setShowAccountProfile] = useState(false);
  const [showMyNebu, setShowMyNebu] = useState(false);
  const [showMyTour, setShowMyTour] = useState(false);
  const [showBookmark, setShowBookmark] = useState(false);
  const [tagSuggestValue, setTagSuggestValue] = useState("");
  const [accountNameValue, setAccountNameValue] = useState("");
  const [suggestions, setSuggestions] = useState<{ value: string; type: string }[]>([]);

  function closeTagSuggestion() {
    setShowTagSuggestion(false);
  }

  function closeAccountProfile() {
    setShowAccountProfile(false);
  }

  function closeMyNebu() {
    setShowMyNebu(false);
  }

  function handleMyNebuClick(){
    setAccountNameValue("nat2100")
    setShowMyNebu(true)
  }

  function closeMyTour() {
    setShowMyTour(false);
  }

  function handleMyTourClick(){
    setAccountNameValue("nat2100")
    setShowMyTour(true)
  }

  function closeBookmark() {
    setShowBookmark(false);
  }

  function handleBookmarkClick(){
    setAccountNameValue("nat2100")
    setShowBookmark(true)
  }

  // Function to handle suggestion click
  const handleSuggestionClick = (suggestion: { value: string; type: string }) => {

    if(suggestion.type === "tag") {
      setShowTagSuggestion(true);
      setTagSuggestValue(suggestion.value)
    }
    else if(suggestion.type === "user"){
      // const fullPath = `/${suggestion.value}`
      // router.push(fullPath)
      setShowAccountProfile(true)
      setAccountNameValue(suggestion.value)

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
          <Button buttonStyle="bg-white text-black rounded-full btn-circle btn block md:hidden" label="NL" type="button" onClick={() => setIsOpen(!IsOpen)}></Button>
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

        <TagSuggestion toggle={showTagSuggestion} action={closeTagSuggestion} tagName={tagSuggestValue}/>
        <AccountProfile toggle={showAccountProfile} action={closeAccountProfile} accountName={accountNameValue}/>
        
        <MyNebu toggle={showMyNebu} action={closeMyNebu} accountName={accountNameValue}/>
        <MyTour toggle={showMyTour} action={closeMyTour} accountName={accountNameValue}/>
        <Bookmark toggle={showBookmark} action={closeBookmark} accountName={accountNameValue}/>

        <div className={`flex flex-col bg-white fixed right-12 p-8 shadow-lg rounded-lg opacity-0 top-24 transition-all ease-in duration-200 ${IsOpen ? 'opacity-100' : 'right-[-200px]'}`}>
              <ul className="flex flex-col gap-4 text-[black]">
                  <li>Profile</li>
                  <li className="cursor-pointer" onClick={() => handleMyNebuClick()}>My Nebu</li>
                  <li className="cursor-pointer" onClick={() => handleMyTourClick()}>My Tour</li>
                  <li className="cursor-pointer" onClick={() => handleBookmarkClick()}>Bookmark</li>
                  <li>Setting</li>
                  <li>Log Out</li>
              </ul>
        </div>
      </div>
    
  )
}
export default SearchBar

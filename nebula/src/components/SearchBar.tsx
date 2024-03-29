import { useState, useEffect } from "react"
import Button from "./Button"
import Image from 'next/image'
import {mockData} from "./mockData"
import smallPin from "../../public/images/smallPin.png"
import smallFlag from "../../public/images/smallFlag.png"
import smallUser from "../../public/images/smallUser.png"
import smallTag from "../../public/images/smallTag.png"
import smallThinPin from "../../public/images/placePinIcon.png"
import TagSuggestion  from "@/components/TagSuggestion"
import AccountProfile from "@/components/AccountProfile"
import Bookmark from "@/components/Bookmark"
import MyNebu from "@/components/MyNebu"
import MyTour from "@/components/MyTour"
import Profile from "@/components/Profile"
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
  const [showMyProfile, setShowMyProfile] = useState(false);
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

  function closeMyProfile() {
    setShowMyProfile(false);
  }

  function handleMyProfileClick(){
    setAccountNameValue("nat2100")
    setShowMyProfile(true)
  }

  // Function to handle suggestion click
  const handleSuggestionClick = (suggestion: { value: string; type: string }) => {

    setInputValue(suggestion.value);
    
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

    setShowSuggestions(false);
  };

  // Function to handle input change
  const handleInputChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedData: { value: string, type: string }[] = [];
    const key = event.target.value;
    setInputValue(key)
    // console.log("K: ", key, ", ", key);
    

    if (key.trim().length === 0 || key == null) { // Clear suggestions if input is empty
      setSuggestions([]);
      setShowSuggestions(false);
      // setSuggestions([]);
      return; // Exit early to prevent further execution of the function
    }

    if(key !== ""){
      
      let url = `/api/nebu/getNebuByKeyword?searchKey=${key}`
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const data: string[] = await response.json();             
        // const formattedData = data.map(name => ({ value: name, type: "tag" }));
        data.forEach(name => formattedData.push({ value: name, type: "nebu" }));

      } catch (error) {
        console.error("Fetch error:", error)
      }

      url = `/api/nebu/getTagByKeyword?searchKey=${key}`
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const data: string[] = await response.json();             
        // const formattedData = data.map(name => ({ value: name, type: "tag" }));
        data.forEach(name => formattedData.push({ value: name, type: "tag" }));

      } catch (error) {
        console.error("Fetch error:", error)
      }
    
      url = `/api/nebu/getUsersByDisplayName?searchKey=${key}`
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        // const data: string[] = await response.json(); // normal array same as write in api
        const data: string[] = await response.json(); // normal array same as write in api
        // data.forEach(name => formattedData.push({ value: name, type: "user" }));
        // data.forEach(d => formattedData.push({ value: d, type: "user" }));
        data.forEach(d => formattedData.push({ value: d.display_name, type: "user" }));
        
        // setAccountData(data)

      } catch (error) {
        console.error("Fetch error:", error)
      }

      setSuggestions(formattedData)
      // setSuggestions([]);        
      setShowSuggestions(suggestions.length !== 0);
      console.log(suggestions);  
    }

    
  };

  useEffect(() => {
    // Check if input is empty after setting suggestions
    if (inputValue === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      // setSuggestions([]);
    }
  }, [inputValue]);
  

  return (
    
      <div className="relative w-full 2xl:w-[25%] lg:w-2/5 md:w-1/4 sm:w-3/4 p-4">
      {/* // <div className="relative w-full 2xl:w-[30%] lg:w-2/5 md:w-1/4 sm:w-3/4 p-4 max-w-lg"> */}
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
                  {(suggestion.type === "nebu") && 
                    <figure><Image src={smallPin} alt="pic" className="" width={23}/></figure>
                  }
                  {(suggestion.type === "place") && 
                    <figure><Image src={smallThinPin} alt="pic" className="" width={23}/></figure>
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
        <Profile toggle={showMyProfile} action={closeMyProfile} accountName={accountNameValue}/>

        <div className={`flex flex-col bg-white fixed right-12 p-8 shadow-lg rounded-lg opacity-0 top-24 transition-all ease-in duration-200 ${IsOpen ? 'opacity-100' : 'right-[-200px]'}`}>
              <ul className="flex flex-col gap-4 text-[black]">
                <li className="cursor-pointer" onClick={() => handleMyProfileClick()}>Profile</li>
                <li className="cursor-pointer" onClick={() => handleMyNebuClick()}>My Nebu</li>
                <li className="cursor-pointer" onClick={() => handleMyTourClick()}>My Tour</li>
                <li className="cursor-pointer" onClick={() => handleBookmarkClick()}>Bookmark</li>                
                <li>Log Out</li>
              </ul>
        </div>
      </div>
    
  )
}
export default SearchBar

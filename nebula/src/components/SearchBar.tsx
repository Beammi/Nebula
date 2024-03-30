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
import ViewTourList from "@/components/ViewTourList"
import Bookmark from "@/components/Bookmark"
import MyNebu from "@/components/MyNebu"
import MyTour from "@/components/MyTour"
import Profile from "@/components/Profile"
import PlaceInfoPanel from "@/components/PlaceInfoPanel"
import { useRouter } from "next/router"
import { useLocation } from "@/contexts/LocationContext"
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
  const [showViewTourList, setShowViewTourList] = useState(false)
  const [showPlaceInfoPanel, setShowPlaceInfoPanel] = useState(false)
  const [tagSuggestValue, setTagSuggestValue] = useState("");
  const [accountNameValue, setAccountNameValue] = useState("");
  const [nebu, setNebu] = useState([]);
  const [suggestions, setSuggestions] = useState<{ value: string; type: string }[]>([]);
  const {
    currentPlace,
    setCurrentPlace,
    setEnableContinuousUpdate,
    setCurrentPosition,
  } = useLocation()

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

  function closeViewTourList() {
    setShowViewTourList(false);
  }

  function closePlaceInfoPanel() {
    setShowPlaceInfoPanel(false);
  }

  // Function to handle suggestion click
  // const handleSuggestionClick = (suggestion: { value: string; type: string }) => {
  const handleSuggestionClick = async (suggestion) => {
    
    if(suggestion.type === "tag") {
      setInputValue(suggestion.value);
      setShowTagSuggestion(true);

      // setShowViewTourList(true)

      setTagSuggestValue(suggestion.value)      

    }
    else if(suggestion.type === "user"){
      setInputValue(suggestion.value);
      // const fullPath = `/${suggestion.value}`
      // router.push(fullPath)
      setShowAccountProfile(true)
      setAccountNameValue(suggestion.value)

    }
    else if(suggestion.type === "place"){
      setInputValue(suggestion.value.display_name);
      setCurrentPosition([parseFloat(suggestion.value.lat), parseFloat(suggestion.value.lon)])
      setCurrentPlace(suggestion.value.display_name)
    }
    else if(suggestion.type === "nebu"){
      setInputValue(suggestion.value.title);
      setCurrentPosition([parseFloat(suggestion.value.latitude), parseFloat(suggestion.value.longitude)])
      
      setShowPlaceInfoPanel(true)
      // setPlaceInfoName(suggestion.value.title)
      setNebu(suggestion.value)    
    }

    setShowSuggestions(false);
  };

  // Function to handle input change
  const handleInputChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedData: { value: string, type: string }[] = [];
    const key = event.target.value;
    setInputValue(key)

    if (key.trim().length === 0 || key == null) { // Clear suggestions if input is empty
      setSuggestions([]);
      setShowSuggestions(false);  
      return; // Exit early to prevent further execution of the function
    }

    if(key !== ""){
      
      let url = `/api/search/getNebuByKeyword?searchKey=${key}`
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        // const data: string[] = await response.json();             
        const data = await response.json();             
        // const formattedData = data.map(name => ({ value: name, type: "tag" }));
        data.forEach(d => formattedData.push({ value: d, type: "nebu" }));

      } catch (error) {
        console.error("Fetch error:", error)
      }

      url = `/api/search/getTagByKeyword?searchKey=${key}`
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
    
      url = `/api/search/getUsersByDisplayName?searchKey=${key}`
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        // const data: string[] = await response.json(); // normal array same as write in api
        const data: string[] = await response.json(); // normal array same as write in api    
        data.forEach(d => formattedData.push({ value: d.display_name, type: "user" }));
        
        // setAccountData(data)

      } catch (error) {
        console.error("Fetch error:", error)
      }

      // Replace spaces with '+' in the query for URL encoding
      const formattedQuery = key.replace(/\s/g, "+")

      // Construct the URL for the Nominatim API request
      url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        formattedQuery
      )}`

      try {
        const response = await fetch(url, {
          method: "GET", // GET request to perform the search
          headers: {
            // Set a meaningful User-Agent header
            "User-Agent": "Nebula/1.0 (63011290@kmitl.ac.th)",
          },
        })
        const data = await response.json()
        console.log("Search place: ", data)
  
        if (data.length > 0) {
          // Update search results state with fetched data
          // setSearchResults(data)
          // data.forEach(d => formattedData.push({ value: d.display_name, type: "user" }));

          // data.forEach(formattedData.push({ value: data, type: "place" }));
          // data.forEach(d => formattedData.push({ value: d.display_name, type: "place" }));
          data.forEach(d => formattedData.push({ value: d, type: "place" }));
        } else {
          console.log("No places found.")
          // setSearchResults([]) // Clear previous results if no new results found
        }
      } catch (error) {
        console.error("Error searching place:", error)
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
          <div className="absolute mt-2 w-full max-h-[500px] overflow-y-auto bg-white shadow-lg rounded-lg text-black transition-opacity delay-300 duration-500 ease-in-out opacity-100">
            {suggestions.map((suggestion, index) => (
              <div className="flex flex-row" key={index}>
                <div
                  className="py-2 pl-4 cursor-pointer hover:bg-gray-400 flex items-center gap-x-3 flex-shrink-0"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {(suggestion.type === "nebu") && 
                    <figure><Image src={smallPin} alt="pic" className="" width={23}/></figure>
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
                  {(suggestion.type === "place") && 
                    <figure><Image src={smallThinPin} alt="pic" className="-ml-0.5" width={24}/></figure>
                  }
                  {(suggestion.type === "place") && 
                    <div>{suggestion.value.display_name}</div>
                  }
                  {(suggestion.type === "nebu") && 
                    <div>{suggestion.value.title}</div>
                  }
                  {(suggestion.type === "tour") && 
                    <div>{suggestion.value}</div>
                  }
                  {(suggestion.type === "tag") && 
                    <div>{suggestion.value}</div>
                  }
                  {(suggestion.type === "user") && 
                    <div>{suggestion.value}</div>
                  }                  
                </div>
              </div>
            ))}
          </div>
        )}

        <PlaceInfoPanel toggle={showPlaceInfoPanel} action={closePlaceInfoPanel} nebu={nebu}/>              
        <ViewTourList toggle={showViewTourList} action={closeViewTourList} name={tagSuggestValue}/>
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

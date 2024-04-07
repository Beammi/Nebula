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
import ViewTourList from "@/components/tour/ViewTourList"
import AddTour from "@/components/tour/AddTour"
import AddNebu from "@/components/nebu/AddNebu"
import Bookmark from "@/components/Bookmark"
import MyNebu from "@/components/MyNebu"
import MyTour from "@/components/MyTour"
import Profile from "@/components/Profile"
import PlaceInfoPanel from "@/components/nebu/PlaceInfoPanel"
// import { useRouter } from "next/router"
import { useRouter } from 'next/navigation'
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
  // const [tour, setTour]
  const [api, setApi] = useState<{ value: string; type: string }[]>([]);
  const [suggestions, setSuggestions] = useState<{ value: string; type: string }[]>([]);
  const [addNebuState, setAddnebu] = useState(false)
  const [addTourState, setAddTourState] = useState(false)
  const [recommendedPlace, setRecommendedPlace] = useState(null)
  
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
    setInputValue("")
    setShowPlaceInfoPanel(false);
  }

  // Function to handle suggestion click
  // const handleSuggestionClick = (suggestion: { value: string; type: string }) => {
  const handleSuggestionClick = async (suggestion) => {
    
    if(suggestion.type === "tag") {
      setInputValue(suggestion.value);
      setShowTagSuggestion(true);

      // setShowViewTourList(true)

      // setTagSuggestValue(suggestion.value)
      router.push(`/tag/${suggestion.value}`)


    }
    else if(suggestion.type === "user"){
      setInputValue(suggestion.value);
      // const fullPath = `/${suggestion.value}`
      // router.push(fullPath)

      // setShowAccountProfile(true)
      // setAccountNameValue(suggestion.value)

      router.push(`/userprofile/${suggestion.value}`)

    }
    else if(suggestion.type === "place"){
      setInputValue(suggestion.value.display_name);
      setCurrentPosition([parseFloat(suggestion.value.lat), parseFloat(suggestion.value.lon)])
      setCurrentPlace(suggestion.value.display_name)

      try{
        const url = `/api/search/getNebuByPlace?placeName=${suggestion.value.display_name}`
        const response = await fetch(url)
        const data = await response.json();
        console.log("geo spatial data: ", data[0]);
        
        if(data.length > 0){
          setShowPlaceInfoPanel(true)
          setNebu(data[0]) 
        }
        else{
          console.log("No nebu at this place.");          
        }
        

      } catch(error){
        console.error("Fetch error:", error)
      }
    }
    else if(suggestion.type === "nebu"){
      setInputValue(suggestion.value.title);

      setCurrentPosition([parseFloat(suggestion.value.latitude), parseFloat(suggestion.value.longitude)])
      
      setShowPlaceInfoPanel(true)
      setNebu(suggestion.value)    
    }

    setShowSuggestions(false);
  };

  // Function to fetch data from API
  const fetchData = async (key) => {
    try {
      // Fetch data from multiple endpoints
      const [nebuResponse, tagResponse, userResponse, nominatimResponse, tourResponse] = await Promise.all([
        fetch(`/api/search/getNebuByKeyword?searchKey=${key}`),
        fetch(`/api/search/getTagByKeyword?searchKey=${key}`),
        fetch(`/api/search/getUsersByDisplayName?searchKey=${key}`),
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(key.replace(/\s/g, '+'))}`, {
          method: 'GET',
          headers: {
            'User-Agent': 'Nebula/1.0 (63011290@kmitl.ac.th)',
          },
        }),
        fetch(`/api/search/getTourByTourName?tour_name=${key}`),
      ]);

      // Parse responses
      const [nebuData, tagData, userData, nominatimData, tourData] = await Promise.all([
        nebuResponse.json(),
        tagResponse.json(),
        userResponse.json(),
        nominatimResponse.json(),
        tourResponse.json(),
      ]);

      console.log('Nebu data:', nebuData);
      console.log('Tag data:', tagData);
      console.log('User data:', userData);
      console.log('Tour data:', tourData);
      // console.log('Nominatim data:', nominatimData);

      // Process data and update API state
      // const formattedData = [];
      const formattedData: { value: string, type: string }[] = [];
      if (nebuData.length > 0) {
        nebuData.map((d) => formattedData.push({ value: d, type: 'nebu' }));
      }
      if (tagData.length > 0) {
        tagData.map((name) => formattedData.push({ value: name, type: 'tag' }));
      }
      if (userData.length > 0) {
        userData.map((d) => formattedData.push({ value: d.display_name, type: 'user' }));
      }
      if (nominatimData.length > 0) {
        nominatimData.map((d) => formattedData.push({ value: d, type: 'place' }));
      }
      if (tourData.length > 0) {
        tourData.map((d) => formattedData.push({ value: d, type: 'tour' }));
      }
      
      setApi(formattedData);

    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleInputChange = (event) => {
    const key = event.target.value
    setInputValue(key);

    if (key.trim().length === 0 || key == null) {
      setSuggestions([]); // Clear suggestions if input is empty
      setShowSuggestions(false);
      return;
    }

    setShowSuggestions(true)
  };

  useEffect(() => {
    console.log("API:", api);
    setSuggestions(api)
  }, [api]);

  useEffect(() => {
    fetchData(inputValue)
  }, [inputValue]);

  function openAddNebu() {
    setAddnebu(!addNebuState)
  }

  function toggleAddTour() {
    setAddTourState(!addTourState)
  }
  
  

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
          <Button buttonStyle="text-black bg-grey border-0 rounded-full btn-circle btn block md:hidden" label="TH" type="button" onClick={() => setIsOpen(!IsOpen)}></Button>
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
                  {(suggestion.type === "tour") && 
                    <figure><Image src={smallFlag} alt="pic" className="" width={20}/></figure>
                  }
                  {(suggestion.type === "place") && 
                    <h2>{suggestion.value.display_name}</h2>
                  }
                  {(suggestion.type === "nebu") && 
                    <h2>{suggestion.value.title}</h2>
                  }
                  {(suggestion.type === "tour") && 
                    <h2>{suggestion.value.tour_name}</h2>
                  }
                  {(suggestion.type === "tag") && 
                    <h2>{suggestion.value}</h2>
                  }
                  {(suggestion.type === "user") && 
                    <h2>{suggestion.value}</h2>
                  }             
                </div>
              </div>
            ))}
          </div>
        )}


        {/* <PlaceInfoPanel toggle={showPlaceInfoPanel} action={closePlaceInfoPanel} nebu={nebu} panelStyle="-z-20 -ml-[32px]"
        onRecommendTour={(selectedPlace) => {
          setRecommendedPlace(selectedPlace)
          setShowViewTourList(true)
        }}/>     */}
        <ViewTourList toggle={showViewTourList} action={closeViewTourList} name={tagSuggestValue}/>
        <TagSuggestion toggle={showTagSuggestion} action={closeTagSuggestion} tagName={tagSuggestValue}/>
        <AccountProfile toggle={showAccountProfile} action={closeAccountProfile} accountName={accountNameValue}/>
        
        <MyNebu toggle={showMyNebu} action={closeMyNebu} accountName={accountNameValue}/>
        <MyTour toggle={showMyTour} action={closeMyTour} accountName={accountNameValue}/>
        <Bookmark toggle={showBookmark} action={closeBookmark} accountName={accountNameValue}/>
        <Profile toggle={showMyProfile} action={closeMyProfile} accountName={accountNameValue}/>

        {/* <div className="flex">
          <Button
            buttonStyle="btn bg-blue w-max md:block hidden mx-4 normal-case text-white border-none"
            label="Create Tour"
            onClick={() => toggleAddTour}
          ></Button>
          <Button
            buttonStyle="btn bg-blue w-max md:block hidden normal-case text-white border-none"
            label="Add Nebu"
            onClick={() => openAddNebu}
          ></Button>
        </div>
        <AddNebu toggle={addNebuState} action={openAddNebu} />
        <AddTour toggle={addTourState} action={toggleAddTour}/> */}

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
import { useRouter } from "next/router"
import SearchBar from "@/components/SearchBar"
import ProfileButton from "@/components/ProfileButton"
import DynamicMap from "@/components/map/DynamicMap"
import Button from "@/components/Button"
import AddNebu from "@/components/nebu/AddNebu"
import AddTour from "@/components/tour/AddTour"
import AddPlaceModal from "@/components/tour/AddPlaceModal"
import MoveablePin from "@/components/map/MoveablePin"
import { useState } from "react"
import { supabase } from "../../lib/supabaseClient"
import { useEffect } from "react"

import Image from "next/image";
import closeIcon from "../../../public/images/close.png";
import smallHashtag from "../../../public/images/smallHashtag_blue.png";
import filterIcon from "../../../public/images/filter-icon.png"
import yellowPin from "../../../public/images/yellowPin.png"
import purplePin from "../../../public/images/purplePin.png"
import purpleFlag from "../../../public/images/flagPurple.png"
import yellowFlag from "../../../public/images/yellowFlag.png"
import placePinIcon from "../../../public/images/placePinIcon.png"
import altImage from "../../../public/images/altImage.png"

export default function Tag() {
  
    const router = useRouter()
    const [addNebuState, setAddnebu] = useState(false)
    const [addNebuDropDown, setaddNebuDropdown] = useState(false)
    const [profileName,setProfileName] = useState("")
    const [addTourState, setAddTourState] = useState(false)
    const [tagData, setTagData] = useState([])
    const [api, setApi] = useState([])
    const [tagName, setTagName] = useState("");
    const [tourPhotos, setTourPhotos] = useState([])
    const [tourApi, setTourApi] = useState([])

    const tag = Array.isArray(router.query.slug) ? router.query.slug[0] : router.query.slug;

    useEffect(() => {
      setTagName(tag);
    }, [tag])

    useEffect(() => {
      console.log("tag name: ", tagName);
      fetchData()
    }, [tagName])

    useEffect(() => {
      console.log("API:", api);
      setTagData(api)
    }, [api]);

    function tagNameClick(tagName) {
      router.push(`/tag/${tagName}`)
    }
    

    async function fetchData() {
      try {
        
        // const data = await response.json();   
        
        const [nebuResponse, tourResponse] = await Promise.all([
          fetch(`/api/search/getNebuByTag?tagName=${tagName}`),
          fetch(`/api/search/getTourByTag?tagName=${tagName}`),
          
        ]);

        // const [nebuResponse] = await Promise.all([
        //   fetch(`/api/search/getNebuByTag?tagName=${tagName}`)
          
        // ]);
  
        // Parse responses
        const [nebuData, tourData] = await Promise.all([
          nebuResponse.json(),
          tourResponse.json(),
        ]);

        // const [nebuData] = await Promise.all([
        //   nebuResponse.json(),          
        // ]);

        const formattedData = [];
        if (nebuData.length > 0) {
          nebuData.map((d) => formattedData.push({ value: d, type: 'nebu' }));
        }
        if (tourData.length > 0) {
          tourData.map((d) => formattedData.push({ value: d, type: 'tour' }));
        }

        setApi(formattedData)
        console.log("data1: ", api);

      } catch (error) {
        console.error("Fetch error:", error)
      }
    
    }

    function formatPlaces(placesArray) {
        const formattedPlaces = placesArray.map(place => place.split(',')[0]); // Get the first part of each place until the first comma
        return formattedPlaces.join(', '); // Join the places with commas
    }

    const fetchPhotoFromNebu = async (place_name) => {
      try {
        // place_name.map(async (p) => { // bad idea for using map or loop to fetch data
        //   const response = await fetch(
        //     `/api/tour/getImagesFromNebus?place_name=${p}`
        //   )
        //   if (response.ok) {
        //     const photos = await response.json()
        //     setTourApi(photos)
        //     console.log("tour api photo ", tourApi)
        //     if(tourApi.length > 0){
        //       return tourApi[0]
        //     }            
        //   } 
        //   else {
        //     console.error("Failed to fetch image details")
        //   }
        // })

        const response = await fetch(
          `/api/tour/getImagesFromNebus?place_name=${place_name[1]}`
        )
        // const [place1, place2, place3] = await Promise.all([
        //   fetch(`/api/tour/getImagesFromNebus?place_name=${place_name[0]}`),
        //   fetch(`/api/tour/getImagesFromNebus?place_name=${place_name[1]}`),
        //   fetch(`/api/tour/getImagesFromNebus?place_name=${place_name[2]}`),
        // ]);
        if (response.ok) {
          const photos = await response.json()
          setTourApi(photos)
          console.log("tour api photo ", tourApi)
          tourApi.forEach(item => {
            console.log("tour api ",item);
          });
          return tourApi[0]
        } 
        else {
          console.error("Failed to fetch image details")
        }
      } catch (error) {
        console.error("Error fetching image details:", error)
      }
    }

    function openAddNebu() {
      setAddnebu(!addNebuState)
    }

    function openAddNebuDropDown() {
      setaddNebuDropdown(!addNebuDropDown)
    }

    function toggleAddTour() {
      setAddTourState(!addTourState)
    }
    
    return (

      <div className="relative h-screen">
        <div className="absolute z-10 top-0 left-0 right-0 flex items-center justify-center md:justify-between px-4 pt-2">
          <div className="flex w-full justify-center md:justify-normal">
            <SearchBar text="Search" />
            <Button
              buttonStyle="btn bg-yellow hover:bg-dark-grey w-max md:block hidden ml-14 lg:ml-16 border-none text-black normal-case"
              label="Café with wifi"
            ></Button>
            <Button
              buttonStyle="btn bg-yellow hover:bg-dark-grey w-max md:block hidden ml-6 border-none text-black normal-case"
              label="Restaurant"
            ></Button>
          </div>
          <div className="flex">
            <div className="flex">
              <Button
                buttonStyle="btn bg-blue w-max md:block hidden mx-4 normal-case text-white border-none"
                label="Create Tour"
                onClick={toggleAddTour}
              ></Button>
              <Button
                buttonStyle="btn bg-blue w-max md:block hidden normal-case text-white border-none"
                label="Add Nebu"
                onClick={openAddNebuDropDown}
              ></Button>
            </div>
            <ProfileButton text={profileName} />
          </div>
        </div>
        <div className="absolute z-0 w-full h-full">
          <DynamicMap />
        </div>
        <AddNebu toggle={addNebuState} action={openAddNebu} />
        <AddTour toggle={addTourState} action={toggleAddTour}/>
        <div
          className={`fixed right-24 top-24 text-center text-white bg-blue flex flex-col rounded-lg font-bold items-center overflow-hidden ${
            addNebuDropDown ? "opacity-100" : "hidden"
          }`}
        >
          <Button
            buttonStyle="btn btn-primary bg-blue w-fit md:block hidden border-none"
            label="Current Location"
            onClick={openAddNebu}
          ></Button>
          <Button
            buttonStyle="btn btn-primary bg-blue w-fit md:block hidden mb-4 border-none px-5"
            label="Search Location"
          ></Button>
        </div>


        <div
          className={`fixed top-1/2 left-1/2 rounded-lg tranforms -translate-x-1/2 -translate-y-1/2 transition-all ease-in duration-500 visible opacity-100 drop-shadow-2xl
          `}
        >
          <div className="rounded-lg shadow-md bg-dim-grey w-[23rem] lg:w-[60rem] font-bold text-black p-7 ">
          <div className="flex justify-start my-2 items-center">
              <div className="flex gap-x-5 ml-3 items-center">
                <figure className=""> <Image src={smallHashtag} alt="pic" width={30}/> </figure>
                <h3 className="text-xl lg:text-2xl text-black flex gap-x-2">{tagName}</h3>
              </div>
              <div className="ml-auto dropdown dropdown-end dropdown-hover mr-4">
                <div tabIndex={0} role="button" className="btn btn-sm m-1 normal-case bg-white drop-shadow-md text-black border-none hover:border-none hover:bg-grey flex flex-nowrap">Filter <figure className=''><Image src={filterIcon} alt="pic" className=""/></figure> </div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-1 bg-grey text-black border-none hover:border-none hover:bg-grey rounded-box w-max">                    
                  <li><a href='https://www.google.com/' className='hover:text-black'>High Rated</a></li>
                  <li><a href='https://www.google.com/' className='hover:text-black'>Newest</a></li>
                  <li><a href='https://www.google.com/' className='hover:text-black'>Oldest</a></li>
                </ul>
              </div>
              <button onClick={() => router.push('/home')}>
                <Image
                  src={closeIcon}
                  alt="clsbtn"
                  className="ml-auto"
                  width={20}
                />
              </button>
            </div>

            <div className="w-full h-[3px] bg-grey "></div>

            <div className="text-black mt-5 w-fit h-[500px] overflow-y-scroll ">
              
              {Array.isArray(tagData) && tagData.map((data, index) =>(                
                <div key={index} className="card lg:card-side bg-white shadow-md w-full px-4 lg:py-0 py-4 mb-4 flex flex-col lg:flex-row">
                  {!!data.value.images && data.type === "nebu" && <figure className="w-full lg:w-[260px] lg:h-[200px] flex-shrink-0"><img src={data.value.images[0]} alt="There is no image." className=" lg:h-auto"/></figure>}
                  {data.type === "tour" && <figure className="w-full lg:w-[260px] lg:h-[200px] flex-shrink-0"><img src={altImage.src} alt="There is no image." className=" lg:h-auto"/></figure>}                  
                  <div className="card-body flex flex-col justify-between">
                    { data.type === "nebu" &&                  
                      <h2 className="card-title w-full lg:w-full flex flex-col lg:flex-row">
                        {data.type === "nebu" && <figure className="lg:w-[3%]"><Image src={purplePin} alt="pic" /></figure>}                        
                        {data.value.title}
                        <p className="font-normal text-sm inline text-black-grey w-fit text-center lg:text-start">added by {data.value.email}</p>
                      </h2>
                    }
                    { data.type === "tour" &&                  
                      <h2 className="card-title w-full lg:w-full flex flex-col lg:flex-row">                        
                        {data.type === "tour" && <figure className="lg:w-[3%]"><Image src={purpleFlag} alt="pic" /></figure>}
                        {data.value.tour_name}
                        <p className="font-normal text-sm inline text-black-grey w-fit text-center lg:text-start">added by {data.value.email}</p>
                      </h2>
                    }

                    <p className="font-normal my-3 overflow-hidden lg:h-auto line-clamp-2 lg:line-clamp-3">{data.value.description}</p>

                    {data.type === "tour" &&
                      <div className="flex">
                        <figure className="lg:w-[4.2%]"><Image src={placePinIcon} alt="pic" /></figure>
                        <p className="font-normal">Places: {formatPlaces(data.value.places)}</p>
                      </div>                      
                    }
                    
                    <div className='flex flex-row mt-1'>
                      <div className='flex gap-2 flex-wrap'>                        
                        <button onClick={() => tagNameClick(data.value.official_tag)} className="px-2 py-1 bg-yellow text-white rounded-lg normal-case border-0 text-sm cursor-pointer">#{data.value.official_tag}</ button>
                        { data.value.tags && data.value.tags
                          .filter(tag => tag !== null) 
                          .map((usertag) => (                          
                          <button onClick={() => tagNameClick(usertag)} className="px-2 py-1 bg-grey text-black rounded-lg normal-case border-0 text-sm cursor-pointer">#{usertag}</button>                    
                        ))}                        
                      </div>
                    </div>
                    
                  </div>
                </div>
              ))}
              
              
            </div>
          </div>
        </div>
      </div>
    )
}
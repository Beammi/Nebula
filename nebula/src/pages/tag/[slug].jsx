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

export default function Tag() {
  
    const router = useRouter()
    const [addNebuState, setAddnebu] = useState(false)
    const [addNebuDropDown, setaddNebuDropdown] = useState(false)
    const [profileName,setProfileName] = useState("")
    const [addTourState, setAddTourState] = useState(false)
    const [tagData, setTagData] = useState([])
    const [api, setApi] = useState([])
    const [tagName, setTagName] = useState("");

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
      let url = `/api/search/getNebuByTag?tagName=${tagName}`
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const data = await response.json();             
        setApi(data)
        console.log("data1: ", api);

      } catch (error) {
        console.error("Fetch error:", error)
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
              
              {tagData.map((data, index) => (
                <div key={index} className="card lg:card-side bg-white shadow-md w-full px-4 lg:py-0 py-4 mb-4 flex flex-col lg:flex-row">
                  <figure className="w-full lg:w-[260px] lg:h-[200px] flex-shrink-0"><img src={data.images[0]} alt="pic" className=" lg:h-auto"/></figure>              
                  <div className="card-body flex flex-col justify-between">
                    {
                      // (data.type === "nebu") &&                  
                      <h2 className="card-title w-full lg:w-full flex flex-col lg:flex-row">
                        <figure className="lg:w-[3%]"><Image src={yellowPin} alt="pic" /></figure>
                        {data.title}
                        <p className="font-normal text-sm inline text-black-grey w-fit text-center lg:text-start">added by {data.email}</p>
                      </h2>
                      // <div className="card-title w-full lg:w-full flex flex-col lg:flex-row">
                      //   <figure className="lg:w-[8%]"><Image src={yellowPin} alt="pic" /></figure>
                      //   <div>
                      //     <h2 className="font-normal text-base text-black">{data.title}</h2>
                      //     <p className="font-normal text-base text-black-grey w-fit text-center lg:text-start">added by {data.email}</p>
                      //   </div>
                      // </div>
                    }

                    {/* {
                      (data.type === "tour") &&
                      <h2 className="card-title w-full lg:w-full flex flex-col lg:flex-row">
                        <figure className="lg:w-[3%]"><Image src={yellowFlag} alt="pic"/></figure>
                        {data.title} 
                        <p className="font-normal text-base text-black-grey w-fit text-center lg:text-start">added by {data.username}</p>
                      </h2>
                    }                 */}
                    <p className="font-medium">{data.address}</p>
                    <p className="font-normal overflow-hidden lg:h-auto line-clamp-2 lg:line-clamp-3">{data.description}</p>
                    <div className='flex flex-row mt-1'>
                      <div className='flex gap-2 flex-wrap'>
                        {/* <Link className="px-2 py-1 bg-yellow text-white rounded-lg normal-case border-0 text-sm cursor-pointer">#{data.official_tag}</Link> */}
                        <button onClick={() => tagNameClick(data.official_tag)} className="px-2 py-1 bg-yellow text-white rounded-lg normal-case border-0 text-sm cursor-pointer">#{data.official_tag}</ button>
                        { data.tags && data.tags
                          .filter(tag => tag !== null) 
                          .map((usertag) => (
                          // usertag.type == data.title && <Link href="https://www.google.com/" className="px-2 py-1 bg-grey text-black rounded-lg normal-case border-0 text-sm cursor-pointer">#{usertag.value}</Link>                    
                          <button onClick={() => tagNameClick(usertag)} className="px-2 py-1 bg-grey text-black rounded-lg normal-case border-0 text-sm cursor-pointer">#{usertag}</button>                    
                        ))}
                        {/* <Link href="https://www.google.com/" className="px-2 py-1 bg-grey text-black rounded-lg normal-case border-0 text-sm cursor-pointer">#bridge</Link>                     */}
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
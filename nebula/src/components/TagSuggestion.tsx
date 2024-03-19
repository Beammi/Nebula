import Button from "./Button";
import React, { useEffect, useState } from "react";
import ImageUpload from "./ImageUpload";
import TimeLimitBox from "./TimeLimitBox";
import Image from "next/image";
import closeIcon from "../../public/images/close.png";
import smallHashtag from "../../public/images/smallHashtag_blue.png";
import filterIcon from "../../public/images/filter-icon.png"
import marketPic from "../../public/images/marketPic.png"
import bigBenPic from "../../public/images/bigBenPic.png"
import yellowPin from "../../public/images/yellowPin.png"
import yellowFlag from "../../public/images/yellowFlag.png"

import Link from 'next/link'
// import smallHashtag from "../../public/images/smallHashtag.png";
import NebuTag from "./NebuTag";


export default function TagSuggestion(props) {
  const tagSuggestionState = props.toggle;
  const action = props.action;
  const tag = props.tagName;

  // const mockHashtagData = [
  //   {
  //     "title": "Markets in London",
  //     "address": "Borough Market, Southbank Market, Blackfriars Road Food Market",
  //     "description": "A nice view of Big Ben during the sunset. You can get this view from the Queen’s Walk near Sea Life Lond...",
  //     "type": "tour",
  //     "username": "nat2100"
  //   },
  //   {
  //     "title": "Big Ben",
  //     "address": "London SW1A 0AA, United Kingdom",
  //     "description": "A Landmark of England. One of the most popolar clock tower in the entire world.",
  //     "type": "nebu",
  //     "username": "beammi4567"
  //   },
  //   {
  //     "title": "Markets in London",
  //     "address": "Borough Market, Southbank Market, Blackfriars Road Food Market",
  //     "description": "A nice view of Big Ben during the sunset. You can get this view from the Queen’s Walk near Sea Life Lond...",
  //     "type": "tour",
  //     "username": "birdie007"
  //   },
  //   {
  //     "title": "Big Ben",
  //     "address": "London SW1A 0AA, United Kingdom",
  //     "description": "A Landmark of England. One of the most popolar clock tower in the entire world.",
  //     "type": "nebu",
  //     "username": "nat2100"
  //   },
  // ]

  const [tagData, setTagData] = useState([])
  // const [userTag, setUserTag] = useState([])
  const [userTag, setUserTag] = useState<{ value: string; type: string }[]>([]);
  const [tagName, setTagName] = useState("");

  // console.log("t: ", tag);
  // console.log("ttt: ", tagName);

  useEffect(() => {
    setTagName(tag);
    fetchData()
    // setTagData([])
    // setUserTag([])

  }, [tag, tagName])

  function tagNameClick(tagName) {
    setTagName(tagName)
    setTagData([])
    setUserTag([])
    fetchData()
  }
  

  async function fetchData() {

    setTagData([])
    let url = `/api/nebu/getNebuByTag?tagName=${tagName}`
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data: string[] = await response.json();             
      setTagData(data)
      console.log("tag data: ", tagData);

      // data.map((d) => (
      //   getUserTag(d)
      // ))       
      // tagData.map(d => d.title)
      // console.log("DDD: ", tagData.map((d => d.title)));
      // tagData.map((data) => (
      //   getUserTag(data.title)
      // ))

      // Fetch user tags for each nebula
      // const userTagPromises = tagData.map(nebu => getUserTag(nebu));
      // const userTags = await Promise.all(userTagPromises);

      // console.log("User Tags:", userTags);      
      setUserTag([]); // clear tag if refetch from click tag  
      const userTagPromises = data.map(nebu => getUserTag(nebu.title));
      const userTags = await Promise.all(userTagPromises);

      console.log("User Tags:", userTags);    

    } catch (error) {
      console.error("Fetch error:", error)
    }
    

  }

  const getUserTag = async(nebuName) => {
    // const formattedData: { value: string, type: string }[] = [];
    try {
      const url = `/api/nebu/getUserTagFromNebu?nebuName=${nebuName}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      // Create an array of objects with value and type properties
      const formattedData = data.map(tagName => ({ value: tagName, type: nebuName }));
      
      // Update userTag state with the fetched data
      // setUserTag(prevState => [...prevState, ...formattedData]);

      // Filter out duplicate entries
      // const uniqueFormattedData = formattedData.filter((item, index, self) =>
      //     index === self.findIndex((t) => (
      //         t.value === item.value && t.type === item.type
      //     ))
      // );

      // Filter out duplicate entries using reduce method
      const uniqueFormattedData = formattedData.reduce((uniqueItems, currentItem) => {
          // Check if the current item is already present in the uniqueItems array
          const isDuplicate = uniqueItems.some(item => item.value === currentItem.value && item.type === currentItem.type);

          // If the current item is not a duplicate, add it to the uniqueItems array
          if (!isDuplicate) {
              uniqueItems.push(currentItem);
          }

          return uniqueItems;
      }, []);

      // Update userTag state with unique entries only
      setUserTag(prevState => [...prevState, ...uniqueFormattedData]);

    } catch (error) {
      console.error("Fetch error:", error);
      return [];
    }
  }
  

  // useEffect(() => {
  //   // fetchData()
  //   setTagName(tag);

  // }, [tagName])

  // useEffect(() => {
  //   fetchData()
  // }, [])

  

  return (
    <div
      className={`fixed top-1/2 left-1/2 rounded-lg tranforms -translate-x-1/2 -translate-y-1/2 transition-all ease-in duration-500 ${
        tagSuggestionState
          ? "visible opacity-100 drop-shadow-2xl"
          : "rounded-sm invisible opacity-0"
      } `}
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
          <button onClick={action}>
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
                    {userTag.map((usertag) => (
                      // usertag.type == data.title && <Link href="https://www.google.com/" className="px-2 py-1 bg-grey text-black rounded-lg normal-case border-0 text-sm cursor-pointer">#{usertag.value}</Link>                    
                      usertag.type == data.title && <button onClick={() => tagNameClick(usertag.value)} className="px-2 py-1 bg-grey text-black rounded-lg normal-case border-0 text-sm cursor-pointer">#{usertag.value}</button>                    
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
  );
}

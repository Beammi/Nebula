import Button from "../Button"
import React, { useEffect, useState } from "react"
import ImageUpload from "../ImageUpload"
import TimeLimitBox from "../TimeLimitBox"
import Image from "next/image"
import closeIcon from "../../../public/images/close.png"
import smallHashtag from "../../../public/images/smallHashtag_blue.png"
import flag from "../../../public/images/flagPurple.png"
import filterIcon from "../../../public/images/filter-icon.png"
import marketPic from "../../../public/images/marketPic.png"
import bigBenPic from "../../../public/images/bigBenPic.png"
import yellowPin from "../../../public/images/yellowPin.png"
import yellowFlag from "../../../public/images/yellowFlag.png"
import pic1 from "../../../public/images/ferryWheelPic.png"
import pic2 from "../../../public/images/holmesPic.png"
import pic3 from "../../../public/images/marketPic.png"
import altImage from "../../../public/images/altImage.png"
import { useRouter } from 'next/router';

import Link from "next/link"
// import smallHashtag from "../../public/images/smallHashtag.png";
import NebuTag from "../NebuTag"
interface IViewTourListProps {
  toggle: any; // Consider using more specific types here
  action: any;
  name?: any; // Marking name as optional
  nebu?: any;
}
const ViewTourList: React.FC<IViewTourListProps> = ({ toggle, action, name, nebu }) =>  {
  // const state = props.toggle;
  // const action = props.action;
  // const name = props.name;

  const [tours, setTours] = useState([])
  const [images, setImages] = useState([])
 
  const router = useRouter();


  const handleTourClick = (tourId) => {
    router.push(`/TourMapPage/${tourId}`);
  };
  
  // useEffect(() => {
  //   console.log("updated image: ", images[0])
  //   // fetchImages()
  // }, [images])
  useEffect(() => {
    const fetchTours = async () => {
      const response = await fetch(
        `/api/tour/getToursByPlaceName?place_name=${encodeURIComponent(
          nebu?.place_name
        )}`
      )
      if (response.ok) {
        const data = await response.json()
        setTours(data)
        console.log("Tour", tours)
      } else {
        // Handle error or set some error state to give feedback to the user
        console.error("Failed to fetch tours")
      }
    }
    
    fetchTours()
  }, [])
  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch(
        `/api/tour/getImagesFromNebus?place_name=${encodeURIComponent(nebu?.place_name)}`
      );
      if (response.ok) {
        const data = await response.json();
        setImages(data);
        console.log("Fetched images: ", images);
      } else {
        console.error("Failed to fetch images");
      }
    };
  

    fetchImages()
  }, []);
  
  console.log("View tour: ", nebu?.place_name)
  return (
    <div
      className={`fixed top-1/2 left-1/2 rounded-lg tranforms -translate-x-1/2 -translate-y-1/2 transition-all ease-in duration-500 max-h-[80vh] max-w-64${
        toggle
          ? "visible opacity-100 drop-shadow-2xl"
          : "rounded-sm invisible opacity-0 "
      } `}
    >
      {/* <p>Nebu {nebu}</p> */}
      <div className="rounded-lg shadow-md bg-dim-grey w-[23rem] lg:w-[65rem] h-[32rem] lg:h-[40rem] font-bold text-black p-7 ">
        <div className="flex justify-start my-2 items-center">
          <div className="flex gap-x-5 ml-3 items-center">
            <figure className="">
              {" "}
              <Image src={flag} alt="pic" width={25} />{" "}
            </figure>
            <h3 className="text-xl lg:text-2xl text-black flex gap-x-2">
              {name}
            </h3>
          </div>
          <div className="ml-auto dropdown dropdown-end dropdown-hover mr-4">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-sm m-1 normal-case bg-white drop-shadow-md text-black border-none hover:border-none hover:bg-grey flex flex-nowrap"
            >
              Filter{" "}
              <figure className="">
                <Image src={filterIcon} alt="pic" className="" />
              </figure>{" "}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-1 bg-grey text-black border-none hover:border-none hover:bg-grey rounded-box w-max"
            >
              <li>
                <a href="https://www.google.com/" className="hover:text-black">
                  High Rated
                </a>
              </li>
              <li>
                <a href="https://www.google.com/" className="hover:text-black">
                  Newest
                </a>
              </li>
              <li>
                <a href="https://www.google.com/" className="hover:text-black">
                  Oldest
                </a>
              </li>
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

        <div className="text-black mt-5 w-fit lg:w-[970px] h-[520px] flex flex-col overflow-y-auto lg:flex-row lg:overflow-x-auto gap-4  ">
          {tours.map((data, index) => (
            <div
              key={index}
              className="flex flex-col bg-white rounded-lg shadow-md p-3  min-w-[330px] items-center gap-y-1 cursor-pointer"
              onClick={() => handleTourClick(data.tour_id)}
            >
              <div className="text-center text-xl">{data.tour_name}</div>
              <div className="flex flex-row">
                <div className="rating">
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star bg-yellow h-4 "
                  />
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star bg-yellow h-4"
                  />
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star bg-yellow h-4"
                  />
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star bg-yellow h-4"
                    checked
                  />
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star bg-yellow h-4"
                  />
                  <label className="text-sm leading-4 text-yellow">4.0</label>
                </div>
              </div>
              <label className="text-sm font-normal text-black-grey ml-3 leading-4">
                Added by {data.creator_email}
              </label>
              <div className="flex flex-row gap-x-2 flex-wrap max-w-full justify-center mt-1 flex-shrink-0">
                <Button
                  buttonStyle=" px-2 py-1 w-fit bg-yellow text-white rounded-lg normal-case border-0 text-sm cursor-pointer"
                  type="button"
                  label={`#${data.official_tag}`}
                ></Button>
                {data.tags && data.tags.length > 0 && (
                  data.tags.map((tag, tagIndex) => (
                    <Button
                      key={tagIndex}
                      buttonStyle=" px-2 py-1 w-fit bg-grey text-black rounded-lg normal-case border-0 text-sm cursor-pointer"
                      type="button"
                      label={`#${tag}`}
                    ></Button>
                    
                  ))
                )}
              </div>
              {/* <div className="flex flex-col font-normal text-base mt-8 justify-start">
                {data.places && data.places.length > 0 ? (
                  data.places.map((place, placeIndex) => (
                    <p key={placeIndex} className="text-xs">
                      - {place.place_name}
                    </p>
                  ))
                ) : (
                  <p className="text-xs text-grey">Error getting places</p>
                )}
              </div> */}
              <div className="flex flex-col font-normal text-base mt-8 justify-start h-[150px] overflow-y-auto">
                {data.places && data.places.length > 0 ? (
                  data.places.map((place, placeIndex) => {
                    const firstCommaIndex = place.place_name.indexOf(',');
                    const truncatedPlace = firstCommaIndex !== -1 ? place.place_name.slice(0, firstCommaIndex) : place.place_name;
                    return (
                      <p key={placeIndex} className="text-base">
                        - {truncatedPlace}
                      </p>
                    );
                  })
                ) : (
                  <p className="text-xs text-grey">Error getting places</p>
                )}
              </div>
              <p className="font-medium text-base mt-6">Photo</p>
              <div className="flex gap-x-2 w-full overflow-x-scroll mt-2">
                {/* <div className="h-[130px] flex-shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src={pic1.src}
                  ></img>
                </div>
                <div className="h-[130px] flex-shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src={pic2.src}
                  ></img>
                </div>
                <div className="h-[130px] flex-shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src={pic3.src}
                  ></img>
                </div> */}
                <div className="h-[130px] flex-shrink-0">
                  {images && images.length > 0 ? (
                    images.map((imgUrl, imgIndex) => (
                        <Image
                        key={imgIndex}
                          alt={`image-${imgIndex}`}
                          src={imgUrl ? imgUrl : altImage.src}
                          className="w-full h-full object-cover"
                          style={{ width: '100%', height: 'auto' }}

                        />
                    ))
                  ) : (
                    <p>Loading images...</p>

                  )}
                   {/* <img
                    className="w-full h-full object-cover"
                    src="https://nebulaimagestorage.blob.core.windows.net/nebuimages/1711824518161-thailand-2696706_1280.jpg"
                  ></img> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default ViewTourList
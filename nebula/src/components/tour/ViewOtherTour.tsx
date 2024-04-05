// components/ViewOtherTours.tsx
import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Button from "../Button"
import Image from "next/image"
import flag from "../../../public/images/flagPurple.png"

export default function ViewOtherTours({ toggle, placeName }) {
  const [otherTours, setOtherTours] = useState([])
  const router = useRouter()

  useEffect(() => {
    const fetchOtherTours = async () => {
      // Placeholder: Fetch other tours based on the placeName or other criteria
      const response = await fetch(
        `/api/tour/getToursByPlaceName?place_name=${encodeURIComponent(
          placeName
        )}`
      )
      if (response.ok) {
        const data = await response.json()
        setOtherTours(data)
      } else {
        console.error("Failed to fetch other tours")
      }
    }

    if (placeName) {
      fetchOtherTours()
    }
  }, [placeName])

  const handleTourClick = (tourId) => {
    router.push(`/TourMapPage/${tourId}`)
  }

  return (
    <div
      className={`absolute top-0 left-0 z-50 w-full h-full bg-white p-4 ${
        toggle ? "" : "hidden"
      }`}
    >
      <h2 className="text-xl font-bold">Other Tours</h2>
      <button onClick={toggle} className="absolute top-4 right-4">
        Close
      </button>
      <div className="rounded-lg shadow-md bg-dim-grey w-[23rem] lg:w-[65rem] h-[32rem] lg:h-[40rem] font-bold text-black p-7 ">
        <div className="flex justify-start my-2 items-center">
          <div className="flex gap-x-5 ml-3 items-center">
            <figure className="">
              {" "}
              <Image src={flag} alt="pic" width={25} />{" "}
            </figure>
            <h3 className="text-xl lg:text-2xl text-black flex gap-x-2">
              Other Tours
            </h3>
          </div>
          <div className="ml-auto dropdown dropdown-end dropdown-hover mr-4">

 
          </div>

        </div>

        <div className="w-full h-[3px] bg-grey "></div>

        <div className="text-black mt-5 w-fit lg:w-[970px] h-[520px] flex flex-col overflow-y-auto lg:flex-row lg:overflow-x-auto gap-4  ">
          {otherTours.map((data, index) => (
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
                {data.tags &&
                  data.tags.length > 0 &&
                  data.tags.map((tag, tagIndex) => (
                    <Button
                      key={tagIndex}
                      buttonStyle=" px-2 py-1 w-fit bg-grey text-black rounded-lg normal-case border-0 text-sm cursor-pointer"
                      type="button"
                      label={`#${tag}`}
                    ></Button>
                  ))}
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
                    const firstCommaIndex = place.place_name.indexOf(",")
                    const truncatedPlace =
                      firstCommaIndex !== -1
                        ? place.place_name.slice(0, firstCommaIndex)
                        : place.place_name
                    return (
                      <p key={placeIndex} className="text-base">
                        - {truncatedPlace}
                      </p>
                    )
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
                {/* <div className="h-[130px] flex-shrink-0">
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

                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

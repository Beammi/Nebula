// components/EditNebu.js
import React, { useState, useEffect } from "react"
import Button from "../Button"
import ImageUpload from "../ImageUpload"
import Image from "next/image"
import close from "../../../public/images/close.png"
import { useRouter } from "next/router"
import TimeLimitBox from "../TimeLimitBox"
export default function EditNebu({ nebuId, onCancel }) {
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [duration, setDuration] = useState("")
  const [startTime, setStartTime] = useState(null); // For the current date
  const [endTime, setEndTime] = useState(null); 
  const [officialTag, setOfficialTag] = useState("")
  const [tags, setTags] = useState([])
  const [openDays, setOpenDays] = useState({
    Mon: false,
    Tue: false,
    Wed: false,
    Thu: false,
    Fri: false,
    Sat: false,
    Sun: false,
  })
  const [openTime, setOpenTime] = useState("")
  const [closeTime, setCloseTime] = useState("")
  const [website, setWebsite] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [additionalTags, setAdditionalTags] = useState([])

  useEffect(() => {
    const fetchNebuDetails = async () => {
      try {
        const response = await fetch(`/api/nebu/getNebuById?nebuId=${nebuId}`)
        if (response.ok) {
          const data = await response.json()
          setTitle(data.title)
          setDescription(data.description)
          setDuration(data.duration)
          setStartTime(data.start_time)
          setEndTime(data.end_time)
          setOfficialTag(data.official_tag)
          setTags(data.tags)
          setOpenDays({
            Mon: data.open_monday,
            Tue: data.open_tuesday,
            Wed: data.open_wednesday,
            Thu: data.open_thursday,
            Fri: data.open_friday,
            Sat: data.open_saturday,
            Sun: data.open_sunday,
          })
          setOpenTime(data.open_time)
          setCloseTime(data.close_time)
          setWebsite(data.website)
          setPhoneNumber(data.phone_number)
          setAdditionalTags(data.tags || [])
        } else {
          console.error("Failed to fetch Nebu details")
        }
      } catch (error) {
        console.error("Error fetching Nebu details:", error)
      }
    }
    fetchNebuDetails()
  }, [nebuId])
  const handleTagRemove = (index) => {
    setAdditionalTags((current) => current.filter((_, i) => i !== index))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/nebu/editNebu", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nebuId,
          title,
          description,
          duration,
          start_time: startTime,
          end_time: endTime,
          official_tag: officialTag,
          tags,
          open_sunday: openDays.Sun,
          open_monday: openDays.Mon,
          open_tuesday: openDays.Tue,
          open_wednesday: openDays.Wed,
          open_thursday: openDays.Thu,
          open_friday: openDays.Fri,
          open_saturday: openDays.Sat,
          open_time: openTime,
          close_time: closeTime,
          website,
          phone_number: phoneNumber,
        }),
      })
      if (response.ok) {
        // Nebu updated successfully, redirect or perform other actions
        alert("Updated Successfully")
        onCancel()
        // router.back()
      } else {
        console.error("Failed to update Nebu")
      }
    } catch (error) {
      console.error("Error updating Nebu:", error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="text-black bg-white p-4 rounded-md max-h-[60vh] overflow-auto"
      >
        <div className="flex justify-end mb-2">
          <button onClick={onCancel}>
            <Image src={close} alt="clsbtn" className="pt-2" width={20} />
          </button>
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg">Title</h3>
          <input
            type="text"
            className="p-2 bg-grey rounded-md focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col mt-4">
          <h3 className="text-lg">Description</h3>
          <textarea
            name="description"
            rows={5}
            cols={40}
            className="p-2 resize-none bg-grey rounded-md focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {/* Duration Dropdown
        <div className="mt-4">
          <h3 className="text-lg">Duration</h3>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="input input-bordered w-full max-w-xs bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Duration</option>
            <option value="permanent">Permanent</option>
            <option value="temporary">Temporary</option>
          </select>
        </div>

        {duration === "temporary" && (
          <TimeLimitBox
            timeLimitType={duration}
            setTimeLimitType={setDuration}
            startDate={startTime}
            setStartDate={setStartTime}
            endDate={endTime}
            setEndDate={setEndTime}
          />
        )} */}
        {/* Open Time and Close Time */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg">Open Time</h3>
            <input
              type="time"
              value={openTime}
              onChange={(e) => setOpenTime(e.target.value)}
              className="input input-bordered w-full bg-grey"
            />
          </div>
          <div>
            <h3 className="text-lg">Close Time</h3>
            <input
              type="time"
              value={closeTime}
              onChange={(e) => setCloseTime(e.target.value)}
              className="input input-bordered w-full bg-grey"
            />
          </div>
        </div>
        {/* Open Days */}
        <div className="mt-4">
          <h3 className="text-lg">Open Days</h3>
          <div className="flex flex-wrap">
            {Object.entries(openDays).map(([day, isChecked]) => (
              <label key={day} className="inline-flex items-center mr-2">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() =>
                    setOpenDays({ ...openDays, [day]: !isChecked })
                  }
                  className="checkbox"
                />{" "}
                {day}
              </label>
            ))}
          </div>
        </div>
        {/* Website */}
        <div className="mt-4">
          <h3 className="text-lg">Website</h3>
          <input
            type="text"
            placeholder="Website URL"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="input w-full max-w-xs bg-grey rounded-md focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue"
          />
        </div>

        {/* Phone Number */}
        <div className="mt-4">
          <h3 className="text-lg">Phone Number</h3>
          <input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="input w-full max-w-xs bg-grey rounded-md focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue"
          />
        </div>
        {/* Add other form fields here */}
        <Button
          buttonStyle="btn btn-primary bg-blue w-fit border-none "
          label="Update Nebu"
          type="submit"
        />
      </form>
    </div>
  )
}

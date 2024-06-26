import { useState } from "react"
import { supabase } from "../lib/supabaseClient"
import Link from "next/link"
import { useRouter } from "next/router"
import MyNebu from "@/components/MyNebu"
import MyTour from "@/components/MyTour"
import Bookmark from "@/components/Bookmark"
import Profile from "@/components/Profile"


interface IProfileButton {
  text?: string
}

const ProfileButton: React.FunctionComponent<IProfileButton> = ({ text }) => {
  const colors = ["bg-blue", "bg-red", "bg-yellow", "bg-dark-grey"]
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  const [IsOpen, setIsOpen] = useState(false)
  const [showMyNebu, setShowMyNebu] = useState(false);
  const [showMyTour, setShowMyTour] = useState(false);
  const [showBookmark, setShowBookmark] = useState(false);
  const [showMyProfile, setShowMyProfile] = useState(false);
  const [accountNameValue, setAccountNameValue] = useState("");
  const router = useRouter()

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

  async function handleLogOut() {
    let { error } = await supabase.auth.signOut()
    if(error){
      console.log("Can't Log out")
    }else{
      console.log("Log Out Successfully!")
      router.push("/login")
    }
  }
  return (
    <div className="p-4 hidden md:block">
      <button
        className={`btn btn-circle text-white bg-black-grey border-0 p-4`}
        onClick={() => setIsOpen(!IsOpen)}
      >
        {text}
      </button>
      <div
        className={`flex flex-col bg-white fixed right-12 p-8 shadow-lg rounded-lg opacity-0 top-24 transition-all ease-in duration-200 ${
          IsOpen ? "opacity-100" : "right-[-200px]"
        }`}
      >

        <ul className="flex flex-col gap-4 text-[black]">
          <li className="cursor-pointer" onClick={() => handleMyProfileClick()}>Profile</li>
          <li className="cursor-pointer" onClick={() => handleMyNebuClick()}>My Nebu</li>          
          <li className="cursor-pointer" onClick={() => handleMyTourClick()}>My Tour</li>
          <li className="cursor-pointer" onClick={() => handleBookmarkClick()}>Bookmark</li>          
          <li>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault() // Prevent the default link behavior
                handleLogOut() // Call the async function
              }}
            >
              Log Out
            </Link>
          </li>
        </ul>

      </div>

      <MyNebu toggle={showMyNebu} action={closeMyNebu} accountName={accountNameValue}/>
      <MyTour toggle={showMyTour} action={closeMyTour} accountName={accountNameValue}/>
      <Bookmark toggle={showBookmark} action={closeBookmark} accountName={accountNameValue}/>
      <Profile toggle={showMyProfile} action={closeMyProfile} accountName={accountNameValue}/>
    </div>
  )
}
export default ProfileButton

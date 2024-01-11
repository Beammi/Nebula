import React from "react"
import Image from "next/image"
import SearchBar from "../components/SearchBar"
import readyAdventurePic from "../../public/images/time_ready.png"
import Footer from "../components/Footer"
import Button from "../components/Button"
import Navbar from "@/components/Navbar"
import TextInput from "@/components/TextInputWithLabel"
import { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import { SignUp } from "@clerk/nextjs";

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmedPassword, setConfirmedPassword] = useState("")
  const [message, setMessage] = useState(null)
  const [areEqual, setAreEqual] = useState(false)
  const router = useRouter();
  useEffect(() => {
    // Check if the two inputs are equal
    setAreEqual(
      password === confirmedPassword &&
        password != "" &&
        confirmedPassword != ""
    )
  }, [password, confirmedPassword])

  async function handleSubmit(e) {
    e.preventDefault()
    if (password != confirmedPassword) {
      return alert("Your passwords are not match!!!")
    } else {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      if (!response.ok) {
        setMessage(data.message || "Something went wrong!")
      } else {
        setMessage("User created successfully!")
        // Redirect or further actions
        router.push('/home')
      }
    }
  }
  function validatePasswordMessage() {
    if (password == "" || confirmedPassword == "") {
      return
    } else {
      if (areEqual) {
        return <p>Passwords are equal</p>
      } else {
        return <p className="text-red text-sm">Passwords are not match</p>
      }
    }
  }

  return (
    <>
      <div className="h-screen">
        <Navbar />
        {/* {message && <p>{message}</p>} */}
        <div className="flex md:flex-row flex-col">
        <div className="hero bg-white h-fit min-h-screen">
          <div className="hero-content flex flex-col justify-center md:flex-row md:gap-32">

          <figure className="max-w-md">
            <Image
              src={readyAdventurePic}
              alt="adventure pic"
              className="pt-2"
              width={520}
            />
          </figure>
          <SignUp path="/register" routing="path" signInUrl="/login" redirectUrl="/home"/>

          </div>
          </div>
        </div>

        

        <Footer />
      </div>
    </>
  )
}

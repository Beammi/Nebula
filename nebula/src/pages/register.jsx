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

  const router = useRouter();
  

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

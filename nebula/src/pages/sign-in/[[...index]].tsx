//pages/login.jsx
import React from "react"
import Image from "next/image"
import timeAdventurePic from "../../../public/images/time_adventure.png"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { SignIn, useUser } from "@clerk/nextjs"
import { useRouter } from "next/router"
// import colors from "tailwindcss/colors"

export default function Login() {
  const { isLoaded, isSignedIn } = useUser()
  const router = useRouter()

  // Redirect the user if they are already authenticated
  if (isLoaded && isSignedIn) router.replace("/home")

  return (
    <>
      <div className="h-screen">
        <Navbar />
        <div className="flex md:flex-row flex-col">
          <div className="hero bg-white h-fit min-h-screen">
            <div className="hero-content flex flex-col justify-center md:flex-row md:gap-32">
              <figure className="max-w-md">
                <Image
                  src={timeAdventurePic}
                  alt="adventure pic"
                  className="pt-2"
                  width={520}
                />
              </figure>
              <SignIn
                path="/sign-in"
                routing="path"
                signUpUrl="/register"
                afterSignInUrl="/home"
              />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

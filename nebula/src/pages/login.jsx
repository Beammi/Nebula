//pages/login.jsx
import React from "react"
import Image from "next/image"
import timeAdventurePic from "../../public/images/time_adventure.png"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
// import { SignIn, useUser } from "@clerk/nextjs"
import { useRouter } from "next/router"
// import colors from "tailwindcss/colors"
import { useState,useEffect } from "react"
import TextInput from "@/components/TextInputWithLabel"
import Button from "../components/Button"
import googleIcon from "../../public/images/google-icon.png"
import facebookIcon from "../../public/images/fb-icon.png"
import twitterIcon from "../../public/images/twitter-icon.png"
import Link from "next/link"
import { supabase } from "../lib/supabaseClient"

export default function Login() {
  // const { isLoaded, isSignedIn } = useUser()
  const router = useRouter()
  async function checkSession(){
    const { data: { user } ,error} = await supabase.auth.getUser()

    if(!error||user!=null){
      router.push("/home")
    }
  }
  useEffect(()=>{
    checkSession()
  },[])

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
      if(error){
        console.log("Error when log-in")
      }else{
        alert(JSON.stringify(data))
        router.push("/home")
      }
    
    
}
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
              <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-white border-2 border-black text-black">
                <form className="card-body" onSubmit={handleSubmit}>
                  <h2 className="font-bold text-2xl text-center">Login</h2>
                  <div className="divider before:bg-grey after:bg-grey"></div>

                  <TextInput
                    textLabel="Email Address"
                    inputType="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextInput
                    textLabel="Password"
                    inputType="password"
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <div className="flex justify-center">
                    <Button
                      buttonStyle="btn btn-primary bg-blue w-fit"
                      label="Login"
                      type="submit"
                    ></Button>
                  </div>

                  <div className="flex justify-center">
                    <label className="label">
                      <label className="font-normal text-sm">
                        Don't have an account?
                      </label>
                      <a
                        href="/register"
                        className="label-text-alt link link-hover indent-1 text-blue text-sm"
                      >
                        Register
                      </a>
                    </label>
                  </div>

                  <div className="divider before:bg-grey after:bg-grey"></div>
                  <div className="flex flex-col justify-center text-center">
                    {/* <label className="label"> */}
                    <label className="font-normal text-lg mb-2">
                      Or Login with
                    </label>
                    <div className="flex justify-center md:flex-row gap-x-2">
                      <Link
                        href="https://www.google.com/"
                        className="flex flex-row items-center rounded-md px-2 shadow-neutral-500 shadow-md cursor-pointer"
                      >
                        <figure>
                          <Image
                            src={googleIcon}
                            alt="adventure pic"
                            className="py-2 md:mx-1 mx-3 cursor-pointer"
                            width={20}
                          />
                        </figure>
                        <label className="cursor-pointer">Google</label>
                      </Link>

                      <Link
                        href="https://www.facebook.com/"
                        className="flex flex-row items-center rounded-md px-2 shadow-neutral-500 shadow-md cursor-pointer"
                      >
                        <figure>
                          <Image
                            src={facebookIcon}
                            alt="adventure pic"
                            className="py-2 md:mx-1 mx-3 cursor-pointer"
                            width={20}
                          />
                        </figure>
                        <label className="cursor-pointer">Facebook</label>
                      </Link>

                      <Link
                        href="https://www.twitter.com/"
                        className="flex flex-row items-center rounded-md px-2 shadow-neutral-500 shadow-md cursor-pointer"
                      >
                        <figure>
                          <Image
                            src={twitterIcon}
                            alt="adventure pic"
                            className="py-2 md:mx-1 mx-3 cursor-pointer"
                            width={20}
                          />
                        </figure>
                        <label className="cursor-pointer">Twitter</label>
                      </Link>
                    </div>
                    {/* </label> */}
                  </div>
                </form>
              </div>
              {/* <SignIn
                path="/login"
                routing="path"
                signUpUrl="/register"
                afterSignInUrl="/home"
              /> */}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

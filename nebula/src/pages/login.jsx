//pages/login.jsx
import React from "react"
import Image from "next/image"
import timeAdventurePic from "../../public/images/time_adventure.png"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
// import { SignIn, useUser } from "@clerk/nextjs"
import { useRouter } from "next/router"
// import colors from "tailwindcss/colors"
import { useState, useEffect } from "react"
import TextInputWithLabel from "@/components/TextInputWithLabel"
import Button from "../components/Button"
import googleIcon from "../../public/images/google-icon.png"
import facebookIcon from "../../public/images/fb-icon.png"
import twitterIcon from "../../public/images/twitter-icon.png"
import Link from "next/link"
import { supabase } from "../lib/supabaseClient"
//**************************************************แก้ TextInputWithLabel ให้มี option required
//**************************************************แก้ให้ check text input ของ email&password
export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function checkSession() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (!error || user != null) {
      router.push("/home")
    } else {
      console.log("Error: " + error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (email === "" || password === "") {
      alert("Please fill email and password")
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      if (error || !response.ok) {
        //เพิ่ม catch ตอน wrong password
        console.log("Error: "+error+"Error from local: "+response.toString())
      } else {
        alert(JSON.stringify(data))
        router.push("/home")
      }
    }
  }
  async function handleSignInWithGoogle(response) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      // token: response.credential,
      // nonce: 'NONCE', // must be the same one as provided in data-nonce (if any)
    })
    console.log(data)
    if (error) {
      console.log(error)
    }
  }
  async function handleSignInWithFacebook(response) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
      // token: response.credential,
      // nonce: 'NONCE', // must be the same one as provided in data-nonce (if any)
    })
    console.log(data)
    if (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    checkSession()
  }, [])
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

                  <TextInputWithLabel
                    textLabel="Email Address"
                    inputType="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextInputWithLabel
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
                      <button
                        onClick={() => handleSignInWithGoogle()}
                        className="flex flex-row items-center rounded-md px-2 shadow-neutral-500 shadow-md cursor-pointer"
                      >
                        <figure>
                          <Image
                            src={googleIcon}
                            alt="Google"
                            className="py-2 md:mx-1 mx-3 cursor-pointer"
                            width={20}
                          />
                        </figure>
                        <label className="cursor-pointer">Google</label>
                      </button>

                      <button
                        onClick={() => handleSignInWithFacebook()}
                        className="flex flex-row items-center rounded-md px-2 shadow-neutral-500 shadow-md cursor-pointer"
                      >
                        <figure>
                          <Image
                            src={facebookIcon}
                            alt="Facebook"
                            className="py-2 md:mx-1 mx-3 cursor-pointer"
                            width={20}
                          />
                        </figure>
                        <label className="cursor-pointer">Facebook</label>
                      </button>

                      <button
                        onClick={() =>
                          window.open("https://www.twitter.com/", "_blank")
                        }
                        className="flex flex-row items-center rounded-md px-2 shadow-neutral-500 shadow-md cursor-pointer"
                      >
                        <figure>
                          <Image
                            src={twitterIcon}
                            alt="Twitter"
                            className="py-2 md:mx-1 mx-3 cursor-pointer"
                            width={20}
                          />
                        </figure>
                        <label className="cursor-pointer">Twitter</label>
                      </button>
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

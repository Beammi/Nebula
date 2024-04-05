import React from "react"
import Image from "next/image"
import SearchBar from "../components/SearchBar"
import readyAdventurePic from "../../public/images/time_ready.png"
import Footer from "../components/Footer"
import Button from "../components/Button"
import Navbar from "@/components/Navbar"
import TextInput from "@/components/TextInputWithLabel"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { supabase } from "../lib/supabaseClient"

export default function ChangePassword() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmedPassword, setConfirmedPassword] = useState("")
  const [message, setMessage] = useState(null)
  const [areEqual, setAreEqual] = useState(false)
  const token = router.query.access_token // Adjust based on how Supabase structures the reset link
  async function getSessionUser() {
    const { data, error } = await supabase.auth.getSession()
    console.log("data ", JSON.stringify(data))
    console.log("error ", error)
  }
  useEffect(() => {
    alert(`token: ${token}`);
    if (!token) {
      alert("Token is required.")
      return
    }
    getSessionUser()
  }, [])

  useEffect(() => {
    setAreEqual(
      password === confirmedPassword &&
        password != "" &&
        confirmedPassword != ""
    )
  }, [password, confirmedPassword])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!areEqual) {
      setMessage("Passwords do not match")
      return
    }
    await changePassword(password)
  }
  const changePassword = async (newPassword) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) {
      console.error("Error changing password:", error.message)
    } else {
      alert("Password changed successfully!")
      // Redirect the user or perform any other actions post password change
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
              <div className="flex flex-col">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-white border-2 border-black text-black">
                  <form className="card-body" onSubmit={handleSubmit}>
                    <h2 className="font-bold text-2xl text-center">
                      Change Password
                    </h2>
                    <div className="divider before:bg-grey after:bg-grey"></div>
                    {/* <TextInput
                      textLabel="Email Address"
                      inputType="email"
                      placeholder="Enter email"
                      onChange={(e) => setEmail(e.target.value)}
                    /> */}
                    <TextInput
                      textLabel="Password"
                      inputType="password"
                      placeholder="Enter Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextInput
                      textLabel="Confirm Password"
                      inputType="password"
                      placeholder="Confirm Password"
                      onChange={(e) => setConfirmedPassword(e.target.value)}
                    />
                    {/* {areEqual ? (
                  <div className="text-black">The passwords are equal.</div>
                ) : (
                  <div className="text-red">The passwords are not equal.</div>
                )} */}
                    {validatePasswordMessage()}
                    <div className="flex justify-center">
                      <Button
                        buttonStyle="btn btn-primary bg-blue w-fit"
                        label="Change Password"
                        type="submit"
                      />
                    </div>
                  </form>

                  {/* <div className="flex justify-center">
                    <label className="label">
                      <label className="font-normal text-sm">
                        Have an account?
                      </label>
                      <a
                        href="/login"
                        className="label-text-alt link link-hover indent-1 text-blue text-sm"
                      >
                        Log In
                      </a>
                    </label>
                  </div> */}
                </div>
                {/* <SignUp
                  path="/register"
                  routing="path"
                  signInUrl="/login"
                  afterSignInUrl="/home"
                /> */}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

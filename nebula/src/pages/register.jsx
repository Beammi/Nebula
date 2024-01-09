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
        <div className="hero p-10 bg-white h-fit min-h-screen">
          <div className="hero-content flex-col md:flex-row gap-32">
            <figure>
              <Image
                src={readyAdventurePic}
                alt="adventure pic"
                className="pt-2"
                width={520}
              />
            </figure>

            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-white border-2 border-black text-black">
              <form className="card-body" onSubmit={handleSubmit}>
                <h2 className="font-bold text-2xl text-center">Register</h2>
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
                    label="Register"
                    type="submit"
                  />
                </div>
              </form>

              <div className="flex justify-center">
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
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

import React, { useState } from "react"
import Link from "next/link"
export default function Navbar() {
  const [menu, setMenu] = useState(false)
  return (
    <>
      <nav className="w-full bg-white p-4 flex items-center justify-between md:flex md:justify-between md:items-center border-b-2 border-black">
        <span className="text-black text-2xl md:text-3xl font-black">
          Nebula
        </span>
        <ul
          className={`md:flex md:items-center z-[1] md:z-auto md:static rounded-b-lg absolute bg-white md:bg-white w-full shadow-xl md:shadow-none left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-300 ${
            menu ? "top-[74px] opacity-100" : "top-[-400px]"
          }`}
        >
          <li className="mx-2 my-6 md:my-0">
            <a className="text-black font-black mx-4 hover:text-blue duration-500 cursor-pointer">
              Home
            </a>
          </li>
          <li className="mx-2 my-6 md:my-0">
            <a className="text-black font-black mx-4 hover:text-blue duration-500 cursor-pointer">
              Features
            </a>
          </li>
          <li className="mx-2 my-6 md:my-0">
            <a className="text-black font-black mx-4 hover:text-blue duration-500 cursor-pointer">
              About
            </a>
          </li>
          <li className="mx-2 my-6 md:my-0">
            <a className="text-black font-black mx-4 hover:text-blue duration-500 cursor-pointer">
              Contact
            </a>
          </li>
          <li className="mx-2 my-6 md:my-0">
            <Link href="/home_unregistered" className="text-blue underline ml-4 md:mx-2">Try Nebula</Link>
            <span className="text-blue ml-2 md:ml-2">or</span>
          </li>
          <Link href="/register">
            <button className="text-white bg-blue py-2 px-5 rounded-lg mx-4 md:mx-4 hover:bg-color">
              Register
            </button>
          </Link>
        </ul>
        <button
          onClick={() => setMenu(!menu)}
          className="text-white bg-blue py-2 px-2 rounded-lg mx-4 md:mx-4 hover:bg-color md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </button>
      </nav>
    </>
  )
}

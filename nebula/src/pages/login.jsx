import React from 'react'
import Image from 'next/image'
import SearchBar from '../components/SearchBar'
import timeAdventurePic from '../../public/images/time_adventure.png'
import Footer from '../components/Footer'
import Button from '../components/Button'

export default function Login() {
  return (
    <>

        <div className="hero min-h-screen bg-white">
          <div className="hero-content flex-col md:flex-row gap-32">

            <figure><Image src={timeAdventurePic} alt="adventure pic" className="pt-2" width={520}/></figure>

            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-white border-2 border-black text-black">
              <form className="card-body">

                <h2 className='font-bold text-2xl text-center'>Login</h2>
                <div className="divider before:bg-grey after:bg-grey"></div> 
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold text-black">Email Address</span>
                  </label>
                  <input type="email" placeholder="Enter email" className="input input-bordered bg-light-grey border-black" required />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold text-black">Password</span>
                  </label>
                  <input type="password" placeholder="Enter Password" className="input input-bordered bg-light-grey border-black" required />
                </div>
                

                <div className="flex justify-center">
                  <Button buttonStyle="btn btn-primary bg-blue w-fit" label="Login"></Button>
                </div>

                <div className='flex justify-center'>
                  <label className="label">
                    <label className='font-normal text-sm'>Don't have an account?</label>
                    <a href="#" className="label-text-alt link link-hover indent-1 text-blue ">Register</a>
                  </label>
                </div>

              </form>
            </div>

          </div>
        </div>


        <Footer />
    </>
  )
}

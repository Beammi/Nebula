import React from 'react'
import Image from 'next/image'
import SearchBar from '../components/SearchBar'
import timeAdventurePic from '../../public/images/time_adventure.png'
import Footer from '../components/Footer'
import Button from '../components/Button'
import Navbar from '@/components/Navbar'
import TextInput from '@/components/TextInputWithLabel'
import googleIcon from '../../public/images/google-icon.png'
import facebookIcon from '../../public/images/fb-icon.png'
import twitterIcon from '../../public/images/twitter-icon.png'

export default function Login() {
  return (
    <>
        <div className='h-screen'>
          <Navbar />
          <div className="hero p-10 bg-white h-fit min-h-screen">
            <div className="hero-content flex-col md:flex-row gap-32">

              <figure><Image src={timeAdventurePic} alt="adventure pic" className="pt-2" width={520}/></figure>

              <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-white border-2 border-black text-black">
                <form className="card-body">

                  <h2 className='font-bold text-2xl text-center'>Login</h2>
                  <div className="divider before:bg-grey after:bg-grey"></div>
                                  
                  <TextInput textLabel="Email Address" inputType="email" placeholder="Enter email"/>                
                  <TextInput textLabel="Password" inputType="password" placeholder="Enter Password"/>

                  <div className="flex justify-center">
                    <Button buttonStyle="btn btn-primary bg-blue w-fit" label="Login"></Button>
                  </div>

                  <div className='flex justify-center'>
                    <label className="label">
                      <label className='font-normal text-sm'>Don't have an account?</label>
                      <a href="/register" className="label-text-alt link link-hover indent-1 text-blue text-sm">Register</a>
                    </label>
                  </div>

                  <div className="divider before:bg-grey after:bg-grey"></div>
                  <div className='flex flex-col justify-center text-center'>
                    {/* <label className="label"> */}
                      <label className='font-normal text-lg mb-2'>Or Login with</label>
                      <div className='flex flex-col justify-center md:flex-row md:gap-x-2'>
                        <div className='flex flex-row items-center rounded-md px-2 shadow-neutral-500 shadow-md cursor-pointer'>
                          <figure><Image src={googleIcon} alt="adventure pic" className="py-2 mr-1" width={20}/></figure>
                          <label className='drop-shadow-2xl'>Google</label>
                        </div>

                        <div className='flex flex-row items-center rounded-md px-2 shadow-neutral-500 shadow-md cursor-pointer'>
                          <figure><Image src={facebookIcon} alt="adventure pic" className="py-2 mr-1" width={20}/></figure>
                          <label>Facebook</label>
                        </div>

                        <div className='flex flex-row items-center rounded-md px-2 shadow-neutral-500 shadow-md cursor-pointer'>
                          <figure><Image src={twitterIcon} alt="adventure pic" className="py-2 mr-1" width={20}/></figure>
                          <label>Twitter</label>
                        </div>
                      </div>
                    {/* </label> */}
                  </div>


                </form>
              </div>

            </div>
          </div>


          <Footer />
        </div>
    </>
  )
}

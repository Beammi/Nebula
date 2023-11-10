import React from "react"
import Image from "next/image"
import pinOnMap from "../../public/images/image4.png"
import peopleHoldMap from "../../public/images/image5.png"
import holidays from "../../public/images/holidays.png"

export default function IntroCard() {
  return (
    <>
      <div className="flex flex-col items-center mx-4 my-4 md:my-8">
        <div className="w-50 lg:w-80">
          <figure>
            <Image src={pinOnMap} alt="image4" />
          </figure>
        </div>
        <h1 className="text-center text-blue font-black text-2xl my-8">
          Interactive Map Exploration
        </h1>
        <p>
          Discover the world around you like never before with Nebula’s
          Interactive Map. Zoom, pan, and explore a dynamic map to find local
          events, hidden gems, and popular spots curated by a community of
          explorers.
        </p>
      </div>
      <div className="flex flex-col items-center mx-4 my-4 md:my-8">
        <div className="w-50 lg:w-80">
          <figure>
            <Image src={peopleHoldMap} alt="image5" width={300} height={300} />
          </figure>
        </div>
        <h1 className="text-center text-blue font-black text-2xl my-8">
          Community-Driven Discoveries
        </h1>
        <p>
          Be part of a vibrant community where every user is both an explorer
          and a guide. With Nebula, you can create your own 'Nebu' - marking
          your favorite spots and sharing unique experiences - or browse the
          Nebus shared by others.
        </p>
      </div>
      <div className="flex flex-col items-center mx-4 my-4 md:my-8">
        <div className="w-50 lg:w-80">
          <figure>
            <Image src={holidays} alt="image6" width={297} height={297} />
          </figure>
        </div>
        <h1 className="text-center text-blue font-black text-2xl my-8">
          Personalized User Experience
        </h1>
        <p>
          Customize your journey with Nebula. Create your profile to keep track
          of your adventures, save your favorite Nebus, and get personalized
          recommendations based on your interests and activities.
        </p>
      </div>
    </>
  )
}

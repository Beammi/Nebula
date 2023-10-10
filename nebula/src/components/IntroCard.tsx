import React from "react";
import Image from "next/image";
import pinOnMap from "../../public/images/image4.png";
import peopleHoldMap from "../../public/images/image5.png";
import holidays from "../../public/images/holidays.png";

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
          card1
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos, porro
          pariatur harum, voluptatibus adipisci aspernatur doloremque minus
          deleniti corporis aliquid magni sunt velit fuga dicta!
        </p>
      </div>
      <div className="flex flex-col items-center mx-4 my-4 md:my-8">
        <div className="w-50 lg:w-80">
          <figure>
            <Image src={peopleHoldMap} alt="image5" width={300} height={300} />
          </figure>
        </div>
        <h1 className="text-center text-blue font-black text-2xl my-8">
          card2
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos, porro
          pariatur harum, voluptatibus adipisci aspernatur doloremque minus
          deleniti corporis aliquid magni sunt velit fuga dicta!
        </p>
      </div>
      <div className="flex flex-col items-center mx-4 my-4 md:my-8">
        <div className="w-50 lg:w-80">
          <figure>
            <Image src={holidays} alt="image6" width={297} height={297} />
          </figure>
        </div>
        <h1 className="text-center text-blue font-black text-2xl my-8">
          card3
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos, porro
          pariatur harum, voluptatibus adipisci aspernatur doloremque minus
          deleniti corporis aliquid magni sunt velit fuga dicta!
        </p>
      </div>
    </>
  );
}

import { useState } from "react";

import Image from "next/image"

import largePinIcon from "../../public/images/large-pin-icon.png"
import mediumPinIcon from "../../public/images/medium-pin-icon.png"
import smallPinIcon from "../../public/images/small-pin-icon.png"

export default function MoveablePin() {

  return (
      <div className=" absolute w-20 h-20 top-1/2 left-1/2 rounded-lg tranforms -translate-x-1/2 -translate-y-1/2">
        <Image src={largePinIcon} alt="clsbtn" className="pt-2"/>
      </div>
  );
}

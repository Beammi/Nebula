// Add comment
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image, { StaticImageData } from "next/image";
import React from "react"

interface IButton {
    buttonStyle?: string
    label?: string
    imageSrc?: string | StaticImport;
    type: "button" | "submit" | "reset";
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FunctionComponent<IButton> = ({ buttonStyle, label, onClick, imageSrc, type }) => {
    return(
        <div className="pt-4">
            <button className={`${buttonStyle}`} onClick={onClick} type={type} >{label}</button>
            
        </div>
    )
}

export default Button
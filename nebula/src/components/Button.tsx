// Add comment
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image, { StaticImageData } from "next/image";
import React from "react"

interface IButton {
    buttonStyle?: string
    label?: string
    onClick?: () => void;
    imageSrc?: string | StaticImport;
}

const Button: React.FunctionComponent<IButton> = ({ buttonStyle, label, onClick, imageSrc }) => {
    return(
        <div className="pt-4">
            <button className={`${buttonStyle}`} onClick={onClick}>{label}sfdad</button>
            
        </div>
    )
}

export default Button
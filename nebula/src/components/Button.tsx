// Add comment
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image, { StaticImageData } from "next/image";
import React from "react"

interface IButton {
    buttonStyle?: string
    label?: string
    imageSrc?: string | StaticImport;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FunctionComponent<IButton> = ({ buttonStyle, label, onClick, imageSrc }) => {
    return(
        <div className="pt-4">
            <button className={`${buttonStyle}`} onClick={onClick}>{label}</button>
            
        </div>
    )
}

export default Button
import React from "react"

interface ITextInput {
    textLabel?: string
    inputType?: string //can be text, email, password
    placeholder?: string
}

const TextInput: React.FunctionComponent<ITextInput> = ({ textLabel, inputType, placeholder }) => {
    return(
        <div className="form-control">
            <label className="label">
                <span className="label-text font-bold text-black">{textLabel}</span>
            </label>
            <input type={inputType} placeholder={placeholder} className="input input-bordered bg-light-grey border-black" required />
        </div>
    )
}

export default TextInput
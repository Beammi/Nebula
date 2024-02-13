import React from "react"

interface ITextInputWithLabel {
  textLabel?: string
  inputType?: string // Can be text, email, password, etc.
  placeholder?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void // Add onChange event handler
}

const TextInputWithLabel: React.FunctionComponent<ITextInputWithLabel> = ({
  textLabel,
  inputType,
  placeholder,
  onChange,
}) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text font-bold text-black">{textLabel}</span>
      </label>
      <input
        type={inputType}
        placeholder={placeholder}
        className="input input-bordered bg-light-grey border-black"
        onChange={onChange} // Apply the onChange event handler
        // required
      />
    </div>
  )
}

export default TextInputWithLabel

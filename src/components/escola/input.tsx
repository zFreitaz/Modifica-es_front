import React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

function Input({ label, id, ...props }: InputProps) {
  return (
    <div className="inputGroup">
      <label htmlFor={id} className="inputLabel">
        {label}
      </label>

      <input id={id} className="inputField" {...props} />
    </div>
  )
}

export default Input
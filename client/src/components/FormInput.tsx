// src/components/FormInput.tsx
import React from "react";

interface FormInputProps {
  id: string;
  name: string;
  value: string | number; // Accept both string and number
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  placeholder?: string;
  required?: boolean;
  type?: string;
  isTextArea?: boolean; // Optional, for handling textarea inputs
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  type = "text",
  isTextArea = false, // Default to false
}) => (
  <div>
    <label
      htmlFor={id}
      className='block text-sm font-medium text-gray-700 mb-1'
    >
      {name.charAt(0).toUpperCase() + name.slice(1)}:
    </label>
    {isTextArea ? (
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange} // This expects a HTMLTextAreaElement event
        placeholder={placeholder}
        required={required}
        className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
    ) : (
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange} // This expects an HTMLInputElement event
        placeholder={placeholder}
        required={required}
        className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
    )}
  </div>
);

export default FormInput;

// src/components/FormSelect.tsx
import React from "react";

interface FormSelectProps {
  id: string;
  name: string;
  value: string;
  options: string[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const FormSelect: React.FC<FormSelectProps> = ({
  id,
  name,
  value,
  options,
  onChange,
}) => (
  <div>
    <label
      htmlFor={id}
      className='block text-sm font-medium text-gray-700 mb-1'
    >
      {name.charAt(0).toUpperCase() + name.slice(1)}:
    </label>
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange} // This expects an HTMLSelectElement event
      className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
    >
      {options.map((option) => (
        <option
          key={option}
          value={option}
        >
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default FormSelect;

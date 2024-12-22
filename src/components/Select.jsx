import React, { useId } from "react";



const Select = React.forwardRef(function Select(
  { 
    options = [], 
    label, 
    value, 
    onChange, 
    error = "", 
    className = "", 
    labelClassName = "", 
    containerClassName = "", 
    ...props 
  },
  ref
) {
  const id = useId();

  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium text-gray-700 ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <select
        id={id}
        ref={ref}
        value={value}
        onChange={onChange}
        className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
          error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300"
        } ${className}`}
        {...props}
      >
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
});




export default Select;

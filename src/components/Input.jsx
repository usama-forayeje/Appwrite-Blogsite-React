import React from "react";
import { useId } from "react";
import PropTypes from "prop-types";

const Input = React.forwardRef(function Input(
  { 
    label, 
    type = "text", 
    className = "", 
    error = "", 
    labelClassName = "", 
    containerClassName = "", 
    ...props 
  },
  ref
) {
  const inputId = useId();

  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label
          htmlFor={inputId}
          className={`inline-block pl-1 mb-1 text-sm font-medium text-gray-700 ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        ref={ref}
        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 ${
          error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300"
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
});
Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string,
  labelClassName: PropTypes.string,
  containerClassName: PropTypes.string,
};

export default Input;

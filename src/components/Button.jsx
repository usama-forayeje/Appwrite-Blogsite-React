import PropTypes from 'prop-types';

function Button({
    children,
    type = "button",
    bgColor = "bg-blue",
    textColor = "text-white",
    className = "",
    ...props
  }) {
    return (
      <button
        type={type}
        className={`px-4 py-2 rounded-md ${bgColor} ${textColor} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
  Button.propTypes = {
    children: PropTypes.node,
    type: PropTypes.string,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
    className: PropTypes.string,
  };
  
  export default Button;
  
  
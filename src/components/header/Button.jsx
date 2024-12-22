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
  
  export default Button;
  
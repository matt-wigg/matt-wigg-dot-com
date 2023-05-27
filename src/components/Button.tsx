import React, { ButtonHTMLAttributes } from 'react';
import PropTypes from 'prop-types';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`
        // Layout
        flex 
        items-center 
        justify-start 
        px-4 
        py-2 

        // Colors
        bg-white 
        hover:text-yellow-400 
        hover:bg-gray-100 
        focus:ring-yellow-400 

        // Border
        border 
        border-gray-700 
        rounded-md 

        // Interaction
        focus:outline-none 
        focus:ring-1 

        // Dark mode
        dark:bg-zinc-950 
        dark:hover:bg-zinc-900 

        ${className}
      `}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;

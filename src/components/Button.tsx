// components/Button.tsx

import React from 'react';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={`group bg-white dark:bg-zinc-950 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-md px-4 py-2 border border-gray-200 dark:border-gray-700 flex items-center justify-start focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:focus:ring-yellow-400 ${props.className}`}
    >
      {children}
    </button>
  );
};

export default Button;

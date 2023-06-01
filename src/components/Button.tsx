import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = '', disabled = false, ...props }, ref) => {
    const baseClasses =
      'flex items-center justify-start px-4 py-2 bg-white border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-400 dark:bg-zinc-950';
    const enabledClasses =
      'hover:border-yellow-400 hover:bg-gray-100 dark:hover:bg-zinc-900';
    const disabledClasses = 'opacity-50 cursor-not-allowed';

    const classes = `${baseClasses} ${
      disabled ? disabledClasses : enabledClasses
    } ${className}`;

    return (
      <button {...props} disabled={disabled} className={classes} ref={ref}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;

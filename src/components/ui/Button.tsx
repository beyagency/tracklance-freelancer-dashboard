import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      iconLeft,
      iconRight,
      fullWidth,
      loading,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      primary:
        'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 border-transparent',
      secondary:
        'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500 border-gray-100',
      outline:
        'bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500 border-gray-300',
      ghost:
        'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500 border-transparent',
      danger:
        'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border-transparent',
    };

    const sizeClasses = {
      sm: 'text-xs px-2.5 py-1.5',
      md: 'text-sm px-4 py-2',
      lg: 'text-base px-5 py-2.5',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-md border shadow-sm transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && 'w-full',
          (loading || disabled) && 'opacity-70 cursor-not-allowed',
          className
        )}
        disabled={loading || disabled}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {iconLeft && !loading && <span className="mr-2">{iconLeft}</span>}
        {children}
        {iconRight && <span className="ml-2">{iconRight}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
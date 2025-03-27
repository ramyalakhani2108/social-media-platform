import React, { forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`
          w-full
          min-h-[60px]
          px-3
          py-2
          text-sm
          border
          border-gray-300
          rounded-md
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          ${className}
        `}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

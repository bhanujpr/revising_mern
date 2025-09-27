import  React,{ forwardRef } from "react";
// import  ReactElement from "react";

interface CustomInputProps {
  placeholder: string;
  type: string;
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ type, placeholder }, ref): React.ReactElement => {
    return (
      <div>
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
        />
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

import { FieldInputProps, FormikHandlers } from "formik";
import React from "react";

const TextAreaInput = ({
  id,
  name,
  value,
  handleChange,
  error,
  errorText,
  label,
  isRequired,
}: {
  id: string;
  name: string;
  value: any;
  handleChange: FieldInputProps<any>["onChange"];
  error: boolean;
  errorText?: string;
  label: string;
  isRequired?: boolean;
}) => {
  return (
    <div>
      <label htmlFor="task_name" className="block text-sm font-medium">
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={id}
        name={name}
        onChange={handleChange}
        value={value}
        className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
      />
      {error && <div className="text-red-500 text-sm">{errorText}</div>}
    </div>
  );
};

export default TextAreaInput;

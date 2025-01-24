"use client";
import React from "react";
import { useClientRouter } from "../hooks/useClientRouter";
import { useFormik } from "formik";
import * as yup from "yup";
import Input from "../Components/Input";
import TextAreaInput from "../Components/TextAreaInput";
const page = () => {
  const router = useClientRouter();
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      task_name: "",
      task_description: "",
    },
    validationSchema: yup.object().shape({
      task_name: yup.string().required("Task name is required"),
      task_description: yup.string(),
    }),
    onSubmit: () => {},
  });
  return (
    <div className="mx-auto container max-md:px-5 py-5 space-y-10">
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold">Create Task</div>
        <button
          onClick={() => {
            router.back();
          }}
          className="border border-blue-500 px-6 py-2 text-blue-500 rounded-lg font-semibold"
        >
          Back
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Input
            id="task_name"
            name="task_name"
            error={errors.task_name && touched.task_name ? true : false}
            errorText={errors.task_name}
            value={values.task_name}
            handleChange={handleChange}
            type="text"
            label="Task Name"
            isRequired
          />
        </div>

        <div>
          <TextAreaInput
            id="task_description"
            name="task_description"
            error={
              errors.task_description && touched.task_description ? true : false
            }
            errorText={errors.task_description}
            value={values.task_description}
            handleChange={handleChange}
            label="Task Name"
          />
        </div>

        <div className="flex items-center gap-5">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => {
              router.back();
            }}
            className="w-full border border-blue-500 text-blue-500 px-6 py-2 rounded-lg font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;

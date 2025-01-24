"use client";
import React, { useEffect, useState } from "react";
import { useClientRouter } from "../hooks/useClientRouter";
import { useFormik } from "formik";
import * as yup from "yup";
import Input from "../Components/Input";
import TextAreaInput from "../Components/TextAreaInput";
import { createTaskAPI, getTaskByIdAPI, updateTaskAPI } from "../API";
import { useSearchParams } from "next/navigation";
const page = () => {
  let ignore = false;
  const [loading, setLoading] = useState(false);
  const router = useClientRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("id");
  const { values, errors, touched, setValues, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        task_name: "",
        task_description: "",
      },
      validationSchema: yup.object().shape({
        task_name: yup.string().required("Task name is required"),
        task_description: yup.string(),
      }),
      onSubmit: () => {
        updateTask();
      },
    });
  const updateTask = async () => {
    if (taskId) {
      setLoading(true);
      await fetch(updateTaskAPI, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, id: parseInt(taskId) }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            router.push("/");
          } else {
            alert(data.message);
          }
          setLoading(false);
        });
    }
  };
  const getTaskById = async () => {
    if (taskId) {
      setLoading(true);
      await fetch(getTaskByIdAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: parseInt(taskId) }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            setValues({
              ...values,
              task_description: data.data.task_description,
              task_name: data.data.task_name,
            });
          } else {
            alert(data.message);
          }
          setLoading(false);
        });
    }
  };
  useEffect(() => {
    if (!ignore) {
      taskId ? getTaskById() : router.push("/");
    }

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="mx-auto container max-md:px-5 py-5 space-y-10">
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold">Update Task</div>
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
            Edit
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

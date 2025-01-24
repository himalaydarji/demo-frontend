"use client";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import React from "react";
import { useClientRouter } from "./hooks/useClientRouter";

const Home = () => {
  const router = useClientRouter();
  return (
    <div className="mx-auto container max-md:px-5 py-5 space-y-10">
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold">Task Page</div>
        <button
          onClick={() => {
            router.push("/create-task");
          }}
          className="bg-blue-500 px-6 py-2 text-white rounded-lg font-semibold"
        >
          + Create Task
        </button>
      </div>
      <div className="overflow-x-auto font-[sans-serif]">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-700 whitespace-nowrap">
            <tr>
              <th className="p-4 text-left text-sm font-medium text-white">
                Task Name
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Description
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Completed / Not Completed
              </th>
              <th className="p-4 text-left text-sm font-medium text-white">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="whitespace-nowrap">
            <tr className="even:bg-blue-50">
              <td className="p-4 text-sm">test</td>
              <td className="p-4 text-sm">test</td>
              <td className="p-4 text-sm">
                <input type="checkbox" />
              </td>
              <td className="p-4">
                <button className="mr-4">
                  <IconEdit className="h-5 w-5 text-blue-500" />
                </button>
                <button className="mr-4">
                  <IconTrash className="h-5 w-5 text-red-500" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;

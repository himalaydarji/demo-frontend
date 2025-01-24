"use client";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useClientRouter } from "./hooks/useClientRouter";
import { getTaskAPI, updateTaskAPI } from "./API";
interface taskType {
  id: number;
  task_name: string;
  task_description: string;
  is_completed: boolean;
}
const Home = () => {
  const router = useClientRouter();
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<taskType[]>([]);
  let ignore = false;
  const getAllTasks = async () => {
    setLoading(true);
    await fetch(getTaskAPI, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setTasks(data.data);
        } else {
          alert(data.message);
        }
        setLoading(false);
      });
  };
  useEffect(() => {
    if (!ignore) {
      getAllTasks();
    }

    return () => {
      ignore = true;
    };
  }, []);
  const handleTaskStatusUpdate = async (id: number, value: boolean) => {
    await fetch(updateTaskAPI, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_completed: !value, id: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          getAllTasks();
        } else {
          alert(data.message);
        }
        setLoading(false);
      });
  };
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
            {tasks.length > 0 ? (
              tasks.map((task, ind) => (
                <tr key={ind} className="even:bg-blue-50">
                  <td className="p-4 text-sm">{task.task_name}</td>
                  <td className="p-4 text-sm">
                    {task.task_description ? task.task_description : "-"}
                  </td>
                  <td className="p-4 text-sm">
                    <input
                      type="checkbox"
                      checked={task.is_completed}
                      onChange={() => {
                        handleTaskStatusUpdate(task.id, task.is_completed);
                      }}
                    />
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => {
                        router.push(`/edit-task?id=${task.id}`);
                      }}
                      className="mr-4"
                    >
                      <IconEdit className="h-5 w-5 text-blue-500" />
                    </button>
                    <button className="mr-4">
                      <IconTrash className="h-5 w-5 text-red-500" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>
                  <div className="flex justify-center capitalize mt-5">
                    No tasks found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;

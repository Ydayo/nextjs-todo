"use client";

import { deleteTodo, editTodo } from "@/api";
import { Task } from "@/types";
import React, { useEffect, useRef, useState } from "react";

interface TaskProps {
  task: Task;
}

const Todo = ({ task }: TaskProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskTitle, setEditedTaskTitle] = useState(task.text);

  useEffect(() => {
    if (isEditing) {
      ref.current?.focus();
    }
  }, [isEditing]);

  const handleEdit = async () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    await editTodo(task.id, editedTaskTitle);
    if (editedTaskTitle === "") return;
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteTodo(task.id);
  };

  return (
    <li
      key={task.id}
      className="flex justify-between p-4 bg-white border-l-4 border-blue-500 rounded shadow"
    >
      {isEditing ? (
        <input
          ref={ref}
          type="text"
          className="mr-2 py-1 px-2 rounded border-gray-400 border outline-none"
          value={editedTaskTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEditedTaskTitle(e.target.value)
          }
        />
      ) : (
        <span>{task.text}</span>
      )}

      <div>
        {isEditing ? (
          <button
            className="text-blue-500 mr-3 hover:text-blue-400 duration-200"
            onClick={handleSave}
          >
            Save
          </button>
        ) : (
          <button
            className="text-green-500 mr-3 hover:text-green-400 duration-200"
            onClick={handleEdit}
          >
            Edit
          </button>
        )}
        <button
          className="text-red-500 hover:text-red-400 duration-200"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Todo;

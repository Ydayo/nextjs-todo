import { Task } from "@/types";
import React from "react";
import Todo from "./Todo";
interface TodoListProps {
  tasks: Task[];
}

const TodoList = ({ tasks }: TodoListProps) => {
  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <Todo key={task.id} task={task} />
      ))}
    </ul>
  );
};

export default TodoList;

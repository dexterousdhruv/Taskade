import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { useSelector } from "react-redux";
import getTaskStatus from "../helpers/getTaskStatus";

const TaskList = ({ category }) => {
  const taskData = useSelector((state) => state.tasks.tasks);
  const [tasks, setTasks] = useState(taskData);
  const searchTerm = useSelector((state) => state.search.searchTerm);

  useEffect(() => {
    setTasks(
      taskData.filter((item) => {
        if (searchTerm !== "") {
          return item.title.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return item;
      })
    );
  }, [taskData, searchTerm]);

  return (
    <ul className="flex h-fit flex-wrap gap-7 overflow-auto ">
      {tasks
        .filter((item) => {
          if (!category) return item;
          return getTaskStatus(item) === category;
        })
        .map((item, idx) => {
          return <TaskCard key={idx} {...item} />;
        })}
    </ul>
  );
};

export default TaskList;

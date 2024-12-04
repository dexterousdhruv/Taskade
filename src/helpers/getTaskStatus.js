import dayjs from "dayjs";

const getTaskStatus = (task) => {
  const now = dayjs()
  
  if (task.isCompleted) {
    return "completed";
  }

  if (dayjs(task.dueDate).isBefore(now, "day")) {
    return "overdue"
  }
    
  return "pending"
}

export default getTaskStatus
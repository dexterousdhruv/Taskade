import dayjs from "dayjs"

const taskData = [
  {
    id: 1,
    title: "Task 1",
    description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus aut quibusdam iure odio, beatae ratione dicta at ducimus, saepe voluptatum excepturi. Voluptates eum laboriosam velit.
    This task is pending.   
    `,
    dueDate: dayjs().add(2, "day").toISOString(),
    isCompleted: false
  },
  {
    id: 2,
    title: "Task 2",
    description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus aut quibusdam iure odio, beatae ratione dicta at ducimus, saepe voluptatum excepturi. Voluptates eum laboriosam velit.
    This task is completed.    
    `,
    dueDate: dayjs().subtract(1, "day").toISOString(),
    isCompleted: true
  },
  {
    id: 3,
    title: "Task 3",
    description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus aut quibusdam iure odio, beatae ratione dicta at ducimus, saepe voluptatum excepturi. Voluptates eum laboriosam velit.
    This task is overdue.  
    `,
    dueDate: dayjs().subtract(3, "day").toISOString(),
    isCompleted: false
  },
  {
    id: 4,
    title: " Database Customization",
    description: `Customizing Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia eius doloribus explicabo incidunt harum asperiores, provident dolorum in, voluptates sed quasi voluptas laudantium libero, accusantium minus a veritatis qui iure.`,
    dueDate: dayjs(new Date()).subtract(1, "day").toISOString(),
    isCompleted: false
  },
]

export default taskData

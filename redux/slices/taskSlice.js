import { createSlice } from "@reduxjs/toolkit";
import taskData from "../../data/taskData";

const initialState = {
  tasks: taskData
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload)
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(item => item.id !== action.payload.id)
    },
    markAsComplete: (state, action) => {
      state.tasks = state.tasks.map(item => {
        if (item.id === action.payload.id)
          item.isCompleted = 'true'

        return item
      })
    },
    updateTask: (state, action) => {
      state.tasks = state.tasks.map(item => {
        const { payload: { id, title, dueDate, description, isCompleted } } = action
        
        if (item.id === id) {
          item.title = title
          item.description = description
          item.dueDate = dueDate
          if(isCompleted !== undefined )
          item.isCompleted = isCompleted
        }

        return item
      })
    }
    
  }
})

const taskReducer = taskSlice.reducer

export default taskReducer
export const { addTask, deleteTask, markAsComplete, updateTask } = taskSlice.actions
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  tab: "Dashboard"
}

const sidebarTabSlice = createSlice({
  name: 'sidebarTab',
  initialState,
  reducers: {
    setSidebarTab: (state, action) => {
      state.tab = action.payload
    },
  }
})

const sidebarTabReducer = sidebarTabSlice.reducer 

export default sidebarTabReducer
export const { setSidebarTab } = sidebarTabSlice.actions
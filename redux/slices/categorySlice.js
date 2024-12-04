import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  category: "All"
}

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload
    },
  }
})

const categoryReducer = categorySlice.reducer 

export default categoryReducer
export const { setCategory } = categorySlice.actions
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  searchTerm: ""
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
  }
})

const searchReducer = searchSlice.reducer 

export default searchReducer
export const { setSearchTerm } = searchSlice.actions
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'

// Define a type for the slice state
export interface PostState {
  category: string
}

// Define the initial state using that type
const initialState: PostState = {
  category: ''
}

export const postSlice = createSlice({
  name: 'post',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload
    }
  }
})

export const { setCategory } = postSlice.actions

export const postReducer = postSlice.reducer



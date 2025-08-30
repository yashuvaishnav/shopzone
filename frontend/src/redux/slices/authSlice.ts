import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  user: null | { id: string; email: string }
}

const initialState: AuthState = {
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer

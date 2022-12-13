import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: 0,
  email: '',
  introduction: '',
  nick: '',
  state: '',
  thumbnail: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id
      state.email = action.payload.email
      state.introduction = action.payload.introduction
      state.nick = action.payload.nick
      state.state = action.payload.state
      state.thumbnail = action.payload.thumbnail
    },
    removeUser: (state) => {
      state.id = 0
      state.email = ''
      state.introduction = ''
      state.nick = ''
      state.state = ''
      state.thumbnail = ''
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post_id: "",
};

let post_id = createSlice({
  name: "post_id",
  initialState,
  reducers: {
    setPostId: (state, action) => {
      state.post_id = action.payload;
    },
  },
});

export let { setPostId } = post_id.actions;
export default post_id.reducer;

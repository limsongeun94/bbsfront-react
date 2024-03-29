import { configureStore } from "@reduxjs/toolkit";
import userReducer1 from "./user";
import userReducer2 from "./regi_user";

export const store = configureStore({
  reducer: {
    user: userReducer1,
    regi_user: userReducer2,
  },
});

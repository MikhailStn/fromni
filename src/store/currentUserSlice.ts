import { createSlice } from "@reduxjs/toolkit";

const currentUserSlice = createSlice({
  name: "current-user",
  initialState: {
    currentUser: {
      email: "",
    },
    isAuth: false,
  },
  reducers: {
    changeCurrentUser(state, action) {
      state.currentUser = action.payload;
      state.isAuth = true;
    },
    logOut(state) {
      (state.currentUser = {
        email: "",
      }),
        (state.isAuth = false);
    },
  },
});

export default currentUserSlice.reducer;
export const { changeCurrentUser, logOut } = currentUserSlice.actions;

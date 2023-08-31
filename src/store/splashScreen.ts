import { createSlice } from "@reduxjs/toolkit";

const splashSlice = createSlice({
  name: "splash",
  initialState: {
    className: "splash-screen-container",
  },
  reducers: {
    showSplash(state) {
      state.className = "splash-screen-container splash-screen-container_active";
    },
    hideSplash(state) {
      state.className = "splash-screen-container";
    },
  },
});

export default splashSlice.reducer;
export const { showSplash, hideSplash } = splashSlice.actions;

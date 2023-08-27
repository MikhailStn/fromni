import { createSlice } from "@reduxjs/toolkit";

const headerSlice = createSlice({
  name: "headerNav",
  initialState: {
    classNameProfile: "header__nav_link header__nav_link_active",
    classNameChannels: "header__nav_link",
  },
  reducers: {
    setActiveProfile(state) {
      state.classNameProfile = "header__nav_link header__nav_link_active";
      state.classNameChannels = "header__nav_link";
    },
    setActiveChannels(state) {
      state.classNameChannels = "header__nav_link header__nav_link_active";
      state.classNameProfile = "header__nav_link";
    },
  },
});

export default headerSlice.reducer;
export const { setActiveProfile, setActiveChannels } = headerSlice.actions;

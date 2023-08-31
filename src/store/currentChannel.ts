import { createSlice } from "@reduxjs/toolkit";

const channelSlice = createSlice({
  name: "current-channel",
  initialState: {
    id: "vk",
  },
  reducers: {
    setChannel(state, action) {
      state.id = action.payload;
    },
  },
});

export default channelSlice.reducer;
export const { setChannel } = channelSlice.actions;

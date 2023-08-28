import { createSlice } from "@reduxjs/toolkit";

const currentUserSlice = createSlice({
  name: "current-user",
  initialState: {
    currentUser: {
      email: "",
      channels: [
        {
          name: "vk",
          isActive: false,
          message: "",
          keyboard: "",
          quickButtons: [],
          urlButtons: [],
        },
        {
          name: "telegram",
          isActive: false,
          message: "",
          keyboard: "",
          quickButtons: [],
          urlButtons: [],
        },
        {
          name: "whatsapp",
          isActive: false,
          message: "",
          keyboard: "",
          quickButtons: [],
          urlButtons: [],
        },
        {
          name: "sms",
          isActive: false,
          message: "",
        },
      ],
    },
    isAuth: false,
  },
  reducers: {
    changeCurrentUser(state, action) {
      state.currentUser = action.payload;
      state.isAuth = true;
    },
    changeMessage(state, action) {
      state.currentUser.channels[action.payload.index].message = action.payload.message;
    },
    logOut(state) {
      (state.currentUser = {
        email: "",
        channels: [
          {
            name: "vk",
            isActive: false,
            message: "",
            keyboard: "",
            quickButtons: [],
            urlButtons: [],
          },
          {
            name: "telegram",
            isActive: false,
            message: "",
            keyboard: "",
            quickButtons: [],
            urlButtons: [],
          },
          {
            name: "whatsapp",
            isActive: false,
            message: "",
            keyboard: "",
            quickButtons: [],
            urlButtons: [],
          },
          {
            name: "sms",
            isActive: false,
            message: "",
          },
        ],
      }),
        (state.isAuth = false);
    },
  },
});

export default currentUserSlice.reducer;
export const { changeCurrentUser, logOut, changeMessage } = currentUserSlice.actions;

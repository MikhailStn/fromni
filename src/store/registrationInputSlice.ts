import { createSlice } from "@reduxjs/toolkit";

const registrationInputsSlice = createSlice({
  name: "reg-inputs",
  initialState: {
    entryEmail: "",
    entryPassword: "",
    regEmail: "",
    regPassword: "",
    regConfPassword: "",
  },
  reducers: {
    changeEntryEmail(state, action) {
      state.entryEmail = action.payload;
    },
    changeEntryPassword(state, action) {
      state.entryPassword = action.payload;
    },
    changeRegEmail(state, action) {
      state.regEmail = action.payload;
    },
    changeRegPassword(state, action) {
      state.regPassword = action.payload;
    },
    changeRegConfPassword(state, action) {
      state.regConfPassword = action.payload;
    },
  },
});

export default registrationInputsSlice.reducer;
export const { changeEntryEmail, changeEntryPassword, changeRegEmail, changeRegPassword, changeRegConfPassword } =
  registrationInputsSlice.actions;

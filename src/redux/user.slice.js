import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
  },
  reducers: {
    setAccount: (state, action) => {
      state.currentUser = action.payload;
    },
    clearAccount: (state) => {
      state.currentUser = null;
      localStorage.removeItem("token");
    },
  },
});
const userReducer = userSlice.reducer;
export const { setAccount, clearAccount } = userSlice.actions;
export default userReducer;

import { createSlice } from "@reduxjs/toolkit";

const rsslice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    getUSer: (state, action) => {
      return action.payload;
    },
    addUser: (state, action) => {
      state.push(action.payload);
    },
    updateUser: (state, action) => {
      const updatedUser = action.payload;
      const userIndex = state.findIndex((user) => user.id === updatedUser.id);
      if (userIndex !== -1) {
        state[userIndex] = updatedUser;
      }
    },
    deleteUser: (state, action) => {
      const userId = action.payload?.user.id;
      return state.filter((user) => user.id !== userId);
    },
  },
});

export const { getUSer, addUser, updateUser, deleteUser } = rsslice.actions;
export default rsslice.reducer;

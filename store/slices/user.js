import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myTreeData: null,
  memory: null,
  accessedTrees: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMyTreeData: (state, action) => {
      state.myTreeData = action.payload;
    },
    setMemory: (state, action) => {
      state.memory = action.payload;
    },
    setAccessedTrees: (state, action) => {
      state.accessedTrees = action.payload;
    },
  },
});

export const { setMyTreeData, setMemory, setAccessedTrees } = userSlice.actions;

export default userSlice.reducer;
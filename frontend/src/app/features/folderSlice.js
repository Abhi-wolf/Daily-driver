import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  fileToOpen: "",
};

export const folderSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    updateFolderData: (state, action) => {
      state.data = action.payload;
    },
    openFile: (state, action) => {
      state.fileToOpen = action.payload;
    },
  },
});

export const { updateFolderData, openFile } = folderSlice.actions;
export default folderSlice.reducer;

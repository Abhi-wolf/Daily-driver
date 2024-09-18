import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  userEmail: "",
  profilePic: "",
  userFileFolder: {},
  fileToOpen: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userName = action.payload.name;
      state.userEmail = action.payload.email;
      state.profilePic = action.payload.profilePic;
      state.userFileFolder = action.payload.userFileFolder;
    },
    removeUser: (state) => {
      state.userEmail = "";
      state.userName = "";
      state.profilePic = "";
      state.userFileFolder = "";
    },

    updateFolderData: (state, action) => {
      state.userFileFolder = action.payload;
    },
    openFile: (state, action) => {
      state.fileToOpen = action.payload;
    },
  },
});

export const { setUser, removeUser, updateFolderData, openFile } =
  userSlice.actions;
export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
};

export const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addNewEvent: (state, action) => {
      state.events.push(action.payload);
    },

    updateEvent: (state, action) => {
      let event = state.events.find((event) => event.id === action.payload.id);

      event = action.payload;

      state.events = [...state.events, event];
    },
  },
});

export const { addNewEvent, updateEvent } = eventSlice.actions;
export default eventSlice.reducer;

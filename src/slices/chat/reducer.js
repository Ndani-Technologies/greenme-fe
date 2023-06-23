import { createSlice } from "@reduxjs/toolkit";
import {
  getDirectContact,
  getChannels,
  getMessages,
  deleteMessage,
} from "./thunk";

export const initialState = {
  chats: [],
  messages: [],
  channels: [],
  error: {},
  chosenChatDetails: null,
  onlineUsers: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChosenChatDetails(state, action) {
      state.chosenChatDetails = action.payload;
      state.loading = false;
      state.errorMsg = false;
    },
    setMessages(state, action) {
      state.messages = action.payload;
      state.loading = false;
      state.errorMsg = false;
    },
    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
      state.loading = false;
      state.errorMsg = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDirectContact.fulfilled, (state, action) => {
      state.chats = action.payload;
    });
    builder.addCase(getDirectContact.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(getChannels.fulfilled, (state, action) => {
      state.channels = action.payload;
    });
    builder.addCase(getChannels.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
    });
    builder.addCase(getMessages.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
    builder.addCase(deleteMessage.fulfilled, (state, action) => {
      state.messages = (state.messages || []).filter((message) => {
        console.log("meessage ", message);
        message?.id.toString() !== action.payload.toString();
      });
    });
    builder.addCase(deleteMessage.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
  },
});

export const { setChosenChatDetails, setMessages, setOnlineUsers } =
  chatSlice.actions;

export default chatSlice.reducer;

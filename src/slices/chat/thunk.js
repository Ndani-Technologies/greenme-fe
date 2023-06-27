import { createAsyncThunk } from "@reduxjs/toolkit";

//Include Both Helper File with needed methods
import {
  // getDirectContact as getDirectContactApi,
  getMessages as getMessagesApi,
  getChannels as getChannelsApi,
  addMessage as addMessageApi,
  deleteMessage as deleteMessageApi,
} from "../../helpers/fakebackend_helper";
import axios from "axios";

import { setChosenChatDetails, setMessages, setOnlineUsers } from "./reducer";

export const getDirectContact = createAsyncThunk(
  "chat/getDirectContact",
  async (id) => {
    try {
      // const response = getDirectContactApi();
      // return response;
      const response = await axios.get(
        // `http://localhost:5002/api/v1/auth/chat/get-all-conversation/${id}`
        `${process.env.REACT_APP_USER_URL}chat/get-all-conversation/${id}`
      );
      if (!response?.success) {
        throw new Error("Something Went Wrong While Getting Conversations");
      }
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getChannels = createAsyncThunk("chat/getChannels", async () => {
  try {
    const response = getChannelsApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const getMessages = createAsyncThunk(
  "chat/getMessages",
  async ({ receiver = "", author = "", conversationId = "" }) => {
    try {
      // const response = getMessagesApi(roomId);
      // const data = await response;
      // return data;
      const response = await axios.get(
        // `http://localhost:5002/api/v1/chat/get-conversation?author=${author}&receiver=${receiver}&conversationId=${conversationId}`
        `${process.env.REACT_APP_USER_URL}chat/get-conversation?author=${author}&receiver=${receiver}&conversationId=${conversationId}`
      );
      if (!response?.success) {
        throw new Error("Something Went Wrong While Getting Conversations");
      }
      return response.messages;
    } catch (error) {
      return error;
    }
  }
);

export const addMessage = (messages) => (dispatch) => {
  dispatch(setMessages(messages));
};

export const deleteMessage = createAsyncThunk(
  "chat/deleteMessage",
  async (message) => {
    try {
      const response = deleteMessageApi(message);
      const data = await response;
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const storeChosenChatDetails = (user) => (dispatch) => {
  dispatch(setChosenChatDetails(user));
};

export const storeOnlineUsers = (users) => (dispatch) => {
  dispatch(setOnlineUsers(users));
};

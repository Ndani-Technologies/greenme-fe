import { io } from "socket.io-client";
import { store } from "../index";
import { storeOnlineUsers, addMessage } from "../slices/thunks";
import { updateDirectChatHistoryIfActive } from "./updateDirectChatHistoryIfActive";
let socket = null;
const user = JSON.parse(sessionStorage.getItem("authUser"));

export const connectionWithSocketServer = (userDetails) => {
  const jwtToken = userDetails?._id;
  socket = io("https://backend.greenme.fleetforum.org", {
    path: "/webSocket",
    auth: {
      token: jwtToken,
    },
    // transports:['websocket'],
  });

  socket.on("connect", () => {
    console.log("User Connected");
    // let sockets = store?.getState()?.auth?.sockets;
    // if (socket.id) {
    // //   sockets.push(socket.id);
    // }
    // store.dispatch(addSocket(sockets));
  });

  socket.on("disconnect", () => {});

  socket.on("online-users", (data) => {
    const { onlineUsers } = data;
    store.dispatch(storeOnlineUsers(onlineUsers));
  });

  socket.on("seen-message-response", (data) => {
    debugger;
    let existingMessages = [...store?.getState()?.Chat?.messages];

    console.log({ existingMessages, key: 0 });

    const message = data;

    if (
      message &&
      existingMessages?.length &&
      message?.author?._id === user._id
    ) {
      const conversationIndex = existingMessages.findIndex(
        (item) => item?.uuid == message?.uuid
      );

      if (conversationIndex > -1) {
        existingMessages[conversationIndex] = message;

        existingMessages = existingMessages.map((el) => {
          return { ...el, read: true };
        });

        console.log({ key: 1, existingMessages });

        store.dispatch(addMessage(existingMessages));
      }
    }
  });

  socket.on("direct-chat-history", (data) => {
    updateDirectChatHistoryIfActive(
      data
      // window.location.pathname === "/collaborationChat" ? true : false
    );
  });

  //   socket.on("direct-conversations", (data) => {
  //     store.dispatch(setConversations(data?.conversations));
  //   });
};

export const sendDirectMessage = (data) => {
  socket.emit("direct-message", data);
};

// export const getDirectChatHistory = (data) => {
//   socket.emit("direct-chat-history", data);
// };

// export const getDirectConversationHistory = (data) => {
//   socket.emit("direct-conversations", data);
// };

// export const updateChatFriendsUreadMessageCount = (data) => {
//   socket.emit("update-read-count", data);
// };

export const setSeenMessage = (data) => {
  if (data) {
    console.log({ data });
    socket?.emit("get-seen-message", data);
  }
};

export const socketServer = () => {
  return socket;
};

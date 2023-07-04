import { store } from "../index";
import {
  addMessage,
  // setConversations
} from "../slices/thunks";

import {
  setSeenMessage,
  //   updateChatFriendsUreadMessageCount,
} from "./socketConnection";

export const updateDirectChatHistoryIfActive = (data, chatBox) => {
  const { participants, message, conversation, isActive } = data;
  const user = JSON.parse(sessionStorage.getItem("authUser"));

  const chosenChatDetails = store?.getState()?.Chat?.chosenChatDetails;

  const receiverId = store?.getState()?.Chat?.chosenChatDetails?.receiver;

  const userId = user?._id;

  if (receiverId && userId) {
    const usersInConversation = [receiverId, userId];

    updateDirectChatHistoryIfSameConversationActive({
      participants,
      usersInConversation,
      messages: message,
      receiverId: receiverId,
      chosenChatDetails,
      isActive,
      conversation,
      userId,
      chatBox,
    });
  }
};

const updateDirectChatHistoryIfSameConversationActive = ({
  participants,
  usersInConversation,
  messages,
  receiverId,
  chosenChatDetails,
  isActive,
  conversation,
  userId,
  chatBox,
}) => {
  const result = participants.every(function (participantId) {
    return usersInConversation.includes(participantId);
  });

  if (result) {
    let existingMessages = [...store?.getState()?.Chat?.messages];

    if (userId == messages?.receiver._id) {
      existingMessages = [...existingMessages, messages];
      setSeenMessage({
        conversationId: conversation?.id,
        user: userId,
        receiver: messages?.author?._id,
        message: messages,
      });
    } else {
      const conversationIndex = existingMessages.findIndex(
        (item) => item?.uuid == messages?.uuid
      );

      if (conversationIndex > -1) {
        existingMessages[conversationIndex] = messages;
      }
    }

    store.dispatch(addMessage(existingMessages));

    // updateChatFriendsUreadMessageCount({

    //   role: chosenChatDetails.role,

    //   user: chosenChatDetails.user,

    //   product: chosenChatDetails?.product,

    //   author: chosenChatDetails?.author,

    //   receiver: chosenChatDetails?.receiver,

    // });

    // updateChatFriendsUreadMessageCount({receiverId,storeId})
  }
  //   else if (chatBox) {
  //     debugger;

  //     let existingConversation = [...store?.getState()?.Chat?.conversations];

  //     const convIndex = existingConversation?.findIndex(
  //       (el) => el?.product?._id == conversation?.product?._id
  //     );

  //     if (convIndex > -1) {
  //       let conv = existingConversation[convIndex];

  //       existingConversation.splice(convIndex, 1);

  //       conv.unreadCount = conversation.unreadCount;

  //       existingConversation = [conv, ...existingConversation];
  //     } else {
  //       existingConversation = [conversation, ...existingConversation];
  //     }

  //     store.dispatch(setConversations(existingConversation));
  //   }
};

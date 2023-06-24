import React, { useState, createContext, useEffect } from "react";
import {
  connectionWithSocketServer,
  socketServer,
} from "../realtimeCommunication/socketConnection";

const context = {};

export const SocketContext = createContext(context);

export function SocketContextProvider(props) {
  const user = JSON.parse(sessionStorage.getItem("authUser"));

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        connectionWithSocketServer(user);
      }, 1000);
    }
    return () => {
      if (socketServer()) {
        socketServer().off("connect");
        socketServer().off("disconnect");
        socketServer().off();
      }
    };
  }, [user]);

  return <SocketContext.Provider>{props.children}</SocketContext.Provider>;
}

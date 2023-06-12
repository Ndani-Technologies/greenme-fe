/* eslint-disable react/prop-types */
// src/context/state.js
import { createContext, useContext, useState, useMemo } from "react";

const LeaderBoardContext = createContext({});

export function LeaderBoardProvider({ children }) {
  const [isCompareBtnDisable, setIsCompareBtnDisable] = useState(true);

  const sharedState = useMemo(
    () => ({
      isCompareBtnDisable,
      setIsCompareBtnDisable,
    }),
    [isCompareBtnDisable]
  );

  return (
    <LeaderBoardContext.Provider value={sharedState}>
      {children}
    </LeaderBoardContext.Provider>
  );
}

export function useLeaderBoardContext() {
  return useContext(LeaderBoardContext);
}

import React, { useState } from "react";
import { useDispatch } from "react-redux";

//constants
import { layoutModeTypes } from "../../Components/constants/layout";
import { leftSidebarTypes } from "../../Components/constants/layout";
import { changeSidebarTheme } from "../../slices/thunks";

const LightDark = ({ layoutMode, onChangeLayoutMode }) => {
  const dispatch = useDispatch();
  const mode =
    layoutMode === layoutModeTypes["DARKMODE"]
      ? layoutModeTypes["LIGHTMODE"]
      : layoutModeTypes["DARKMODE"];

  return (
    <div className="ms-1 header-item d-none d-sm-flex">
      <button
        data-testid="darkButton"
        onClick={() => {
          onChangeLayoutMode(mode);
          dispatch(
            changeSidebarTheme(
              leftSidebarTypes[mode === "dark" ? "DARK" : "LIGHT"]
            )
          );
        }}
        type="button"
        className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle light-dark-mode"
      >
        <i className="bx bx-moon fs-22"></i>
      </button>
    </div>
  );
};

export default LightDark;

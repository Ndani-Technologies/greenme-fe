import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { useDispatch } from "react-redux";
import LightDark from "../LightDark";
import { layoutModeTypes } from "../../constants/layout";
import { leftSidebarTypes } from "../../constants/layout";
import { changeSidebarTheme } from "../../../slices/thunks";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("../../../slices/thunks", () => ({
  changeSidebarTheme: jest.fn(),
}));

describe("LightDark", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("clicking the button toggles the layout mode and dispatches the changeSidebarTheme action", () => {
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);
    const onChangeLayoutModeMock = jest.fn();
    const layoutMode = layoutModeTypes.LIGHTMODE;
    const { getByTestId } = render(
      <LightDark
        layoutMode={layoutMode}
        onChangeLayoutMode={onChangeLayoutModeMock}
      />
    );

    fireEvent.click(getByTestId("darkButton"));

    expect(onChangeLayoutModeMock).toHaveBeenCalledTimes(1);
    expect(onChangeLayoutModeMock).toHaveBeenCalledWith(
      layoutModeTypes.DARKMODE
    );
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(
      changeSidebarTheme(leftSidebarTypes.DARK)
    );
  });
});

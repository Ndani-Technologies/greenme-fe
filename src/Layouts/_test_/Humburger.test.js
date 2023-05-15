import React from "react";
import { useDispatch } from "react-redux";
import Header from "../Header";

describe("Header", () => {
  test("should call toggleMenuBtn on click", () => {
    const toggleMenuBtnMock = jest.fn();
    const ref = {
      current: {
        clientWidth: 1024,
      },
    };
    jest.spyOn(React, "useRef").mockReturnValue(ref);
    const { getByTestId } = render(
      <Header toggleMenuBtn={toggleMenuBtnMock} />
    );
    const menuButton = getByTestId("menuButton");

    fireEvent.click(menuButton);

    expect(toggleMenuBtnMock).toHaveBeenCalled();
  });
});

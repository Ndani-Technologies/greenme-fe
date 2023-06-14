import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../../../slices/index";

import Login from "../Login";

describe("Login component", () => {
  let store;
  let history;

  beforeEach(() => {
    // Create a Redux store with the rootReducer
    store = configureStore({
      reducer: rootReducer,
    });
  });

  it("should route to the profile page on login", async () => {
    // Render the Login component wrapped in a Router and Provider
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/login"]}>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const loginButton = screen.getByTestId("loginButton");
    fireEvent.click(loginButton);
    screen.findByText("Change Cover");
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import useEvent from "@testing-library/user-event";

import Input from "./Input";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("It's a Input component", () => {
  it("Input component renders", () => {
    render(<Input />);
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import useEvent from "@testing-library/user-event";

import ExtraInfo from "./ExtraInfo";

const props = {
  exchange: "NASDAQ",
  change: "0",
  change_percent: "0",
  dividend: "0",
  last_trade_time: String(new Date()),
};

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

describe("It's a ExtraInfo component", () => {
  const setShown = jest.fn();

  it("ExtraInfo component renders", () => {
    render(
      <ExtraInfo
        props={props}
        _yield={"0"}
        isShown={false}
        setShown={setShown}
      />
    );

    expect(screen.getByText(/Exchange:NASDAQ/i)).toBeInTheDocument();
  });

  it("Function in ExtraInfo works correctly", () => {
    render(
      <ExtraInfo
        props={props}
        _yield={"0"}
        isShown={false}
        setShown={setShown}
      />
    );

    useEvent.click(screen.getByRole("button"));

    expect(setShown).toHaveBeenCalledTimes(1);
  });
});

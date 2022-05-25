import React from "react";
import { render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import useEvent from "@testing-library/user-event";

import Ticker from "./Ticker";

const ticker = {
  ticker: "AAPL",
  exchange: "NASDAQ",
  price: "246.55",
  change: "51.28",
  change_percent: "0.48",
  dividend: "0.32",
  yield: "1.34",
  last_trade_time: "2022-05-23T06:28:36.000Z",
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

describe("It's a Ticker component", () => {
  const f = jest.fn();
  const deleteF = jest.fn();
  it("Ticker component renders", () => {
    render(<Ticker ticker={ticker} clickHandler={f} deleteHandler={deleteF} />);

    expect(screen.getByText(/AAPL/)).toBeInTheDocument();
  });

  it("Ticker component renders without props", () => {
    render(<Ticker />);

    expect(screen.queryByText(/AAPL/)).toBeNull();
  });

  it("Correct difference and percent", () => {
    const { container, rerender } = render(
      <Ticker ticker={ticker} clickHandler={f} deleteHandler={deleteF} />
    );

    const prevPrice = 246.55;
    expect(screen.getByText(`Price: ${prevPrice}`)).toBeInTheDocument();

    const currentPrice = 250;
    rerender(<Ticker ticker={{ ...ticker, price: `${currentPrice}` }} />);

    const delta = currentPrice - prevPrice;
    expect(container.getElementsByClassName("delta")[0].innerHTML).toBe(
      `Change: ${delta.toFixed(2)}`
    );

    expect(container.getElementsByClassName("percent")[0].innerHTML).toBe(
      `Percent: ${((100 * delta) / prevPrice).toFixed(2)} %`
    );
  });

  it("hideHandler works correctly", () => {
    render(<Ticker ticker={ticker} hideHandler={f} deleteHandler={deleteF} />);

    useEvent.click(screen.getAllByRole("button")[0]);

    expect(f).toHaveBeenCalledTimes(1);
  });

  it("deleteHandler works correctly", () => {
    render(<Ticker ticker={ticker} clickHandler={f} deleteHandler={deleteF} />);

    useEvent.click(screen.getAllByRole("button")[1]);

    expect(deleteF).toHaveBeenCalledTimes(1);
  });

  it("Style for increasing price works", () => {
    const { container, rerender } = render(
      <Ticker ticker={ticker} clickHandler={f} deleteHandler={deleteF} />
    );

    const currentPrice = 250;
    rerender(<Ticker ticker={{ ...ticker, price: `${currentPrice}` }} />);

    expect(container.getElementsByClassName("delta")[0]).toHaveClass("green");
  });

  it("Style for decreasing price works", () => {
    const { container, rerender } = render(
      <Ticker ticker={ticker} clickHandler={f} deleteHandler={deleteF} />
    );

    const currentPrice = 230;
    rerender(<Ticker ticker={{ ...ticker, price: `${currentPrice}` }} />);

    expect(container.getElementsByClassName("delta")[0]).toHaveClass("red");
  });

  it("Ticker snapshot", () => {
    const renderedTicker = render(
      <Ticker ticker={ticker} clickHandler={f} deleteHandler={deleteF} />
    );

    expect(renderedTicker).toMatchSnapshot();
  });
});

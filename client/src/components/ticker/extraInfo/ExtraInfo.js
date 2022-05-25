import React from "react";

//css
import "./style.css";

const noop = () => {};

const ExtraInfo = ({
  props,
  _yield = "0",
  isShown = false,
  setShown = noop,
}) => {
  const {
    exchange = "NASDAQ",
    change = "0",
    change_percent = "0",
    dividend = "0",
    last_trade_time = String(new Date()),
  } = props;

  return (
    <React.Fragment>
      <li className="isShown">
        <button
          onClick={() => {
            setShown((prev) => !prev);
          }}
        >
          {isShown ? String.fromCharCode(10134) : String.fromCharCode(10010)}
        </button>
      </li>
      <li className={`info${isShown ? " shown" : " hidden"}`}>
        <ul>
          <li>
            Exchange:
            <br />
            {exchange}
          </li>
          <li>
            Change:
            <br />
            {change}
          </li>
          <li>
            Change percent:
            <br />
            {change_percent}
          </li>
          <li>
            Divedend:
            <br />
            {dividend}
          </li>
          <li>
            Yield:
            <br />
            {_yield}
          </li>
          <li>
            Last trade time:
            <br />
            {last_trade_time}
          </li>
        </ul>
      </li>
    </React.Fragment>
  );
};

export default ExtraInfo;

import React, { useState } from "react";

import "./style.css";

const Input = ({ socket }) => {
  const [interval, setInterval] = useState(5000);

  const clickHandler = () => {
    if (interval < 4) {
      socket.emit("change interval", 4);
    } else if (interval > 100000) {
      socket.emit("change interval", 100000);
    } else {
      socket.emit("change interval", interval);
    }
  };

  const inputHandler = (event) => {
    setInterval(event.target.value);
  };

  return (
    <React.Fragment>
      <label htmlFor="interval">Set interval</label>
      <div className="interval">
        <input
          type="number"
          name="interval"
          id="interval"
          className="intervalInput"
          placeholder="write a number between 4-100000"
          min={4}
          max={100000}
          value={interval}
          onChange={inputHandler}
        />
        <button
          onClick={clickHandler}
          className="intervalButton"
          disabled={interval < 4 || interval > 100000}
        >
          change time
        </button>
      </div>
    </React.Fragment>
  );
};

export default Input;

import React, { useState } from "react";

//css
import "./style.css";

const AddTicker = ({ socket }) => {
  const [name, setName] = useState("");

  const clickHandler = () => {
    socket.emit("add a ticker", name);
  };

  const inputHandler = (event) => {
    setName(event.target.value);
  };

  return (
    <React.Fragment>
      <label htmlFor="ticker">Add a new ticker</label>
      <div className="add">
        <input
          type="text"
          name="ticker"
          id="ticker"
          className="addInput"
          placeholder="write a ticker name"
          value={name}
          onChange={inputHandler}
        />
        <button
          onClick={clickHandler}
          className="addButton"
          disabled={name.length === 0}
        >
          add a ticker
        </button>
      </div>
    </React.Fragment>
  );
};

export default AddTicker;

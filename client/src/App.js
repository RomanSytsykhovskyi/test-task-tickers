import React from "react";
import { useDispatch, useSelector } from "react-redux";

//actions for dispatch
import {
  addHiddenTicker,
  Hide,
  showAll,
  Loading,
} from "./store/priceTickerReducer";

//custom hooks
import { useSocket } from "./hooks/useSocket";

//async action
import { fetchTickers } from "./asyncActions/tickers";

//css
import "./App.css";

//components
import Ticker from "./components/ticker/Ticker.js";
import Input from "./components/input/Input";
import AddTicker from "./components/addTicker/AddTicker";

function App() {
  const { socket } = useSocket();

  const dispatch = useDispatch();
  const pending = useSelector((state) => state.pending);
  const tickers = useSelector((state) => state.tickers);

  const hiddenTickers = useSelector((state) => state.hiddenTickers);

  const hideHandler = (ticker) => {
    dispatch(addHiddenTicker(ticker));
    dispatch(Hide());
  };

  const deleteHandler = (ticker) => {
    socket.emit("delete ticker", ticker);
  };

  const show = () => {
    dispatch(Loading());
    dispatch(showAll());
    //dispatch(noLoading());
    dispatch(fetchTickers());
  };

  return (
    <div className="wrapper">
      <button
        className="showAll"
        onClick={show}
        disabled={pending || hiddenTickers.length === 0}
      >
        show all tickers
      </button>
      <ul>
        {pending ? (
          <li>Loading...</li>
        ) : (
          tickers.map((ticker, id) => (
            <Ticker
              key={id}
              ticker={ticker}
              hideHandler={(name) => hideHandler(name)}
              deleteHandler={(name) => deleteHandler(name)}
            />
          ))
        )}
      </ul>
      <Input socket={socket} />
      <AddTicker socket={socket} />
    </div>
  );
}

export default App;

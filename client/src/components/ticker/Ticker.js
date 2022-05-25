import React, { useRef, useEffect, useMemo, useState } from "react";
import ExtraInfo from "./extraInfo/ExtraInfo";

//css
import "./style.css";

//imgs
//import crossOut from "./img/cross-out.png";

const noop = () => {};

const Ticker = ({ ticker = {}, hideHandler = noop, deleteHandler = noop }) => {
  const currentPrice = useMemo(() => Number(ticker.price), [ticker.price]);
  const prevPrice = useRef(0);

  const delta = useMemo(
    () => Number(currentPrice) - Number(prevPrice.current),
    [currentPrice]
  );
  const greenOrRed = delta >= 0 ? " green" : " red";

  const percent = useMemo(() => (100 * delta) / prevPrice.current, [delta]);

  const [isShown, setShown] = useState(false);

  useEffect(() => {
    prevPrice.current = currentPrice;
  });

  if (Object.is(ticker, {})) return null;

  return (
    <React.Fragment>
      <ul className="ticker">
        <li>
          <ul className="finance">
            <li>{ticker.ticker}: </li>
            <li className="price">Price: {currentPrice}</li>
            <li className={`delta${greenOrRed}`}>Change: {delta.toFixed(2)}</li>
            <li className={`percent${greenOrRed}`}>
              Percent: {`${percent.toFixed(2)} %`}
            </li>
            <li className="visibity">
              <button
                onClick={() => {
                  setShown(false);
                  hideHandler(ticker.ticker);
                }}
              >
                hide
              </button>
              <button
                onClick={() => {
                  setShown(false);
                  deleteHandler(ticker.ticker);
                }}
              >
                &#10008;
              </button>
            </li>
          </ul>
        </li>
        <ExtraInfo
          props={ticker}
          _yield={ticker.yield}
          isShown={isShown}
          setShown={setShown}
        />
      </ul>
    </React.Fragment>
  );
};

export default Ticker;

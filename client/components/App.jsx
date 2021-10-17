import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { fetchTickers, removeTicker, updatePrice } from "../ducks/tickers.js";

import AddTicker from "./AddTicker";

const App = (props) => {
  const [selected, setSelected] = useState(null);
  const [newPrice, setNewPrice] = useState(null);
  const tickerState = useSelector((r) => r.tickers);

  const tickers = tickerState.tickers;
  const loading = tickerState.loading;

  useEffect(() => props.dispatch(fetchTickers()), []);

  function deleteTicker(id) {
    props.dispatch(removeTicker(id));
  }

  function submitNewPrice(e) {
    if (e.keyCode !== 13) return;
    props.dispatch(updatePrice(selected, newPrice));
    setSelected(null);
    setNewPrice(null);
  }

  function renderTickerPrice(ticker) {
    var price;
    if (selected == ticker.id) {
      price = (
        <>
          <input
            className="topcoat-text-input"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            onKeyUp={submitNewPrice}
            focused="true"
          ></input>
        </>
      );
    } else {
      price = (Math.round(ticker.price * 100) / 100).toFixed(2);
    }
    return (
      <>
        $
        <span
          onClick={() => {
            if (selected && newPrice) {
              props.dispatch(updatePrice(selected, newPrice));
            }
            setSelected(ticker.id);
            setNewPrice(ticker.price);
          }}
        >
          {price}
        </span>
      </>
    );
  }

  return (
    <div className="app-container">
      <div className="topcoat-navigation-bar">
        <div className="topcoat-navigation-bar__item center full">
          <h1 className="topcoat-navigation-bar__title">Full-Stack Redo</h1>
        </div>
      </div>
      <div className="topcoat-list">
        <h3 className="topcoat-list__header">Tickers</h3>
        <ul className="topcoat-list__container">
          {!loading &&
            tickers.map((ticker) => (
              <li
                className="topcoat-list__item ticker flex justify-between"
                key={ticker.id}
              >
                <span
                  style={{
                    fontSize: "1.8em",
                    lineHeight: "1.8em",
                    paddingTop: "0.2em",
                  }}
                >
                  {ticker.ticker} / {renderTickerPrice(ticker)}
                </span>
                <button
                  className="topcoat-icon-button"
                  style={{ paddingTop: "7px" }}
                  onClick={() => deleteTicker(ticker.id)}
                >
                  <svg
                    version="1.1"
                    id="Layer_1"
                    x="0px"
                    y="0px"
                    width="18px"
                    height="18px"
                    viewBox="0 0 42 42"
                    fill="white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M21.002,26.588l10.357,10.604c1.039,1.072,1.715,1.083,2.773,0l2.078-2.128
	c1.018-1.042,1.087-1.726,0-2.839L25.245,21L36.211,9.775c1.027-1.055,1.047-1.767,0-2.84l-2.078-2.127
	c-1.078-1.104-1.744-1.053-2.773,0L21.002,15.412L10.645,4.809c-1.029-1.053-1.695-1.104-2.773,0L5.794,6.936
	c-1.048,1.073-1.029,1.785,0,2.84L16.759,21L5.794,32.225c-1.087,1.113-1.029,1.797,0,2.839l2.077,2.128
	c1.049,1.083,1.725,1.072,2.773,0L21.002,26.588z"
                    />
                  </svg>
                </button>
              </li>
            ))}
        </ul>
      </div>
      <br />
      <AddTicker />
    </div>
  );
};

export default connect()(App);

import React, { useState } from "react";
import { connect } from "react-redux";
import { addTicker } from "../ducks/tickers";


const AddTicker = (props) => {
  const [ticker, setTicker] = useState("");
  
  function handleChange(text) {
    if (text.length <= 5) setTicker(text.toUpperCase());
  }
  
  function submitTicker() {
    props.dispatch(addTicker(ticker));
    setTicker("");
  }

  return (
    <>
      <div className="flex justify-between">
        <div>
          <input
            className="topcoat-text-input--large add"
            placeholder="eg. AAPL"
            value={ticker}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
        <div>
          <button
            className="topcoat-button--large"
            disabled={ticker == ""}
            onClick={submitTicker}
          >
            Add Ticker
          </button>
        </div>
      </div>
    </>
  );
};

export default connect()(AddTicker);

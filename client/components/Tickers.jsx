import React from 'react'
import { connect } from 'react-redux'

import Ticker from './Ticker'

const Tickers = ({ words }) => (
  <div>
    {words.map(word =>
      <Ticker key={word.id}
        {...word}
      />
    )}
  </div>
)

const mapStateToProps = (state) => {
  return {
    words: state.words
  }
}

export default connect(mapStateToProps)(Tickers);

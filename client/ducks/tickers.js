import {
  deleteTicker,
  getTickers,
  postTicker,
  putTicker,
} from "../api/tickers";

const REQUEST = "tickers/request";
const RECEIVE = "tickers/receive";
const ERROR = "tickers/error";
const DELETE = "tickers/delete";

const initialState = {
  loading: true,
  tickers: [],
  error: undefined,
};

export default function tickers(state = initialState, action) {
  switch (action.type) {
    case REQUEST:
      return {
        loading: true,
        tickers: state.tickers,
        error: undefined,
      };
    case RECEIVE:
      return {
        loading: false,
        tickers: action.tickers,
        error: undefined,
      };
    case ERROR:
      return {
        loading: false,
        tickers: [],
        error: action.error,
      };
    case DELETE:
      return {
        loading: false,
        tickers: state.tickers.filter(t => t.id != action.id),
        error: undefined,
      };
    default:
      return state;
  }
}

//Add actions here
function receive(tickers) {
  return {
    type: RECEIVE,
    tickers: tickers,
  };
}

function request() {
  return {
    type: REQUEST,
  };
}

function error(error) {
  return {
    type: ERROR,
    error: error,
  };
}

function remove(id) {
  return {
    type: DELETE,
    id: id,
  };
}

export function fetchTickers() {
  return (dispatch) => {
    dispatch(request());
    getTickers()
      .then((data) => {
        dispatch(receive(data));
      })
      .catch((err) => {
        dispatch(error(err));
      });
  };
}

export function removeTicker(id) {
  return (dispatch) => {
    dispatch(remove(id));
    deleteTicker(id)
      .then((data) => {
        dispatch(receive(data));
      })
      .catch((err) => {
        dispatch(error(err));
      });
  };
}

export function addTicker(id) {
  return (dispatch) => {
    postTicker(id)
      .then((data) => {
        dispatch(receive(data));
      })
      .catch((err) => {
        dispatch(error(err));
      });
  };
}

export function updatePrice(id, price) {
  return (dispatch) => {
    putTicker(id, price)
      .then((data) => {
        dispatch(receive(data));
      })
      .catch((err) => {
        dispatch(error(err));
      });
  };
}
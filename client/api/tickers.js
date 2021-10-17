import request from "superagent";

export function getTickers() {
  return request
    .get("/api/tickers")
    .then((res) => res.body);
}

export function deleteTicker(id) {
  return request
    .delete("/api/tickers/"+id)
    .then((res) => res.body);
}

export function postTicker(ticker) {
  return request
    .post("/api/tickers/"+ticker)
    .then((res) => res.body);
}

export function putTicker(ticker, price) {
  return request.put("/api/tickers/" + ticker+"?price="+price).then((res) => res.body);
}

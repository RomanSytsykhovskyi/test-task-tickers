import { setTickers, noLoading } from "../store/priceTickerReducer";

export const fetchTickers = () => {
  return (dispatch) =>
    fetch("/api")
      .then((response) => response.json())
      .then((json) => {
        dispatch(setTickers(json));
        dispatch(noLoading());
      });
};

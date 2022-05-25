const defaultState = {
  pending: true,
  tickers: [],
  hiddenTickers: [],
};

const SET_TICKERS = "SET_TICKER";
const NO_LOADING = "NO_LOADING";
const ADD_HIDDEN = "ADD_HIDDEN";
const HIDE = "HIDE";
const SHOW_ALL = "SHOW_ALL";
const LOADING = "LOADING";

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_TICKERS:
      return {
        ...state,
        tickers: action.payload.filter(
          (ticker) => !state.hiddenTickers.includes(ticker.ticker)
        ),
      };
    case NO_LOADING:
      return { ...state, pending: false };
    case ADD_HIDDEN:
      return {
        ...state,
        hiddenTickers: [...state.hiddenTickers, action.payload],
      };
    case HIDE:
      return {
        ...state,
        tickers: state.tickers.filter(
          (ticker) => !state.hiddenTickers.includes(ticker.ticker)
        ),
      };
    case SHOW_ALL:
      return {
        ...state,
        hiddenTickers: [],
      };
    case LOADING:
      return { ...state, pending: true };
    default:
      return state;
  }
};

export const setTickers = (quotes) => ({ type: SET_TICKERS, payload: quotes });
export const noLoading = () => ({ type: NO_LOADING });
export const addHiddenTicker = (ticker) => ({
  type: ADD_HIDDEN,
  payload: ticker,
});
export const Hide = () => ({ type: HIDE });
export const showAll = () => ({ type: SHOW_ALL });
export const Loading = () => ({ type: LOADING });

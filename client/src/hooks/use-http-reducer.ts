import { useCallback, useReducer } from "react";

type State = {
  isLoading: boolean;
  error?: string | null;
  data: any;
};

enum ActionType {
  LOADING,
  SUCCESS,
  ERROR,
}

type Action = {
  type: ActionType;
  payload?: any;
};

const httpReducer = (state: State, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionType.LOADING:
      return { ...state, isLoading: true, data: null, error: null };
    case ActionType.SUCCESS:
      return { ...state, isLoading: false, data: payload, error: null };
    case ActionType.ERROR:
      return { ...state, isLoading: false, error: payload };
    default:
      return state;
  }
};

type RequestOptions = {
  endpoint: string; //
  method?: string;
  headers?: any;
  body?: any;
};

type ResponseCallback = (data: any) => {};

const useHttp = () => {
  const [{ data, isLoading, error }, dispatch] = useReducer(httpReducer, {
    isLoading: false,
    error: null,
    data: null,
  });

  // const sendRequest = useCallback(async () => {
  const sendRequest = useCallback(
    async (
      { endpoint, method, headers, body }: RequestOptions,
      callback: ResponseCallback
    ) => {
      dispatch({ type: ActionType.LOADING });
      fetch(`${process.env.REACT_APP_FIREBASE_URL}/${endpoint}.json`, {
        method: method || "GET",
        headers: headers || {},
        body: body ? JSON.stringify(body) : null,
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch({ type: ActionType.SUCCESS, payload: data });
          callback(data);
        })
        .catch((error) => {
          dispatch({
            type: ActionType.ERROR,
            payload: error.message || "Something went wrong",
          });
        });
    },
    []
  );

  return { data, isLoading, error, sendRequest };
};

export default useHttp;

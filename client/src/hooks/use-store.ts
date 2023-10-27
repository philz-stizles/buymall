import { useEffect, useState } from "react";

let globalState = {};
let listeners: React.Dispatch<React.SetStateAction<{}>>[] = [];
let actions: any = {};

export const useStore = (shouldListen = true) => {
  const setState = useState(globalState)[1];

  const dispatch = (actionIdentifier: string, payload: any) => {
    const newState = actions[actionIdentifier](globalState, payload);
    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      listener(globalState);
    }
  };

  useEffect(() => {
    if(shouldListen) {
      listeners.push(setState);
    }

    return () => {
      if(shouldListen) {
        listeners = listeners.filter((listener) => listener !== setState);
      }
    };
  }, [setState, shouldListen]);

  return { globalState, dispatch };
};

export const initStore = (userActions: any, initialState: any) => {
  if(initialState) {
    globalState = { ...globalState, ...initialState}
  }

  actions = { ...actions, ...userActions };
}
import { ChangeEvent, useCallback, useReducer, useState } from "react";
import { Button, Input } from "../../../components/ui";

type InputState = { value: string; error: string | null; isTouched: boolean };

type State = {
  [key: string]: InputState
  name: InputState;
  description: InputState;
};
type Action = {
  type: 'CHANGE' | 'BLUR' | 'RESET';
  payload: { name: string; value: string}
};

const initState = {
  name: { value: '', error: null, isTouched: false },
  description: { value: '', error: null, isTouched: false },
};

const reducer = (state: State, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case "CHANGE":
      return { ...state, [payload.name]: { ...state[payload.name], value: payload.value } };
    case "BLUR":
      return { ...state, [payload.name]: { ...state[payload.name], isTouched: true } };
    case "RESET":
      return {
        ...state,
        [payload.name]: { value: '', error: null, isTouched: false },
      };
    default:
      return state;
  }
};

const AddProduct = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const { name, description } = state
  const [isLoading, setIsLoading] = useState(false)

  const submitHandler = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/v1/products", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({})
      });

      const json = response.json();
      console.log(json);
    } catch (error) {

    } finally {
      setIsLoading(false)
    }
  }, []);

  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    dispatch({ type: "CHANGE", payload: { name, value } });
  }, []);

  return (
    <form onSubmit={submitHandler}>
      <Input label="Name" value={description.value} onChange={changeHandler} />
      <Input label="Name" value={name.value} onChange={changeHandler} />
      <div>
        <Button label="Back" type="submit" outlined />
        <Button label="Save" type="submit" loading={isLoading} />
      </div>
    </form>
  );
};

export default AddProduct;

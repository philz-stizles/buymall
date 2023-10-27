import { useCallback, useState } from "react";

type RequestOptions = {
  endpoint: string; //
  method?: string;
  headers?: any;
  body?: any;
};

type Transformer = (data: any) => {};

// Hooks can return anything, numbers, strings, arrays, objects etc...
// export const useHttp = ({ url, method, headers, body}: RequestOptions, transform: Transformer) => {
export const useHttp = () => {
  // const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | any>(null);

  const sendRequest = useCallback(
    async (
      { endpoint, method, headers, body }: RequestOptions,
      callback: Transformer
    ) => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/${endpoint}.json`,
          {
            method: method || "GET",
            headers: headers || {},
            body: body ? JSON.stringify(body) : null,
          }
        );

        if (!response.ok) {
          throw Error("Request failed. Please try again later.");
        }

        const json = await response.json();
        callback(json.data);
      } catch (error: any) {
        setError(error.message || "Something went wrong");
      }

      setIsLoading(false);
    },
    []
  );

  return { sendRequest, isLoading, error };
};

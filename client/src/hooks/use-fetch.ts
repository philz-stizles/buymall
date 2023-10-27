import { useCallback, useEffect, useState } from "react";

export const useFetch = <T>(initialValue: T, url: string) => {
  const [data, setData] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | any>(null);

  const requestHandler = useCallback(() => {
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.data);
        setData(response.data as T);
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, [url]);

  useEffect(() => {
    setIsLoading(true);
    requestHandler();
  }, [requestHandler]);

  return { data, isLoading, error, reload: requestHandler };
};

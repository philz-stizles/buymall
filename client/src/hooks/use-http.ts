import { useCallback, useEffect, useState } from 'react';

type HttpConfig = {
  method: string;
};

const fetcher = async (url: string, config: HttpConfig) => {
  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || 'Something went wrong. Failed to send request'
    );
  }

  return data;
};

export const useHttp = <T>(
  url: string,
  initialValue: T,
  config: HttpConfig
) => {
  const [data, setData] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | object | null>(null);

  const sendRequest = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetcher(url, config);
      setData(data);
    } catch (error: any) {
      setError(error.message || 'Something went wrong');
    }

    setIsLoading(false);
  }, [config, url]);

  useEffect(() => {
    if (config && config.method === 'GET') {
      sendRequest();
    }
  }, [config, sendRequest]);

  return { data, isLoading, error, mutate: sendRequest, reload: sendRequest };
};

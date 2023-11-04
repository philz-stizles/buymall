import { useCallback, useState } from 'react';
import { baseUrl } from '../utils/api';
import { getToken } from '../utils/auth';

type HttpConfig = {
  method?: 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
};

// Hooks can return anything, numbers, strings, arrays, objects etc...
const useLocalMutation = <T, V>(
  endpoint: string,
  {
    options,
    onSuccess,
    onError,
  }: {
    options?: HttpConfig;
    onSuccess?: (data: V) => void;
    onError?: (data: V) => void;
  }
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const mutate = useCallback(
    async (body: T) => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`${baseUrl}${endpoint}`, {
          method: options && options.method ? options.method : 'POST',
          headers: options?.headers || {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
          },
          body: body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
          throw Error('Request failed. Please try again later.');
        }

        const json = await response.json();
        onSuccess && onSuccess(json.data);
      } catch (error: any) {
        setError(error.message || 'Something went wrong');
        onError && onError(error);
      }

      setIsLoading(false);
    },
    [endpoint, onError, onSuccess, options]
  );

  return { mutate, isLoading, error };
};

export default useLocalMutation;

 

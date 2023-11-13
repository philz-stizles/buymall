import { baseUrl } from './../utils/constants';
import { useCallback, useEffect, useState } from 'react';
import { getToken } from '../utils/auth';

const useLocalQuery = <T>(endpoint: string | null, initialValue: T) => {
  const [data, setData] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | any>(null);

  const sendQuery = useCallback(async (endpoint?: string) => {
    try {
      setIsLoading((prevState) => (prevState ? prevState : true));
      const response = await fetch(`${baseUrl}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error('Could not fetch data');
      }
      const data = await response.json();
      if (data && data.status) {
        setData(data.data as T);
      }
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    endpoint && sendQuery(endpoint);
  }, [endpoint, sendQuery]);

  return { data, isLoading, error, reload: sendQuery };
};

export default useLocalQuery;

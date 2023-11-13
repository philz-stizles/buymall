import { useEffect, useState } from 'react';

export const useDebounce = (
  searchValue: string,
  milliSeconds: number = 1500
) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    timeout = setTimeout(() => {
     // if(searchValue) {
      setValue(searchValue);
    //  }
    }, milliSeconds);

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [milliSeconds, searchValue]);

  return value;
};

import {useEffect, useState} from 'react';

export default function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value); // Update this line
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-run effect if value or delay changes

  return debouncedValue;
}

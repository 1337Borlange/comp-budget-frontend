import { useState } from 'react';

/**
 * Custom hook for managing a value in local storage.
 *
 * @template T - The type of the value to be stored in local storage.
 * @param {string} key - The key used to store the value in local storage.
 * @param {T} initialValue - The initial value to be used if the value doesn't exist in local storage.
 * @returns {[T, (value: T) => void]} - A tuple containing the current value and a function to update the value.
 */
export const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  // Get the current value from local storage, or use the initial value if it doesn't exist
  const [value, setStoredValue] = useState<T>(() => {
    if (typeof window !== 'undefined') {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error(error);
        return initialValue;
      }
    }
  });

  // Store the new value in local storage when it changes
  const setValue = (value: T) => {
    if (typeof window !== 'undefined') {
      try {
        setStoredValue(value);
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return [value, setValue];
};

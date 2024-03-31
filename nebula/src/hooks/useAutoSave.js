//hooks/useAutoSave.js
import { useEffect } from 'react';

const useAutosave = (value, key) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, 1000);

    return () => clearTimeout(timer);
  }, [value, key]);
};

export default useAutosave;

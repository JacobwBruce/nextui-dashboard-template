import { useState, useEffect } from "react";

export default function useCache<T>(initialValue: T, key: string) {
  const [value, setValue] = useState<T>(
    JSON.parse(localStorage.getItem(key) ?? "null") ?? initialValue,
  );

  useEffect(() => {
    const cachedValue = localStorage.getItem(key);
    if (cachedValue) setValue(JSON.parse(cachedValue));
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  const reset = () => {
    setValue(initialValue);
    localStorage.removeItem(key);
  };

  return [value, setValue, reset] as const;
}

import { useState, useEffect } from "react";


/**
 * Хук задержки изменения значения. Полученное значение возвращается, если на вход не подававлось новое значение в течении указанной задержки.
 * @param {*} value - переданное значение
 * @param {*} delay - задержка
 * @returns {*} - значение, которое не изменялось в течении delay
 */
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
  
      return () => {
        clearTimeout(handler);
      };
    }, [value]);
  
    return debouncedValue;
}

export default useDebounce;
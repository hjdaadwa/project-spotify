import { useCallback, useState } from "react";


/**
 * Хук переключателя значений
 * @param {boolean} [initialState=false] - начальное значение 
 * @returns {Object[]} - state - текущее состояние. toggle - функция коллбэк изменения состояния.
 */
function useToggle(initialState = false) {
    const [state, setState] = useState(initialState);

    const toggle = useCallback(() => setState(state => !state), []);

    return [state, toggle]
}

export default useToggle;
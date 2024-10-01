import { useState, useEffect, useRef } from 'react';

const useDebounce = (value: string, delay: number, onDebounce: Function) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const debounceRef = useRef(onDebounce);

    // Update the debounce callback
    useEffect(() => {
        debounceRef.current = onDebounce;
    }, [onDebounce]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
            if (debounceRef.current) {
                debounceRef.current(value);
            }
        }, delay);

        // Cleanup on value or delay change
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;

import { ChangeEvent, useState } from "react";

export const useInput = <T>(initialState: T) => {
    const [inputValue, setInputValue] = useState<T>(initialState);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void => {
        const { name, value } = event.target;
        setInputValue({ ...inputValue, [name]: value });
    };

    return { inputValue, setInputValue, handleInputChange };
};

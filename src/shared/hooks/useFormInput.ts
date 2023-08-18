import { ChangeEvent, useState } from 'react';

export const useFormInput = ({ initialValue }: { initialValue: string } = { initialValue: '' }) => {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState(false)
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setError(true);
        setValue(event.target.value);
    }
    return { onChange, value, setValue, error, setError }
}
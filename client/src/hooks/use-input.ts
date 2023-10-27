import { ChangeEvent, useCallback, useState } from "react"

export const useInput = (validate: (value: string) => boolean) => {
    const [value, setValue] = useState('')
    const [isTouched, setIsTouched] = useState(false);
    const isValid = validate(value)
    const hasError = !isValid && isTouched;

    const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value)
    }, [])

    const blurHandler = useCallback(() => {
        setIsTouched(true)
    }, []);

    const reset = useCallback(() => {
        setValue('');
        setIsTouched(false)
    }, []);

    return { value, isValid, hasError, changeHandler, blurHandler, reset }
}
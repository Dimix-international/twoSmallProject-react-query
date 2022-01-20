import {useState} from "react";
import {useApp} from "./hook-app";


type SnakeType = {
    severity: 'error' | 'warning' | 'info' | 'success'
    title: string
}
export const useCustomSnack = () => {
    const {appDispatch} = useApp();
    const [values, setValues] = useState<SnakeType>({
        title: '',
        severity: 'error'
    })

    return {
        title: values.title,
        severity: values.severity,
        setValues,
    }
}
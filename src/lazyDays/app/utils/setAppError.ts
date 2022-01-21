import {AppDispatchType} from "../../../context/app-context";


export const setErrorApp = (error: unknown, appDispatch: AppDispatchType) => {
    const title =
        error instanceof Error //если ошибка относится к ошибкам JS
            ? error.toString().replace(/^Error:\s*/, '') //уберем слово Error:
            : 'error connection to the server';
    appDispatch({
        type: 'set-error',
        payload: {error: title, severity: 'error'}
    })
}
import {QueryClient} from "react-query";
import {useApp} from "../../lazyDays/app/hooksApp/hook-app";


/*export const queryErrorHandler = (error: unknown) => {
    const {appDispatch} = useApp();
    const title =
        error instanceof Error //если ошибка относится к ошибкам JS
            ? error.toString().replace(/^Error:\s*!/, '') //уберем слово Error:
            : 'error connection to the server';
    console.log(title, 'useTreatment');
    appDispatch({type: 'set-error', payload: {error:title, severity:'error'}})
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            onError: queryErrorHandler
        }
    }
});*/


export const queryClient = new QueryClient();

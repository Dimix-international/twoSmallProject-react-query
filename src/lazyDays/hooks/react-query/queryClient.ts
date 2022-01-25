import {QueryClient} from "react-query";
import {useApp} from "../../app/hooksApp/hook-app";
import {AppStateType} from "../../../providers/app-provider";


export const QueryErrorHandler = (error: unknown) => {
    const {appDispatch} = useApp();
    const title =
        error instanceof Error //если ошибка относится к ошибкам JS
            ? error.toString().replace(/^Error:\s*/, '') //уберем слово Error:
            : 'error connection to the server';
    appDispatch({type: 'set-error', payload: {error:title, severity:'error'} as AppStateType})
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            onError: QueryErrorHandler,
            staleTime: 600000, //10 min - время которое данные хранятся в кэше
            cacheTime: 900000, //15 min, по умлоч 5 min, должно быть не меньше чем staleTime - время за которое данные устаревают
            refetchOnMount:false,//не будете refetch при монтировании компоненты, где вызывается useTreatments
            refetchOnWindowFocus: false,//не будете refetch если убрали фокус с страницы
            refetchOnReconnect:false,//не будете refetch если нету ответа от сервера (нету интернета)
        },
        mutations: {
            onError:QueryErrorHandler,
        }
    }
});

//для тестов вынесим отдельно
export const defaultQueryClientOptions = {
    queries: {
        onError: QueryErrorHandler,
        staleTime: 600000, // 10 minutes
        cacheTime: 900000, // default cacheTime is 5 minutes; doesn't make sense for staleTime to exceed cacheTime
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    },
    mutations: {
        onError: QueryErrorHandler,
    },
};

/*export const queryClient = new QueryClient();*/

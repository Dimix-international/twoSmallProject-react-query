import jsonpatch from 'fast-json-patch';

import type {User} from '../../../shared/types'
import {
    axiosInstance,
    getJWTHeader
} from "../../../axiosInstance/axiosInstance";
import {useUser} from './useUser';
import {
    useMutation,
    UseMutateFunction,
    useQueryClient,
    QueryKey
} from "react-query";
import {AppStateType} from "../../../providers/app-provider";
import {useApp} from "../../app/hooksApp/hook-app";
import {QueryKes} from "../../hooks/react-query/queryKeys";

// for when we need a server function
async function patchUserOnServer(
    newData: User | null,
    originalData: User | null,
): Promise<User | null> {
    if (!newData || !originalData) return null;
    // create a patch for the difference between newData and originalData
    const patch = jsonpatch.compare(originalData, newData);
    // send patched data to the server
    const {data} = await axiosInstance.patch(
        `/user/${originalData.id}`,
        {patch},
        {
            // @ts-ignore
            headers: getJWTHeader(originalData),
        },
    );
    return data.user;
}

// TODO: update type to UseMutateFunction type
export const usePatchUser = (): UseMutateFunction<User | null, unknown, User, unknown> => {
    const {user, updateUser} = useUser();
    const snack = useApp();
    const queryClient = useQueryClient();

    // TODO: replace with mutate function
    //обновим кэш используя response mutation
    const {mutate: patchUser} = useMutation(
        //используются те данные что переданы для функции мутации
        (newUserData: User) => patchUserOnServer(newUserData, user),
        {
            // возвращает контекст кторый передается в onError
            onMutate: async (newUserData: User | null) => {
                //1) отеним любой исходящие запросы для user data,
                // чтобы старые данные с сервера не переписали наш optimistic update
                queryClient.cancelQueries(QueryKes.User);
                //2) запомнин предыдущие данные, т.к. mutate функция вернет контекст (данные),
                // для roll back если произойдет ошибка
                //@ts-ignore
                const previousUserData: User = queryClient.getQueriesData(QueryKes.User);
                // 3) произойдет optimistic update нашего кэш с новыми значениями
                if (newUserData) updateUser(newUserData)
                //если бы не было в отдельноый функции
                //queryClient.setQueryData(QueryKes.User, newUserData)

                // 4) возвращаем контекст с предыдущими данными
                return {previousUserData}
            },
            onError: (error, newData, context) => {
                // возвращаем кэш к сохранненным предыдущим данным - rollback
                if (context?.previousUserData) {
                    //снова обновляем user только предыдущими значениями
                    updateUser(context.previousUserData);
                    snack.appDispatch({
                        type: 'set-error',
                        payload: {
                            error: 'Update failed!',
                            severity: 'success',
                        } as AppStateType
                    })
                }
            },

            //onSuccess берет аргумент userData, который вернет функция mutate
            // мы вернем тип User | null .
            // После вызовем функцию updateUser, которая обновит localStorage  и кэш
            onSuccess: (userData: User | null) => {
                if (userData) {
                    // updateUser(userData); - больше не нужно т.к. update в onMutate
                    snack.appDispatch({
                        type: 'set-error',
                        payload: {
                            error: 'You have reserved the appointment!',
                            severity: 'success',
                        } as AppStateType
                    })
                }
            },

            // код который запустится незваисимо был ли onSuccess или onError
            onSettled: () => {
                //сделаем invalidate query - перезапрос за свежими данными - good practice
                queryClient.invalidateQueries(QueryKes.User)
            }
        }
    )
    return patchUser;
}
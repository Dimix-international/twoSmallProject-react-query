import {User} from "../../../shared/types";
import axios, {AxiosResponse} from "axios";
import {axiosInstance} from "../../../axiosInstance/axiosInstance";
import {Endpoints} from "../../../axiosInstance/constant";
import {useState} from "react";
import {
    clearStoredUser,
    getStoredUser,
    setStoredUser
} from "../../user-storage";
import {useQuery, useQueryClient} from "react-query";
import {QueryKes} from "../../hooks/react-query/queryKeys";


interface UseUser {
    user: User;
    updateUser: (user: User) => void;
    clearUser: () => void
}

//optimistic update -обновляем кэш до того как придет ответ от сервера
// Нужно  отменить любые запросы ( refreshes - обновления) которые могут
// выполняться для этого конкретного запроса, что содержат данные для которых
//мы обновляем кэш. Если не отменить запросы на refreshes,
//мы можем переписать наш optimistic update в кэше старыми данными с сервера,
//которые мы получим до выполнения функции  Mutate.
// функция Mutate будет success, после чего произойдет invalidate query
// и запрос refreshes -получения свежих данных с сервера
// если onError, произойдёт roll back кэша ( заберем данные кэша до optimistic update)
// и мы получим прошлый контекст (тип данных) - данные, который были до optimistic update
// и полсе чего тоже произойдет  invalidate query - получение свежих данных с сервера

interface AxiosResponseWithCancel extends AxiosResponse {
    cancel:() => void
}
//теперь будем возвращать не Promise<User | null> а Promise<AxiosResponse | null>
const getUser = async (user: User | null): Promise<AxiosResponseWithCancel | null> => {
    //create a cancel token source - для отмены запроса
    const source = axios.CancelToken.source();

    if (!user) return null;

    /* const {data}: AxiosResponse<{ user: User }> = await axiosInstance.get(
         `${Endpoints.User}/${user.id}`
     )*/
    //return data.user

    // в этом запросе возвращаемые данные могут быть устаревшими, т.к.
    // мы используем optimistic update
    // эта функция должна иметь свойство отмены  refreshes,
    // и поэтому будет возвращаться объект со свойством cancel - функция
    // которая будет отменять запрос refreshes
    const axiosResponse:AxiosResponseWithCancel = await axiosInstance.get(
        `${Endpoints.User}/${user.id}`,{
            cancelToken: source.token //токен связан с запросом. поэтому мы можем его отменить
        }
    )
    axiosResponse.cancel = () => {
        //Отмена запроса, когда optimistic update process
        source.cancel();
    }
    return axiosResponse
}

export const useUser = () => {

    const [user, setUser] = useState<User | null>(getStoredUser());
    const queryClient = useQueryClient();

    // call useQuery to update user data from server
    useQuery(QueryKes.User, () => getUser(user), {
        enabled: !!user, //если user нету (null) то запроса не будет
        //если user есть то после запроса в случае  успеха setUser(data)

        /*onSuccess: (data) => setUser(data)*/
        onSuccess: (axiosResponse) => setUser(axiosResponse?.data.user)
    })

    // meant to be called from useAuth
    function updateUser(newUser: User): void {
        // set user in state
        setUser(newUser);

        // update user in localstorage
        setStoredUser(newUser);
        // TODO: pre-populate user profile in React Query client
        //после обновления на локал storage нового user, необходимо обновить
        // данные в кэше, чтобы в итоге произошла перерисовка компоненты
        //Этот метод не делает запрос на сервер, а просто обновляет кэш по ключу
        queryClient.setQueryData(QueryKes.User, newUser)
    }

    // meant to be called from useAuth
    function clearUser() {
        // update state
        setUser(null);

        // remove from localstorage
        clearStoredUser();

        // TODO: reset user to null in query client
        queryClient.setQueryData(QueryKes.User, null);
        //удаляем запрос из кеша
        /*queryClient.removeQueries(QueryKes.UserAppointments)*/
        // заменяем чтобы при мутации произошло removeQueries , prefix user?.id
        // не пишем т.к. user равен null
        queryClient.removeQueries([QueryKes.Appointments, QueryKes.User])
    }

    return {
        user,
        updateUser,
        clearUser,
    }

}


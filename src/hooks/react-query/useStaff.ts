import {Staff} from "../../shared/types";
import {axiosInstance} from "../../axiosInstance/axiosInstance";
import {Endpoints} from "../../axiosInstance/constant";
import {useApp} from "../../lazyDays/app/hooksApp/hook-app";
import {useQuery} from "react-query";
import {QueryKes} from "./queryKeys";
import {useFilter} from "../commonHooks/useFilter";
import {useState} from "react";
import {useSearchParams} from "react-router-dom";

export const getStaff = async (): Promise<Staff []> => {
    const response = await axiosInstance(Endpoints.Staff);
    return response.data
}

export const useStaff = () => {
    const {appDispatch} = useApp();
    const {data = []} = useQuery(QueryKes.Staff, getStaff, {
        onError: (error) => {
            const title =
                error instanceof Error //если ошибка относится к ошибкам JS
                    ? error.toString().replace(/^Error:\s*/, '') //уберем слово Error:
                    : 'error connection to the server';

            appDispatch({
                type: 'set-error',
                payload: {error: title, severity: 'error'}
            })
        }
    });

    //фильтрация treatments
    const [searchParams, setSearchParams] = useSearchParams();
    const staffQuery = searchParams.get('filterStaff') || 'all';

    const [filter, setFilter] = useState(staffQuery);
    const {availableItems} = useFilter({items: data, filterProp: filter});

    const setFilterHandler = (value:string) =>{
        setFilter(value);
        setSearchParams({...Object.entries(searchParams), filterStaff: value});
    }

    return {
        data: availableItems,
        filter,
        setFilter:setFilterHandler,
    }
}


const useSetSearchParams = (search: string) =>{
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get(search) || '';

    const setSearchParamsHandler = (value:string) =>{
        setSearchParams({...Object.entries(searchParams), search: value});
    }

    return {
        query,
        setSearchParamsHandler,
    }
}
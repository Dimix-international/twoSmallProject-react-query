import {Staff} from "../../shared/types";
import {axiosInstance} from "../../axiosInstance/axiosInstance";
import {Endpoints} from "../../axiosInstance/constant";
import {useApp} from "../../lazyDays/app/hooksApp/hook-app";
import {useQuery} from "react-query";
import {QueryKes} from "./queryKeys";
import {useFilter} from "../commonHooks/useFilter";
import {useCallback, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {setErrorApp} from "../../lazyDays/app/utils/setAppError";
import {filterByTreatment} from "../../lazyDays/staff/utils";

export const getStaff = async (): Promise<Staff []> => {
    const response = await axiosInstance(Endpoints.Staff);
    return response.data
}

export const useStaff = () => {
    //фильтрация treatments
    const [searchParams, setSearchParams] = useSearchParams();
    const staffQuery = searchParams.get('filterStaff') || 'all';

    const [filter, setFilter] = useState(staffQuery);
    const {appDispatch} = useApp();

    const selectFn = useCallback((data) => filterByTreatment(data, filter), [filter])

    const {data = []} = useQuery(QueryKes.Staff, getStaff, {
        select: filter === 'all' ? undefined : selectFn,
        onError: (error) => setErrorApp(error, appDispatch)
    });

    // const {availableItems} = useFilter({items: data, filterProp: filter});

    const setFilterHandler = (value: string) => {
        setFilter(value);
        setSearchParams({...Object.entries(searchParams), filterStaff: value});
    }

    return {
        // data: availableItems,
        data,
        filter,
        setFilter: setFilterHandler,
    }
}

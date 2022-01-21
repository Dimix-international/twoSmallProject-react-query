import {Treatment} from "../../../shared/types";
import {axiosInstance} from "../../../axiosInstance/axiosInstance";
import {Endpoints} from "../../../axiosInstance/constant";
import {useQuery, useQueryClient} from "react-query";
import {QueryKes} from "./queryKeys";
import {useApp} from "../../app/hooksApp/hook-app";
import {Dispatch} from "react";
import {AppDispatchType} from "../../../context/app-context";
import {setErrorApp} from "../../app/utils/setAppError";

/*export const getTreatments = async (): Promise<Treatment[]> => new Promise<Treatment[]>((resolve, reject) => {
    axiosInstance.get(Endpoints.Treatments)
        .then((response: AxiosResponse<Treatment[]>) => resolve(response.data))
        .catch((error: AxiosError<string>) => reject(error))
})*/

/*
export const getTreatments = async (): Promise<Treatment[]>  => {
    try{
        const response = await axiosInstance.get(Endpoints.Treatments)
        return  response.data
    } catch (e) {
        return (e as AxiosError).response?.data
    }
}*/

export const getTreatments = async (): Promise<Treatment[]> => {
    const response = await axiosInstance.get(Endpoints.Treatments)
    return response.data
}

export const useTreatments = (): Treatment[] => {
    const {appDispatch} = useApp();

    const {data = []} = useQuery(QueryKes.Treatments, getTreatments, {
        onError: (error) => setErrorApp(error, appDispatch) //индивидуальная обработка ошибки
    });
    return data
}

export const usePrefetchTreatments = (): void => {
    const queryClient = useQueryClient();
    queryClient.prefetchQuery(QueryKes.Treatments, getTreatments)
}



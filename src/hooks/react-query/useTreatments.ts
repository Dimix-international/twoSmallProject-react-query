import {Treatment} from "../../shared/types";
import {axiosInstance} from "../../axiosInstance/axiosInstance";
import {Endpoints} from "../../axiosInstance/constant";
import {useQuery} from "react-query";
import {QueryKes} from "./queryKeys";
import {AxiosError, AxiosResponse} from "axios";

export const getTreatments = async (): Promise<Treatment[]> => new Promise<Treatment[]>((resolve, reject) => {
    axiosInstance.get(Endpoints.Treatments)
        .then((response: AxiosResponse<Treatment[]>) => resolve(response.data))
        .catch((error: AxiosError<string>) => reject(error))
})

/*
export const getTreatments = async (): Promise<Treatment[]>  => {
    try{
        const response = await axiosInstance.get(Endpoints.Treatments)
        return  response.data
    } catch (e) {
        return (e as AxiosError).response?.data
    }
}*/

export const useTreatments = (): Treatment[] | undefined => {
    const {data} = useQuery(QueryKes.Treatments,getTreatments);
    return data
}
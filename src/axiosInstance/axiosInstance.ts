import axios, {AxiosRequestConfig} from "axios";
import {baseUrl} from "./constant";
import {User} from "../shared/types";

const config:AxiosRequestConfig = {
    baseURL: baseUrl
}

interface jwtHeader {
    Authorization?: string;
}

export function getJWTHeader(user: User): jwtHeader {
    return { Authorization: `Bearer ${user.token}` };
}

export const axiosInstance = axios.create(config)
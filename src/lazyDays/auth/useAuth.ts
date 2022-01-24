import axios, { AxiosResponse } from 'axios';

import { User } from "../../shared/types";
import { axiosInstance } from "../../axiosInstance/axiosInstance";
import { useUser } from "../user/hooks/useUser";
import {useApp} from "../app/hooksApp/hook-app";
import {AppStateType} from "../../providers/app-provider";

interface UseAuth {
    signin: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string) => Promise<void>;
    signout: () => void;
}

type UserResponse = { user: User };
type ErrorResponse = { message: string };
type AuthResponseType = UserResponse | ErrorResponse;

export function useAuth(): UseAuth {
    const SERVER_ERROR = 'There was an error contacting the server.';
    const snack = useApp();
    const { clearUser, updateUser } = useUser();

    async function authServerCall(
        urlEndpoint: string,
        email: string,
        password: string,
    ): Promise<void> {
        try {
            const {
                data,
                status,
            }: AxiosResponse<AuthResponseType> = await axiosInstance({
                url: urlEndpoint,
                method: 'POST',
                data: { email, password },
                headers: { 'Content-Type': 'application/json' },
            });

            if (status === 400) {
                const title = 'message' in data ? data.message : 'Unauthorized';
                snack.appDispatch({type:'set-error', payload:{
                    error:title,severity: 'warning'} as AppStateType})
                return;
            }

            if ('user' in data && 'token' in data.user) {
                snack.appDispatch({type:'set-error', payload:{
                        error:`Logged in as ${data.user.email}`,severity: 'info'} as AppStateType})

                // update stored user data
                updateUser(data.user);
            }
        } catch (errorResponse) {
            const title =
                axios.isAxiosError(errorResponse) &&
                errorResponse?.response?.data?.message
                    ? errorResponse?.response?.data?.message
                    : SERVER_ERROR;
            snack.appDispatch({type:'set-error', payload:{
                    error:title,severity: 'error'} as AppStateType})
        }
    }

    async function signin(email: string, password: string): Promise<void> {
        authServerCall('/signin', email, password);
    }
    async function signup(email: string, password: string): Promise<void> {
        authServerCall('/user', email, password);
    }

    function signout(): void {
        // clear user from stored user data
        clearUser();
        snack.appDispatch({type:'set-error', payload:{
                error:'Logged out!',severity: 'info'} as AppStateType})
    }

    // Return the user object and auth methods
    return {
        signin,
        signup,
        signout,
    };
}
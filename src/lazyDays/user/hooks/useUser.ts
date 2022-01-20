import {User} from "../../../shared/types";
import {AxiosResponse} from "axios";
import {axiosInstance} from "../../../axiosInstance/axiosInstance";
import {Endpoints} from "../../../axiosInstance/constant";

interface UseUser {
    user: User;
    updateUser: (user: User) => void;
    clearUser: () => void
}

const getUser = async (user: User | null): Promise<User | null> => {

    if (!user) return null;

    const {data}: AxiosResponse<{ user: User }> = await axiosInstance.get(
        `${Endpoints.User}/${user.id}`
    )
    return data.user
}

export const useUser = () => {

    const user = null;

    // meant to be called from useAuth
    const updateUser = (newUser:User):void =>{

    }

    // meant to be called from useAuth
    const clearUser = ():void =>{

    }

    return{
        user,
        updateUser,
        clearUser,
    }

}
import type {Appointment, User} from "../../../shared/types";
import {axiosInstance} from "../../../axiosInstance/axiosInstance";
import {QueryKes} from "../../hooks/react-query/queryKeys";
import {useUser} from './useUser';
import {useQuery} from "react-query";

// for when we need a query function for useQuery
async function getUserAppointments(
    user: User | null,
): Promise<Appointment[] | null> {
    if (!user) return null;
    const {data} = await axiosInstance.get(`/Endpoints.User/${user.id}/appointments`);
    return data.appointments;
}

export function useUserAppointments(): Appointment[] {
    const {user} = useUser();

    const {data: userAppointments = []} = useQuery(
        /*QueryKes.UserAppointments,*/
        [QueryKes.Appointments, QueryKes.User, user?.id ],
        //user?.id  - prefix
        () => getUserAppointments(user),
        {
            enabled: !!user,
        })
    return userAppointments || [];
}
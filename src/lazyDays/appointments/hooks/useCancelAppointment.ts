import {Appointment} from "../../../shared/types";
import {useApp} from "../../app/hooksApp/hook-app";
import {UseMutateFunction, useMutation, useQueryClient} from "react-query";
import {axiosInstance} from "../../../axiosInstance/axiosInstance";
import {QueryKes} from "../../hooks/react-query/queryKeys";
import {AppStateType} from "../../../providers/app-provider";

// for when server call is needed
async function removeAppointmentUser(appointment: Appointment): Promise<void> {
    const patchData = [{op: 'remove', path: '/userId'}];
    await axiosInstance.patch(`/appointment/${appointment.id}`, {
        data: patchData,
    });
}

// TODO: update return type

export function useCancelAppointment(): UseMutateFunction<void, unknown, Appointment, unknown> {
    const snack = useApp();
    const queryClient = useQueryClient();

    const {mutate} = useMutation(
        removeAppointmentUser,
        {
            onSuccess: () => {
                //инвалидируем  и обновим все ключи которые начинаются с QueryKes.Appointments
                queryClient.invalidateQueries([QueryKes.Appointments], {
                   // exact:true //обновит только те query, которые состоят только из QueryKes.Appointments
                });
                snack.appDispatch({
                    type: 'set-error',
                    payload: {
                        error: 'Removed appointment',
                        severity: 'info'
                    } as AppStateType
                })
            }

        }
    )
    return mutate
    /*    // TODO: replace with mutate function
        return (appointment: Appointment) => {
            // nothing to see here
        };*/
}
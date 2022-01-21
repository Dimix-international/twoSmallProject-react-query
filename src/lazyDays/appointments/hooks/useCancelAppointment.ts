

import {Appointment} from "../../../shared/types";
import {useApp} from "../../app/hooksApp/hook-app";
// for when server call is needed
// async function removeAppointmentUser(appointment: Appointment): Promise<void> {
//   const patchData = [{ op: 'remove', path: '/userId' }];
//   await axiosInstance.patch(`/appointment/${appointment.id}`, {
//     data: patchData,
//   });
// }

// TODO: update return type

export function useCancelAppointment(): (appointment: Appointment) => void {
    const snack = useApp();

    // TODO: replace with mutate function
    return (appointment: Appointment) => {
        // nothing to see here
    };
}
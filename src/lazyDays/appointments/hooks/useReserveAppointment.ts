import {Appointment} from "../../../shared/types";
import {useUser} from "../../user/hooks/useUser";
import {useApp} from "../../app/hooksApp/hook-app";


// for when we need functions for useMutation
// async function setAppointmentUser(
//   appointment: Appointment,
//   userId: number | undefined,
// ): Promise<void> {
//   if (!userId) return;
//   const patchOp = appointment.userId ? 'replace' : 'add';
//   const patchData = [{ op: patchOp, path: '/userId', value: userId }];
//   await axiosInstance.patch(`/appointment/${appointment.id}`, {
//     data: patchData,
//   });
// }

// TODO: update type for React Query mutate function
type AppointmentMutationFunction = (appointment: Appointment) => void;

export function useReserveAppointment(): AppointmentMutationFunction {
    const { user } = useUser();
    const snack = useApp();

    // TODO: replace with mutate function
    return (appointment: Appointment) => {
        // nothing to see here
    };
}
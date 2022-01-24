import {Appointment} from "../../../shared/types";
import {useUser} from "../../user/hooks/useUser";
import {useApp} from "../../app/hooksApp/hook-app";
import {axiosInstance} from "../../../axiosInstance/axiosInstance";
import {UseMutateFunction, useMutation, useQueryClient} from "react-query";
import {QueryKes} from "../../hooks/react-query/queryKeys";
import {AppStateType} from "../../../providers/app-provider";


// for when we need functions for useMutation
async function setAppointmentUser(
  appointment: Appointment,
  userId: number | undefined,
): Promise<void> {
  if (!userId) return;
  const patchOp = appointment.userId ? 'replace' : 'add';
  const patchData = [{ op: patchOp, path: '/userId', value: userId }];
  await axiosInstance.patch(`/appointment/${appointment.id}`, {
    data: patchData,
  });
}


export function useReserveAppointment():  UseMutateFunction<void, unknown, Appointment, unknown>{
    //1 - void - данные которые вернет mutate function
    //2 - unknown - тип возвращаемой ошибки
    //3 -Appointment - тип переменных передаваемый в функцию
    //4 - unknown - тип контекста (unknown т.к. мы его не используем) (для optimistic update)
    const { user } = useUser();
    const snack = useApp();
    const queryClient = useQueryClient();

    const {mutate} = useMutation(
        (appointment:Appointment) => setAppointmentUser(appointment,user?.id),
        {
            onSuccess: () =>{
                //перезапрос после мутации, т.к. данные стали не валидными
                // ( обновим все ключи которые начинаются с QueryKes.Appointments)
                queryClient.invalidateQueries([QueryKes.Appointments]);
                snack.appDispatch({
                    type:'set-error',
                    payload: {
                        error:'You have reserved the appointment!',
                        severity:'warning',
                    } as AppStateType
                })
            }
        }
    )
/*    // TODO: replace with mutate function
    return (appointment: Appointment) => {
        // nothing to see here
    };*/

    return mutate
}
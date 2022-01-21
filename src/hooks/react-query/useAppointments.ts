
import dayjs from 'dayjs';
import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState
} from 'react';

import { axiosInstance } from "../../axiosInstance/axiosInstance";
import {
    QueryKes as queryKeys
} from "./queryKeys";
import { useUser } from '../../lazyDays/user/hooks/useUser';
import { AppointmentDateMap} from "../../shared/types";
import { getAvailableAppointments } from '../../lazyDays/appointments/utils';
import { getMonthYearDetails, getNewMonthYear, MonthYear } from '../../lazyDays/appointments/hooks/monthYear';
import {Endpoints} from "../../axiosInstance/constant";
import {useQuery, useQueryClient} from "react-query";
import {setErrorApp} from "../../lazyDays/app/utils/setAppError";
import {useApp} from "../../lazyDays/app/hooksApp/hook-app";

// for useQuery call
async function getAppointments(
    year: string,
    month: string,
): Promise<AppointmentDateMap> {
    const { data } = await axiosInstance.get(`${Endpoints.Appointments}/${year}/${month}`);
    return data;
}

// types for hook return object
interface UseAppointments {
    appointments: AppointmentDateMap;
    monthYear: MonthYear;
    updateMonthYear: (monthIncrement: number) => void;
    showAll: boolean;
    setShowAll: Dispatch<SetStateAction<boolean>>;
}

// The purpose of this hook:
//   1. track the current month/year (aka monthYear) selected by the user
//     1a. provide a way to update state
//   2. return the appointments for that particular monthYear
//     2a. return in AppointmentDateMap format (appointment arrays indexed by day of month)
//     2b. prefetch the appointments for adjacent monthYears
//   3. track the state of the filter (all appointments / available appointments)
//     3a. return the only the applicable appointments for the current monthYear
export function useAppointments(): UseAppointments {
    /** ****************** START 1: monthYear state *********************** */
        // get the monthYear for the current date (for default monthYear state)
    const currentMonthYear = getMonthYearDetails(dayjs());
    const {appDispatch} = useApp();

    // state to track current monthYear chosen by user
    // state value is returned in hook return object
    const [monthYear, setMonthYear] = useState(currentMonthYear);

    // setter to update monthYear obj in state when user changes month in view,
    // returned in hook return object
    function updateMonthYear(monthIncrement: number): void {
        setMonthYear((prevData) => getNewMonthYear(prevData, monthIncrement));
    }
    /** ****************** END 1: monthYear state ************************* */
    /** ****************** START 2: filter appointments  ****************** */
        // State and functions for filtering appointments to show all or only available
    const [showAll, setShowAll] = useState(false);

    // We will need imported function getAvailableAppointments here
    // We need the user to pass to getAvailableAppointments so we can show
    //   appointments that the logged-in user has reserved (in white)
    const { user } = useUser();

    /** ****************** END 2: filter appointments  ******************** */
    const selectFn = useCallback( (data:AppointmentDateMap) => getAvailableAppointments(data, user),[])

    /** ****************** START 3: useQuery  ***************************** */
        // useQuery call for appointments for the current monthYear
        const queryClient = useQueryClient();

        useEffect(() =>{
            const nextMonthYear = getNewMonthYear(monthYear, 1);
            queryClient.prefetchQuery(
                [queryKeys.Appointments,nextMonthYear.year, nextMonthYear.month],
                () => getAppointments(nextMonthYear.year, nextMonthYear.month)
            )
        },[queryClient, monthYear])

        // TODO: update with useQuery!
        // Notes:
        //    1. appointments is an AppointmentDateMap (object with days of month
        //       as properties, and arrays of appointments for that day as values)
        //
        //    2. The getAppointments query function needs monthYear.year and
        //       monthYear.month
    const {data :appointments = []} = useQuery(
        [queryKeys.Appointments,monthYear.year, monthYear.month], //обновлялись данные на каждом месяце
        () => getAppointments(monthYear.year, monthYear.month),
        {
            select:showAll ? undefined : selectFn, //вызываем когда показываем не все данные
            onError: (error) => setErrorApp(error, appDispatch)
        })


    /** ****************** END 3: useQuery  ******************************* */

    return { appointments, monthYear, updateMonthYear, showAll, setShowAll };
}
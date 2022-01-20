import React from "react";
import {Appointment as AppointmentType, User} from "../../shared/types";
import {appointmentInPast} from "./utils";
import {useUser} from "../user/hooks/useUser";

// determine whether this appointment can be reserved / un-reserved by logged-in user
function isClickable(
    user: User | null,
    appointmentData: AppointmentType,
): boolean {
    return !!(
        user?.id &&
        (!appointmentData.userId || appointmentData.userId === user?.id) &&
        !appointmentInPast(appointmentData)
    );
}

type AppointmentPropsType = {
    appointmentData?: AppointmentType
}
export const Appointment: React.FC<AppointmentPropsType> = React.memo(props => {

    const {user} = useUser();

    return (
        <div>Calendar</div>
    )
})
import React from "react";
import {Appointment as AppointmentType, User} from "../../shared/types";
import {appointmentInPast, getAppointmentColor} from "./utils";
import {useUser} from "../user/hooks/useUser";
import {useAppointments} from "../hooks/react-query/useAppointments";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

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
    appointmentData: AppointmentType
}
export const Appointment: React.FC<AppointmentPropsType> = React.memo(props => {
    const {appointmentData} = props;

    const {user} = useUser();
    const reserveAppointment = useAppointments();
    // @ts-ignore
    const [textColor, bgColor] = getAppointmentColor(appointmentData, user?.id);

    const clickable = isClickable(user, appointmentData);
    let onAppointmentClick: undefined | (() => void);
    let hoverCss = {};

    // turn the lozenge into a button if it's clickable
    if (clickable) {
        onAppointmentClick = user
            // @ts-ignore
            ? () => reserveAppointment(appointmentData)
            : undefined;
        hoverCss = {
            transform: 'translateY(-1px)',
            boxShadow: 'md',
            cursor: 'pointer',
        };
    }

    const appointmentHour = dayjs(appointmentData.dateTime).format('h a');

    return (
        <Box component={clickable ? 'button' : 'div'} sx={{
            borderRadius: '5px',
            backgroundColor: bgColor,
            color: textColor,
            paddingX: '3px',
            ":hover": hoverCss,

        }} onClick={onAppointmentClick}>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography component={'span'} variant={'subtitle2'} fontSize={'small'}>
                    {appointmentHour}
                </Typography>
                <Typography component={'span'} variant={'subtitle2'} fontSize={'small'}>
                    {appointmentData.treatmentName}
                </Typography>
            </Stack>
        </Box>
    )
})
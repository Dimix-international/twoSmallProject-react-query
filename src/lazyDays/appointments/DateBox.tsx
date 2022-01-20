import {Appointment as AppointmentType} from "../../shared/types";
import {Appointment} from "./Appointment";
import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type DateBoxType = {
    date: number,
    gridColumn?: number,
    appointments?: AppointmentType[]
}

export const DateBox: React.FC<DateBoxType> = React.memo(props => {
    const {date, gridColumn, appointments = []} = props;

    return (
        <Box sx={{
            width: '100%',
            height:'80px',
            padding:'5px',
            backgroundColor: '#c2c2c2',
            borderRadius: '10px',
            boxShadow: '4px 4px 8px 0px rgba(34, 60, 80, 0.2)',
        }}>
            <Stack spacing={1} >
                <Typography variant={'subtitle2'} textAlign={'right'}>
                    {date}
                </Typography>
                {
                    appointments.map(appointment => (
                        <Appointment
                            key={appointment.id}
                            appointmentData={appointment}
                        />
                    ))
                }
            </Stack>
        </Box>
    )
})
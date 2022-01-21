import React from "react";
import dayjs from "dayjs";
import {useAppointments} from "../../hooks/react-query/useAppointments";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {Checkbox, FormControlLabel, FormGroup, Grid} from "@mui/material";
import {DateBox} from "./DateBox";


export const Calendar = React.memo(() => {
    const currentDate = dayjs();

    const {
        appointments,
        monthYear,
        setShowAll,
        showAll,
        updateMonthYear,
    } = useAppointments()

    return (
        <Box>
            <Stack direction={'row'} spacing={8} justifyContent={'center'}
                   alignItems={'center'}>
                <IconButton
                    size={'large'}
                    aria-label="previous month"
                    onClick={() => updateMonthYear(-1)}
                    disabled={monthYear.startDate < currentDate}
                >
                    <ArrowBackIcon fontSize={'large'}/>
                </IconButton>
                <Typography variant={'h5'} sx={{flex: '0 0 40%'}}
                            textAlign={'center'}>
                    {monthYear.monthName} {monthYear.year}
                </Typography>
                <IconButton
                    size={'large'}
                    aria-label="next month"
                    onClick={() => updateMonthYear(1)}
                >
                    <ArrowForwardIcon fontSize={'large'}/>
                </IconButton>
                <FormGroup sx={{
                    position: 'absolute',
                    right: '10px',
                }}>
                    <FormControlLabel control={
                        <Checkbox
                            size={'medium'}
                            checked={!showAll}
                            onChange={() => setShowAll(prevValue => !prevValue)}
                        />
                    } label="Only show available"/>
                </FormGroup>
            </Stack>
            <Grid container sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '20px',
                padding:'20px',
            }}>
                {/* first day needs a grid column */}
                <Grid item sx={{gridColumnStart: `${monthYear.firstDOW}`}}>
                    <DateBox
                        date={1}
                        appointments={appointments[1]}
                    />
                </Grid>
                {/* the rest of the days will follow */}
                {[...Array(monthYear.lastDate)].map((_, i) =>
                    i > 0 ? (
                        <Grid item key={i}>
                            <DateBox
                                date={i + 1}
                                appointments={appointments[i + 1]}
                            />
                        </Grid>
                    ) : null,
                )}
            </Grid>
        </Box>
    )
})

import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useStaff} from "../hooks/react-query/useStaff";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import {Staff} from "./Staff";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {useTreatments} from "../hooks/react-query/useTreatments";

export const AllStaff = React.memo(props => {
    const staff = useStaff();
    const treatments = useTreatments();

    const defValueRadio = useRef(staff.filter);

    if (staff.data.length === 0) return <></>
    return (
        <Box>
            <Typography
                variant={'h3'}
                component={'h1'}
                align={'center'}
                marginTop={5}
            >
                Our Staff
            </Typography>
            <Stack m={10} spacing={8} justifyContent={'center'}
                   direction={{xs: 'column', sm: 'row'}}>
                {
                    staff.data.map(item => (
                        <Staff key={item.id} staffData={item}/>
                    ))
                }
            </Stack>
            <Stack
                direction={{xs: 'column', sm: 'row'}}
                justifyContent={'center'}
                alignItems={'center'}
                spacing={3}
            >
                <Typography
                    variant={'h6'}
                    component={'h6'}
                    align={'center'}
                    sx={{
                        fontWeight: 700
                    }}
                >
                    Filter by treatment:
                </Typography>
                <RadioGroup
                    row aria-label="gender"
                    name="row-radio-buttons-group"
                    defaultValue={defValueRadio.current.toLowerCase()}
                >
                    <FormControlLabel value="all" control={<Radio/>}
                                      label="All"
                                      onClick={() => staff.setFilter('all')}
                    />
                    {
                        treatments.map(item => (
                            <FormControlLabel
                                key={item.id}
                                value={item.name.toLowerCase()}
                                control={<Radio/>}
                                label={item.name}
                                onClick={() => staff.setFilter(item.name)}
                            />
                        ))
                    }
                </RadioGroup>
            </Stack>
        </Box>

    )
})
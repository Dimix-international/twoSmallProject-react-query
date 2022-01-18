import Box from "@mui/material/Box";
import React from "react";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {useTreatments} from "../../../hooks/react-query/useTreatments";
import {Treatment} from "./Treatment";


export const Treatments = React.memo(() => {
    const treatments = useTreatments();

    return(
        <Box>
            <Typography
                variant={'h3'}
                component={'h1'}
                align={'center'}
                marginTop={5}
            >
                Available Treatments
            </Typography>
            <Stack m={10} spacing={8} justifyContent={'center'} direction={{ xs: 'column', sm: 'row' }}>
                {
                    treatments?.map(item => (
                        <Treatment key={item.id} treatmentData={item} />
                    ))
                }
            </Stack>
        </Box>
    )
})
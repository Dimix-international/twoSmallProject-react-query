import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import {useIsFetching} from "react-query";

export const Loading = React.memo(props => {
    const isFetching = useIsFetching();

    const display = isFetching ? 'flex' : 'none';

    return (
        <Box sx={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: `${display}`,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(203,202,202,0.5)'
        }}>
            <CircularProgress size={50}/>
        </Box>
    )
})
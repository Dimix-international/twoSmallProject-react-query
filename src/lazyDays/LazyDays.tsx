import Box from "@mui/material/Box";
import {NavBar} from "./app/NavBar";
import {RoutesComponent} from "./app/Routes";
import {Loading} from "./app/Loading";
import {CustomizedSnackbars} from "./common/Snack";
import React from "react";


export const LazyDays = () => {

    return (
        <Box>
            <NavBar/>
            <RoutesComponent/>
            <Loading/>
            <CustomizedSnackbars />
        </Box>
    )
}
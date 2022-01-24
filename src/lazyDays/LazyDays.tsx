import Box from "@mui/material/Box";
import {NavBar} from "./app/NavBar";
import {RoutesComponent} from "./app/Routes";
import {Loading} from "./app/Loading";
import {CustomizedSnackbars} from "./common/Snack";
import React, {useEffect} from "react";
import {useApp} from "./app/hooksApp/hook-app";
import {Navigate, useNavigate} from "react-router-dom";
import {Endpoints} from "../axiosInstance/constant";


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
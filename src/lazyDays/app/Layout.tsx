import React from "react";
import {Outlet} from "react-router-dom";


export const Layout = React.memo(props =>{
    return(
        <Outlet />
    )
})
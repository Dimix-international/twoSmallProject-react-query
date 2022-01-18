import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {Layout} from "./Layout";
import {Home} from "./Home";
import {Endpoints} from "../../axiosInstance/constant";
import {Treatments} from "../componets/treatments/Treatments";
import {Staff} from "../staff/Staff";
import {Calendar} from "../calendar/Calendar";


export const RoutesComponent = React.memo(props => {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path={Endpoints.Treatments} element={<Treatments />}/>
                    <Route path={Endpoints.Staff} element={<Staff />}/>
                    <Route path={Endpoints.Calendar} element={<Calendar />}/>
                    <Route path={'*'} element={<Navigate to={'/'} />} />
                </Route>
            </Routes>
        </>
    )
})
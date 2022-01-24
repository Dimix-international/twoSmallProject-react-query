import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {Layout} from "./Layout";
import {Home} from "./Home";
import {Endpoints} from "../../axiosInstance/constant";
import {Treatments} from "../treatments/Treatments";
import {AllStaff} from "../staff/AllStaff";
import {Calendar} from "../appointments/Calendar";
import {SingIn} from "../user/SingIn";


export const RoutesComponent = React.memo(props => {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<Layout />}>
                    <Route index element={<Navigate to={Endpoints.Home} />} />
                    <Route path={Endpoints.Home} element={<Home />}/>
                    <Route path={Endpoints.Treatments} element={<Treatments />}/>
                    <Route path={Endpoints.Staff} element={<AllStaff />}/>
                    <Route path={Endpoints.SignIn} element={<SingIn />}/>
                    <Route path={Endpoints.Calendar} element={<Calendar />}/>
                    <Route path={'*'} element={<Navigate to={'/'} />} />
                </Route>
            </Routes>
        </>
    )
})
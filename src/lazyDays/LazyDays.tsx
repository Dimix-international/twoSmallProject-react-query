import Box from "@mui/material/Box";
import {NavBar} from "./app/NavBar";
import {RoutesComponent} from "./app/Routes";


export const LazyDays = () => {

    return (
        <Box>
            <NavBar/>
            <RoutesComponent/>
        </Box>
    )
}
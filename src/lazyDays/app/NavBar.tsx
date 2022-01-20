import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import {CustomLink} from "../common/CustomLink/CustomLink";
import {Endpoints} from "../../axiosInstance/constant";
import Stack from "@mui/material/Stack";

export const NavBar = React.memo(() => {
    return (
        <Box sx={{flexGrow: 1, height:'70px'}}>
            <AppBar position="static">
                <Toolbar>
                    <CustomLink to={'/'}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <LocalFloristIcon/>
                        </IconButton>
                    </CustomLink>
                    <Stack direction={'row'} spacing={5} sx={{flexGrow: 1}}>
                        <CustomLink to={Endpoints.Treatments}>
                            <Typography variant={'subtitle2'} component="div">
                                Treatments
                            </Typography>
                        </CustomLink>
                        <CustomLink to={Endpoints.Staff}>
                            <Typography variant={'subtitle2'} component="div">
                                Staff
                            </Typography>
                        </CustomLink>
                        <CustomLink to={Endpoints.Calendar}>
                            <Typography variant={'subtitle2'} component="div">
                                Calendar
                            </Typography>
                        </CustomLink>
                    </Stack>
                    <Button color={'primary'} variant={'contained'}>Sing in</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
})
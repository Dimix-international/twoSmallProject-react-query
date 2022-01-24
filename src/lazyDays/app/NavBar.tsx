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
import {useUser} from "../user/hooks/useUser";
import {useAuth} from "../auth/useAuth";
import {useApp} from "./hooksApp/hook-app";
import {useNavigate} from "react-router-dom";


const Links = ['Treatments','Staff', 'Calendar' ]

export const NavBar = React.memo(() => {
    const {user} = useUser();
    const {signout} = useAuth();
    const {appDispatch} = useApp();
    const navigate = useNavigate()

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
                        {
                            Links.map(link => (
                                <CustomLink key={link} to={link.toLowerCase()}>
                                    <Typography variant={'subtitle2'} component="div">
                                        {link}
                                    </Typography>
                                </CustomLink>
                            ))
                        }
                    </Stack>
                    {
                        user ? (
                            <>
                                <CustomLink to={`${Endpoints.User}/${user.id}`}>
                                    <Typography variant={'subtitle2'} component="div">
                                        {user.email}
                                    </Typography>
                                    <Button
                                        color={'primary'}
                                        variant={'contained'}
                                        onClick={() => signout()}
                                    >Sing out</Button>
                                </CustomLink>
                            </>
                        ) : <Button
                            onClick={() => {
                                appDispatch({type:'loggedUser', payload:false})
                                navigate(Endpoints.SignIn)
                            }}
                            color={'primary'}
                            variant={'contained'}>Sing in</Button>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
})
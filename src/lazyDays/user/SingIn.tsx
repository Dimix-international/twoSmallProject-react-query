import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useUser} from "./hooks/useUser";
import {useAuth} from "../auth/useAuth";
import {useState} from "react";
import {Navigate} from "react-router-dom";
import {Button} from "@mui/material";

export const SingIn = () => {
    const [email, setEmail] = useState('test');
    const [password, setPassword] = useState('test');
    const [dirty, setDirty] = useState({email: false, password: false});
    const auth = useAuth();
    const {user} = useUser();

    if (user) {
        return <Navigate to={`/user/${user.id}`}/>;
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {m: 1, width: '25ch'},
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <form>
                    <TextField
                        required
                        id="filled-required"
                        label="Required"
                        type="email"
                        defaultValue="Email"
                        variant="filled"
                        value={email}
                    />
                    <TextField
                        id="filled-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="filled"
                        value={password}
                    />
                    <Button
                        type="submit"
                        disabled={!email || !password}
                        onClick={() => auth.signup(email, password)}
                    >
                        Sign up
                    </Button>
                    <Button
                        type={'submit'}
                        disabled={!email || !password}
                        onClick={() => auth.signin(email, password)}
                    >
                        Sign in
                    </Button>
                </form>
            </div>
        </Box>
    );
}
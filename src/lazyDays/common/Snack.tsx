import * as React from 'react';
import {useEffect} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useApp} from "../app/hooksApp/hook-app";
import {AppStateType} from "../../providers/app-provider";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export const CustomizedSnackbars = () => {
    const [open, setOpen] = React.useState(false);
    const {appState, appDispatch} = useApp();

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        appDispatch({type:'set-error', payload:{error:null, severity:'error'} as AppStateType})
        setOpen(false);
    };

    useEffect(() =>{
        appState.error && setOpen(true)
    },[appState])
    return (
        <Snackbar anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}>
            <Alert onClose={handleClose} severity={appState.severity}
                   sx={{width: '100%'}}>
                {appState.error}
            </Alert>
        </Snackbar>
    );
}
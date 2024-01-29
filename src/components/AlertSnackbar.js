import React from 'react'
import { Alert, Snackbar } from '@mui/material';
// Redux Store component
import { useDispatch, useSelector } from 'react-redux';
import { closeSnackbar } from '../redux/slices/app';

const AlertSnackbar = () => {

    const { open, severity, message } = useSelector((state) => state.app.snackbar);
    const dispatch = useDispatch();
    const vertical = "bottom", horizontal = "center";
    function handleClose() {
        dispatch(closeSnackbar());
    }

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
            <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default AlertSnackbar

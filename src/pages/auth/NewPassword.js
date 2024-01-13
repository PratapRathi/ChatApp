import React from 'react'
import { Link, Stack, Typography } from '@mui/material'
import {Link as RouterLink} from "react-router-dom";
import { CaretLeft } from 'phosphor-react';
import NewPasswordForm from '../../sections/auth/NewPasswordForm';

const NewPassword = () => {
    return (
        <>
            <Stack spacing={2} sx={{ mb: 3, position: "relative" }}>
                <Typography variant='h3' paragraph>Reset Password</Typography>
                <Typography variant='body2' sx={{ color: "text.secondary", mb: 3 }}>Please set your new password</Typography>
            </Stack>

            {/* New Password Form */}
            <NewPasswordForm/>

            <Link component={RouterLink} to="/auth/login" color="inherit" variant='subtitle2' sx={{mt:3, mx:"auto", alignItems:"center", display:"inline-flex"}}>
            <CaretLeft/>
            Return to Sign In
        </Link>
        </>
    )
}

export default NewPassword;

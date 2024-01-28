import React from 'react' 
import { Stack, Typography } from '@mui/material'
import VerifyOTPForm from '../../sections/auth/VerifyOTPForm'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const VerifyOTP = () => {
  const {email} = useSelector((state)=>state.auth);
  if(!email){
    return <Navigate to="/auth/login" />
  }
  return (
    <>
      <Stack spacing={2} sx={{mb:5, position:"relative"}}>
        <Typography variant='h4'>Please verify OTP</Typography>

        <Stack direction="row" spacing={0.5}>
            <Typography variant='body2'>{`Email sent to ${email}`}</Typography>
        </Stack>

        {/* Verify-OTP form */}
        <VerifyOTPForm/>

      </Stack>
    </>
  )
}

export default VerifyOTP

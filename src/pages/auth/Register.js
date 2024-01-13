import React from 'react'
import {Link as RouterLink} from "react-router-dom";
import { Link, Stack, Typography } from '@mui/material'
import AuthSocial from '../../sections/auth/AuthSocial'
import RegisterForm from '../../sections/auth/RegisterForm';

const Register = () => {
  return (
    <Stack spacing={2} sx={{mb:5, position:"relative"}}>
        <Typography variant='h4'>Get Started with Tawk</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant='body2'>Already have an account?</Typography>
        <Link to="/auth/login" component={RouterLink} variant='subtitle2'>Sign In</Link>
      </Stack>

      {/* Register Form */}
      <RegisterForm/>

      {/* Terms & Conditions */}
      <Typography component={"div"} sx={{color:"text.secondary", mt:3, typography:"caption", textAlign:"center"}} >
        {"By signing up, I agree to "}
        <Link underline='always' color="text.primary" sx={{cursor:"pointer"}} >Terms of service</Link>
        {" and "}
        <Link underline='always' color="text.primary" sx={{cursor:"pointer"}} >Pivacy Policy</Link>
      </Typography>

        {/* Auth Social */}
        <AuthSocial/>
    </Stack>
  )
}

export default Register

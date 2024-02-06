import React from 'react'
import * as Yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider from '../../components/hook-form/FormProvider';
import { Stack, useTheme } from '@mui/material';
import RHFCodes from '../../components/hook-form/RHFCodes';
import { useDispatch, useSelector } from 'react-redux';
import { VerifyEmail } from '../../redux/slices/auth';
import { LoadingButton } from '@mui/lab';


const VerifyOTPForm = () => {
    const dispatch = useDispatch();
    const {isLoading} = useSelector((state)=> state.auth);
    const {email} = useSelector((state)=>state.auth);
    const theme = useTheme();

    const verifyOTPSchema = Yup.object().shape({
        code1: Yup.string().required("Code is Required"),
        code2: Yup.string().required("Code is Required"),
        code3: Yup.string().required("Code is Required"),
        code4: Yup.string().required("Code is Required"),
        code5: Yup.string().required("Code is Required"),
        code6: Yup.string().required("Code is Required"),
    })

    const defaultValues = {
        code1: "",
        code2: "",
        code3: "",
        code4: "",
        code5: "",
        code6: "",
    };

    const methods = useForm({
        mode: "onChange",
        resolver: yupResolver(verifyOTPSchema),
        defaultValues,
    });

    const { handleSubmit } = methods;

    const onSubmit = async (data) => {
        try {
            // send api request
            dispatch(VerifyEmail({
                email,
                otp: `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`
            }))
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>

                {/* Custom OTP input field */}
                <RHFCodes keyName='code' inputs={["code1","code2","code3","code4","code5","code6"]}/>


                <LoadingButton
                    fullWidth
                    loading={isLoading}
                    color="inherit"
                    size="large"
                    type="submit"
                    variant="contained"
                    sx={{
                        bgcolor: "text.primary",
                        color: theme.palette.mode === "light" ? "common.white" : "grey.800",
                        "&:hover": {
                            bgcolor: "text.primaary",
                            color: theme.palette.mode === "light" ? "common.white" : "grey.800",
                        },
                    }}>
                    Verify
                </LoadingButton>

            </Stack>
        </FormProvider>
    )
}

export default VerifyOTPForm

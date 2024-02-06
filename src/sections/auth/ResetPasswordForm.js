import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { RHFTextField } from "../../components/hook-form";
import { Alert, Stack, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ForgotPassword } from "../../redux/slices/auth";
import { LoadingButton } from "@mui/lab";

const ResetPasswordForm = () => {
    const dispatch = useDispatch();
    const {isLoading} = useSelector((state)=> state.auth);
    const theme = useTheme();

    const ResetPasswordSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email is required")
            .email("Email must be valid email address"),
    });

    const defaultValues = {
        email: "",
    };

    const methods = useForm({
        resolver: yupResolver(ResetPasswordSchema),
        defaultValues,
    });

    const {
        reset,
        setError,
        handleSubmit,
        formState: { errors },
        // formState: { errors, isSubmitting, isSubmitSuccessful },
    } = methods;

    const onSubmit = async (data) => {
        try {
            // Submit data to Backend
            dispatch(ForgotPassword(data));
            reset();
        } catch (error) {
            console.log(error);
            reset();
            setError("afterSubmit", { ...error, message: error.message });
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                {!!errors.afterSubmit && (
                    <Alert severity="error">{errors.afterSubmit.message}</Alert>
                )}
                <RHFTextField name="email" label="Email Address" />

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
                    }}
                >
                    Send Request
                </LoadingButton>

            </Stack>
        </FormProvider>
    );
};

export default ResetPasswordForm;

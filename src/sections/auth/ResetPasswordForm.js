import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { RHFTextField } from "../../components/hook-form";
import { Alert, Button, Stack, useTheme } from "@mui/material";

const ResetPasswordForm = () => {
    const theme = useTheme();

    const ResetPasswordSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email is required")
            .email("Email must be valid email address"),
    });

    const defaultValues = {
        email: "demo@tawk.com",
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

                <Button
                    fullWidth
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
                </Button>

            </Stack>
        </FormProvider>
    );
};

export default ResetPasswordForm;
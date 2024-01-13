import React, { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { RHFTextField } from "../../components/hook-form";
import { Eye, EyeSlash } from "phosphor-react";
import {
    Alert,
    Button,
    IconButton,
    InputAdornment,
    Stack,
    useTheme,
} from "@mui/material";


const NewPasswordForm = () => {

    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);

    const NewPasswordSchema = Yup.object().shape({
        newPassword: Yup.string().min(6, "Password must be at least 6 charaters").required("Password is required"),
        confirmPassword: Yup.string().required("Password is required").oneOf([Yup.ref("newPassword"), null], "Password must match"),
    });

    const defaultValues = {
        newPassword: "",
        confirmPassword: "",
    };

    const methods = useForm({
        resolver: yupResolver(NewPasswordSchema),
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
                <RHFTextField
                    name="newPassword"
                    label="New Password"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <Eye /> : <EyeSlash />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <RHFTextField
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <Eye /> : <EyeSlash />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

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
                    Submit
                </Button>

            </Stack>
        </FormProvider>
    );
};

export default NewPasswordForm;

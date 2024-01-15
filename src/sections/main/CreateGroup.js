import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle, Slide, Stack } from '@mui/material';
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from '../../components/hook-form/FormProvider';
import { RHFTextField } from '../../components/hook-form';
import RHFAutocomplete from '../../components/hook-form/RHFAutocomplete';



const MEMBERS = ["Name 1", "Name 2", "Name 3", "Name 4", "Name 5"];

// TODO => Create a reusable component
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const CreateGroupForm = ({handleClose}) => {
    const NewGroupSchema = Yup.object().shape({
        title: Yup.string().required("Group name is required"),
        members: Yup.array().min(2, "Must have atleast 2 members"),
    });

    const defaultValues = {
        title: "",
        members: [],
    };

    const methods = useForm({
        resolver: yupResolver(NewGroupSchema),
        defaultValues,
    });

    const {
        reset,
        // watch,
        setError,
        handleSubmit,
        // formState: { errors },
        // formState: { errors, isSubmitting, isSubmitSuccessful, isValid },
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
                <RHFTextField name="title" label="Name" />
                <RHFAutocomplete name="members" label="Members" multiple freeSolo options={MEMBERS.map((option) => option)} ChipProps={{ size: "medium" }} />
                <Stack spacing={2} direction="row" alignItems="center" justifyContent="end">
                    <Button onClick={handleClose} variant='contained' >Cancel</Button>
                    <Button type='submit' variant='contained' >Create</Button>
                </Stack>
            </Stack>
        </FormProvider>
    )
}



const CreateGroup = ({ open, handleClose }) => {
    return (
        <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose} TransitionComponent={Transition} keepMounted sx={{ p: 4 }}>
            {/* Title */}
            <DialogTitle sx={{mb:3}}>Create New Group</DialogTitle>

            {/* Content */}
            <DialogContent>
                {/* Form */}
                <CreateGroupForm handleClose={handleClose}/>
            </DialogContent>
        </Dialog>
    )
}

export default CreateGroup

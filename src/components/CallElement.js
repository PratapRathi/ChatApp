import React from 'react'
import { Avatar, Box, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { faker } from '@faker-js/faker';
import StyledBadge from './StyledBadge';
import { ArrowDownLeft, ArrowUpRight, Phone, VideoCamera } from 'phosphor-react';

const CallLogElement = ({ online, incoming, missed }) => {
    const theme = useTheme();
    return (
        <>
            <Box sx={{ width: "100%", borderRadius: 1, backgroundColor: theme.palette.mode === "light" ? "#fff" : theme.palette.background.default }} p={2}>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={2}>
                        {online ? <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
                            <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} /></StyledBadge>
                            : <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />}
                        <Stack spacing={0.3}>
                            <Typography variant='subtitle2'>{faker.name.fullName()}</Typography>
                            <Stack spacing={0.5} direction="row" alignItems="center">
                                {incoming ? <ArrowDownLeft color={missed ? "red" : "green"} /> : <ArrowUpRight color={missed ? "red" : "green"} />}
                                <Typography variant='caption'>{"yesterday 21:24"}</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                    <IconButton><Phone color='green' /></IconButton>
                </Stack>
            </Box>
        </>
    )
}


const CallElement = ({ online }) => {
    const theme = useTheme();
    return (
        <Box sx={{ width: "100%", borderRadius: 1, backgroundColor: theme.palette.mode === "light" ? "#fff" : theme.palette.background.default }} p={2}>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={2}>
                    {online ? <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
                        <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} /></StyledBadge>
                        : <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />}
                    <Typography variant='subtitle2'>{faker.name.fullName()}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <IconButton><Phone color='green' /></IconButton>
                    <IconButton><VideoCamera color='green' /></IconButton>
                </Stack>
            </Stack>
        </Box>
    )
}

export { CallLogElement, CallElement };

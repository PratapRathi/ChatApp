import React from 'react'
import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material'
import { useDispatch } from 'react-redux';
import { UpdateSidebarType } from '../redux/slices/app';
import { ArrowLeft } from 'phosphor-react';
import Message from './Conversation/Message';

const StarredMessage = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    return (
        <Box sx={{ width: 320, height: "100vh" }}>
            <Stack sx={{ height: "100%" }}>
                {/* Header */}
                <Box sx={{ width: "100%", backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background, boxShadow: "0px 0px 2px rgba(0,0,0,0.25)" }}>
                    <Stack sx={{ height: "100%" }} spacing={3} p={2} direction="row" alignItems="center">
                        <IconButton onClick={() => dispatch(UpdateSidebarType("CONTACT"))}><ArrowLeft /></IconButton>
                        <Typography variant='subtitle1'>Starred Messages</Typography>
                    </Stack>
                </Box>


                {/* Body */}
                <Stack className='scrollbar' height="100%" spacing={3} position="relative" sx={{ flexGrow: 1, overflowY: "scroll" }}>
                    <Message menu={false}/>
                </Stack>

            </Stack>
        </Box>
    )
}

export default StarredMessage;

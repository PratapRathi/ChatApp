import React, { useState } from 'react'
import { Box, Grid, IconButton, Stack, Tab, Tabs, Typography, useTheme } from '@mui/material'
import { useDispatch } from 'react-redux';
import { UpdateSidebarType } from '../redux/slices/app';
import { ArrowLeft } from 'phosphor-react';
import { faker } from '@faker-js/faker';
import { SHARED_DOCS, SHARED_LINKS } from '../data';
import { DocMsg, LinkMsg } from './Conversation/MsgTypes';

const SharedMessages = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ width: 320, height: "100vh" }}>
            <Stack sx={{ height: "100%" }}>
                {/* Header */}
                <Box sx={{ width: "100%", backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background, boxShadow: "0px 0px 2px rgba(0,0,0,0.25)" }}>
                    <Stack sx={{ height: "100%" }} spacing={3} p={2} direction="row" alignItems="center">
                        <IconButton onClick={() => dispatch(UpdateSidebarType("CONTACT"))}><ArrowLeft /></IconButton>
                        <Typography variant='subtitle1'>Shared Messages</Typography>
                    </Stack>
                </Box>

                {/* Tabs */}
                <Tabs sx={{ px: 2, pt: 2 }} value={value} onChange={handleChange} centered>
                    <Tab label="Media" />
                    <Tab label="Links" />
                    <Tab label="Docs" />
                </Tabs>

                {/* Body */}
                <Stack className='scrollbar' height="100%" p={3} spacing={value === 1 ? 1 : 3} position="relative" sx={{ flexGrow: 1, overflowY: "scroll" }}>
                    {(() => {
                        switch (value) {
                            case 0:
                                // Images
                                return <Grid container spacing={2}>
                                    {
                                        [0, 1, 2, 3, 4, 5, 6, 7, 8].map((el) =>
                                            <Grid item xs={4}>
                                                <img src={faker.image.avatar()} alt={faker.name.fullName()} />
                                            </Grid>
                                        )
                                    }
                                </Grid>
                            case 1:
                                // Links
                                return SHARED_LINKS.map((el) => <LinkMsg el={el} />)
                            case 2:
                                //Docs
                                return SHARED_DOCS.map((el) => <DocMsg el={el} />)
                            default:
                                break;
                        }
                    })()}
                </Stack>

            </Stack>
        </Box>
    )
}

export default SharedMessages

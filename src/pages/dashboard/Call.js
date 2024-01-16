import React, { useState } from "react";
import { Box, Divider, IconButton, Link, Stack, Typography, useTheme } from "@mui/material";
import { MagnifyingGlass, Plus } from "phosphor-react";
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search/index.js';
import { SimpleBarStyle } from "../../components/Scrollbar.js";
import { CallLogElement } from "../../components/CallElement.js";
import { CallLogs } from "../../data/index.js";
import StartCall from "../../sections/main/StartCall.js";


const Call = () => {
    const theme = useTheme();
    const [openDialog, setOpenDialog] = useState(false);
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    return (
        <>
            <Stack direction="row" sx={{ width: "100%" }}>
                {/* Left */}
                <Box
                    sx={{
                        height: "100vh",
                        backgroundColor: (theme) => theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background,
                        width: 320,
                        boxShadow: "0px 0px 2px rgba(0,0,0,0.25)"
                    }}>
                    <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
                        <Stack>
                            <Typography variant="h5">Call Log</Typography>
                        </Stack>

                        <Stack sx={{ width: "100%" }}>
                            <Search>
                                <SearchIconWrapper>
                                    <MagnifyingGlass color='#709CE6' />
                                </SearchIconWrapper>
                                <StyledInputBase placeholder='Search...' />
                            </Search>
                        </Stack>

                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography variant="subtitle2" component={Link}>Start New Conversation</Typography>
                            <IconButton onClick={() => setOpenDialog(true)}><Plus style={{ color: theme.palette.primary.main }} /></IconButton>
                        </Stack>
                        <Divider />

                        <Stack className='scrollbar' sx={{ flexGrow: 1, overflowY: "auto", height: '100%' }}>
                            <SimpleBarStyle timeout={500} clickOnTrack={false}>
                                <Stack spacing={2.4}>
                                    {/* Call Logs */}
                                    {CallLogs.map((el) => <CallLogElement {...el} />)}
                                </Stack>
                            </SimpleBarStyle>
                        </Stack>

                    </Stack>
                </Box>


                {/* Right */}
                {/* //TODO => Reuse Conversation component */}

            </Stack>
            {openDialog && <StartCall open={openDialog} handleClose={handleCloseDialog}/>}
        </>
    )
}

export default Call

import React, { useState } from 'react'
import { Box, Stack, IconButton, TextField, InputAdornment, Fab, Tooltip } from '@mui/material';
import { Camera, File, Image, LinkSimple, PaperPlaneTilt, Smiley, Sticker, User } from 'phosphor-react';
import { styled, useTheme } from '@mui/material/styles';
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'


const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
        paddingTop: "12px",
        paddingBottom: "12px"
    }
}))

const Actions = [
    {
        color: "#4da5fe",
        icon: <Image size={24} />,
        y: 102,
        title: "Photo/Video",
    },
    {
        color: "#1b8cfe",
        icon: <Sticker size={24} />,
        y: 172,
        title: "Stickers",
    },
    {
        color: "#0172e4",
        icon: <Camera size={24} />,
        y: 242,
        title: "Image",
    },
    {
        color: "#0159b2",
        icon: <File size={24} />,
        y: 312,
        title: "Document",
    },
    {
        color: "#013f7f",
        icon: <User size={24} />,
        y: 382,
        title: "Contact",
    },
];

const ChatInput = ({ setOpenPicker }) => {
    const [openActions, setOpenActions] = useState(false);
    return (
        <StyledInput fullWidth placeholder='Write a message...' variant='filled'
            InputProps=
            {{
                disableUnderline: true,
                startAdornment: (
                    <Stack sx={{ width: "max-content" }}>
                        <Stack sx={{ position: "relative", display: openActions ? "inline-block" : "none" }}>
                            {Actions.map((el) => (
                                <Tooltip title={el.title} placement="right">
                                    <Fab sx={{ position: "absolute", top: -el.y, backgroundColor: el.color }}>
                                        {el.icon}
                                    </Fab>
                                </Tooltip>
                            ))}
                        </Stack>

                        <InputAdornment>
                            <IconButton><LinkSimple onClick={() => { setOpenActions((prev) => !prev) }} /></IconButton>
                        </InputAdornment>
                    </Stack>
                ),
                endAdornment: <InputAdornment><IconButton onClick={() => { setOpenPicker((prev) => !prev) }}><Smiley /></IconButton></InputAdornment>
            }}>
        </StyledInput>
    )
}

const Footer = () => {
    const theme = useTheme();
    const [openPicker, setOpenPicker] = useState(false);
    return (
        <Box p={2} sx={{ width: "100%", boxShadow: "0px 0px 2px rgba(0,0,0,0.25)", backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.default }}>
            <Stack direction="row" alignItems="center" spacing={3}>
                {/* Chat Input */}
                <Stack sx={{ width: "100%" }}>
                    <Box sx={{ display: openPicker ? "inline" : "none", zIndex: 10, position: "fixed", bottom: 81, right: 100 }}>
                        <Picker data={data} onEmojiSelect={console.log} theme={theme.palette.mode} />
                    </Box>
                    <ChatInput setOpenPicker={setOpenPicker} />
                </Stack>

                {/* Chat Send button */}
                <Box sx={{ height: 48, width: 48, borderRadius: 1.5, backgroundColor: theme.palette.primary.main }}>
                    <Stack alignItems="center" justifyContent="center" sx={{ width: "100%", height: "100%" }}>
                        <IconButton>
                            <PaperPlaneTilt color='#fff' />
                        </IconButton>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}

export default Footer

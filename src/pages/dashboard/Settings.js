import React, { useState } from "react";
import { Avatar, Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Bell, CaretLeft, Image, Info, Key, Keyboard, Lock, Note, PencilCircle } from "phosphor-react";
import { faker } from "@faker-js/faker";
import Shortcuts from "../../sections/settings/Shortcuts";

const Settings = () => {
    const theme = useTheme();

    const [openShortcuts, setopenShortcuts] = useState(false);

    const handleOpenShortcuts = () => {
        setopenShortcuts(true);
    }
    const handleCloseShortcuts = () => {
        setopenShortcuts(false);
    }

    const list = [
        {
            key: 0,
            icon: <Bell size={20} />,
            title: "Notifications",
            onclick: () => { }
        },
        {
            key: 1,
            icon: <Lock size={20} />,
            title: "Privacy",
            onclick: () => { }
        },
        {
            key: 2,
            icon: <Key size={20} />,
            title: "Security",
            onclick: () => { }
        },
        {
            key: 3,
            icon: <PencilCircle size={20} />,
            title: "Theme",
            // onclick: handleOpenTheme
            onclick: () => { }
        },
        {
            key: 4,
            icon: <Image size={20} />,
            title: "Chat Wallpaper",
            onclick: () => { }
        },
        {
            key: 5,
            icon: <Note size={20} />,
            title: "Request Account Info",
            onclick: () => { }
        },
        {
            key: 6,
            icon: <Keyboard size={20} />,
            title: "Keyboard Shortcuts",
            onclick: handleOpenShortcuts
        },
        {
            key: 7,
            icon: <Info size={20} />,
            title: "Help",
            onclick: () => { }
        },
    ]

    return (
        <>
            <Stack direction="row" sx={{ width: "100%" }}>
                {/* Left Panel */}
                <Box className="scrollbar"
                    sx={{
                        overflowY: "scroll",
                        height: "100vh",
                        width: 320,
                        backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background,
                        boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
                    }}>
                    <Stack p={4} spacing={5}>
                        {/* Header */}
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <IconButton><CaretLeft size={28} color="#4B4B4B" /></IconButton>
                            <Typography variant="h4">Settings</Typography>
                        </Stack>

                        {/* Profile */}
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Avatar sx={{ height: 56, width: 56 }} src={faker.image.avatar()} alt={faker.name.fullName()} />
                            <Stack spacing={0.5}>
                                <Typography variant="article">{faker.name.fullName()}</Typography>
                                <Typography variant="body2">{faker.random.words()}</Typography>
                            </Stack>
                        </Stack>

                        {/* List of options */}
                        <Stack spacing={3} >
                            {list.map(({ key, icon, title, onclick }) => <>
                                <Stack key={key} spacing={1.5} onClick={onclick} sx={{ cursor: "pointer" }}>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        {icon}
                                        <Typography variant="body2">{title}</Typography>
                                    </Stack>
                                    {key !== 7 && <Divider />}
                                </Stack>
                            </>)}
                        </Stack>

                    </Stack>
                </Box>


                {/* Right Panel */}
            </Stack>
            {openShortcuts && <Shortcuts open={openShortcuts} handleClose={handleCloseShortcuts} />}
        </>
    );
};

export default Settings;

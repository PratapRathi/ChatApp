import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, Stack, Typography } from '@mui/material';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const list = [
    {
        key: 0,
        title: "Mark as unread",
        combination: ["Ctrl", "Shift", "U"]
    },
    {
        key: 1,
        title: "Mute",
        combination: ["Ctrl", "Shift", "M"]
    },
    {
        key: 2,
        title: "Archive Chat",
        combination: ["Ctrl", "Shift", "E"]
    },
    {
        key: 3,
        title: "Delete Chat",
        combination: ["Ctrl", "Shift", "D"]
    },
    {
        key: 4,
        title: "Pin Chat",
        combination: ["Ctrl", "Shift", "P"]
    },
    {
        key: 5,
        title: "Search",
        combination: ["Ctrl", "F"]
    },
    {
        key: 6,
        title: "Search Chat",
        combination: ["Ctrl", "Shift", "F"]
    },
    {
        key: 7,
        title: "New Chat",
        combination: ["Ctrl", "N"]
    },
    {
        key: 8,
        title: "Next Chat",
        combination: ["Ctrl", "Tab"]
    },
    {
        key: 9,
        title: "Previous Chat",
        combination: ["Ctrl", "Shift", "Tab"]
    },
    {
        key: 10,
        title: "New group",
        combination: ["Ctrl", "Shift", "N"]
    },
    {
        key: 11,
        title: "Profile & About",
        combination: ["Ctrl", "P"]
    },
    {
        key: 12,
        title: "Increase speed of voice message",
        combination: ["Shift", "+"]
    },
    {
        key: 13,
        title: "Decrease speed of voice message",
        combination: ["Shift", "-"]
    },
    {
        key: 14,
        title: "Emoji Panel",
        combination: ["Ctrl", "E"]
    },
    {
        key: 15,
        title: "Sticker Panel",
        combination: ["Ctrl", "S"]
    },
    {
        key: 16,
        title: "Settings",
        combination: ["Ctrl", "."]
    },
]

const Shortcuts = ({ open, handleClose }) => {
    return (
        <>
            <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose} keepMounted TransitionComponent={Transition} sx={{ p: 4 }}>
                <DialogTitle>Keyboard Shortcuts</DialogTitle>
                <DialogContent sx={{ mt: 4 }}>
                    <Grid container spacing={3}>
                        {list.map(({ key, title, combination }) =>
                            <Grid key={key} item xs={6}>
                                <Stack sx={{ width: "100%" }} justifyContent="space-between" spacing={3} direction="row" alignItems="center">
                                    <Typography variant='caption' sx={{ fontSize: 14 }}>{title}</Typography>
                                    <Stack direction="row" spacing={2}>
                                        {combination.map((el, i) =>
                                            <Button key={i} disabled variant='contained' sx={{ color: "#212121" }}>{el}</Button>
                                        )}
                                    </Stack>
                                </Stack>
                            </Grid>
                        )}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Shortcuts;

import React from 'react'
import { Avatar, Badge, Box, Stack, Typography } from '@mui/material';
import StyledBadge from './StyledBadge';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import {SelectConversation} from '../redux/slices/app'


const ChatElement = ({ id, name, img, msg, time, unread, online }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    return (
        <Box onClick={()=>{dispatch(SelectConversation({room_id: id}))}} sx={{ cursor:"pointer", width: "100%", borderRadius: 1, backgroundColor: theme.palette.mode === "light" ? "#fff" : theme.palette.background.default }} p={2}>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={2}>
                    {online ? <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
                        <Avatar src={img} />
                    </StyledBadge>
                        : <Avatar src={img} />}

                    <Stack spacing={0.3}>
                        <Typography variant='subtitle2'>{name}</Typography>
                        <Typography variant='caption'>{msg}</Typography>
                    </Stack>
                </Stack>

                <Stack spacing={2} direction="column" alignItems="center">
                    <Typography sx={{ fontWeight: 500 }}>{time}</Typography>
                    <Badge color='primary' badgeContent={unread}></Badge>
                </Stack>
            </Stack>
        </Box>
    )
}

export default ChatElement

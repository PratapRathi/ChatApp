import React, { useEffect, useState } from 'react';
import { Box, IconButton, Stack, Typography, Button, Divider } from '@mui/material';
import { ArchiveBox, CircleDashed, MagnifyingGlass, Users } from 'phosphor-react';
import { useTheme } from '@mui/material/styles';
import { SimpleBarStyle} from "../../components/Scrollbar";
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search/index.js';
import ChatElement from '../../components/ChatElement.js';
import Friends from '../../sections/main/Friends.js';
import { socket } from '../../socket.js';
import { useDispatch, useSelector } from 'react-redux';
import { FetchDirectConversation } from '../../redux/slices/conversation.js';


const user_id = window.localStorage.getItem("user_id");

const Chats = () => {
    const theme = useTheme();
    const {conversation} = useSelector((state)=> state.conversation.direct_chat);
    const dispatch = useDispatch();
    const [openDialog, setOpenDialog] = useState(false);
    useEffect(()=>{
        socket.emit("get_direct_conversations", {user_id}, (data)=>{
            // data => list of existing conversation
            dispatch(FetchDirectConversation({conversations:data}));
        })
    },[]); // eslint-disable-line react-hooks/exhaustive-deps
    const handleOpenDialog = ()=> {
        setOpenDialog(true);
    }
    const handleCloseDialog = ()=> {
        setOpenDialog(false);
    }
    return (
        <>
        <Box sx={{ position: "relative", width: 320, boxShadow: "0px 0px 2px rgba(0,0,0,0.25)", backgroundColor: theme.palette.mode === "light"? "#F8FAFF" : theme.palette.background.default }}>
            <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant='h5'>Chats</Typography>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.3}>
                    <IconButton onClick={()=>{handleOpenDialog()}}>
                        <Users/>
                    </IconButton>
                    <IconButton>
                        <CircleDashed />
                    </IconButton>
                    </Stack>
                </Stack>

                <Stack sx={{ width: "100%" }}>
                    <Search>
                        <SearchIconWrapper>
                            <MagnifyingGlass color='#709CE6' />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder='Search...' />
                    </Search>
                </Stack>

                <Stack spacing={1}>
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                        <ArchiveBox size={24} />
                        <Button>Archived</Button>
                    </Stack>
                    <Divider />
                </Stack>

                <Stack className='scrollbar' direction="column" sx={{ flexGrow: 1, overflowY: "auto", height: '100%' }} >
                    <SimpleBarStyle timeout={500} clickOnTrack={false}> 
                            <Stack spacing={2.4}>
                                {/* <Typography variant='subtitle2' sx={{ color: '#676667' }}>Pinned</Typography>
                                {ChatList.filter((el) => el.pinned).map((el, i) => { return <ChatElement key={i} {...el} />; })} */}
                                <Typography variant='subtitle2' sx={{ color: '#676667' }}>All Chats</Typography>
                                {conversation.filter((el) => !el.pinned).map((el, i) => { return <ChatElement key={i} {...el} />; })}
                            </Stack>
                    </SimpleBarStyle>
                </Stack>

            </Stack>
        </Box>
        {openDialog && <Friends open={openDialog} handleClose={handleCloseDialog} />}
        </>
    )
}

export default Chats

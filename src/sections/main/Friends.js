import React, { useEffect, useState } from 'react'
import {Stack, Dialog, Tab, Tabs, DialogContent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFriends, fetchRequests, fetchUsers } from '../../redux/slices/app';
import { FriendComponent, FriendRequestComponent, UserComponent } from '../../components/UserElement';



const UsersList = ()=>{
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchUsers());
    },[]); // eslint-disable-line react-hooks/exhaustive-deps

    const {users} = useSelector((state)=> state.app);

    return(
        <>
            {users.map((el,idx)=>{
                // Render user component to send friend request
                return (
                    <UserComponent key={idx} {...el} />
                )
            })}
        </>
    )
}

const FriendList = ()=>{
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchFriends());
    },[]); // eslint-disable-line react-hooks/exhaustive-deps

    const {friends} = useSelector((state)=> state.app);

    return(
        <>
            {friends.map((el,idx)=>{
                // Render friend component to start new chat
                return (
                    <FriendComponent key={idx} {...el} />
                )
            })}
        </>
    )
}

const FriendRequestList = ()=>{
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchRequests());
    },[]); // eslint-disable-line react-hooks/exhaustive-deps

    const {friendRequests} = useSelector((state)=> state.app);

    return(
        <>
            {friendRequests.map((el,idx)=>{
                // el => {_el, sender:{_id,firstname,lastname, img, online}}
                // Render friend-request component to send friend request
                return (
                    <FriendRequestComponent key={idx} id={el._id} {...el.sender} />
                )
            })}
        </>
    )
}



const Friends = ({open, handleClose}) => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
  return (
    <>
        <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose} keepMounted sx={{p:4}}>
            <Stack className='unique' sx={{p:2 ,width:"100%"}}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Explore" />
                    <Tab label="Friends" />
                    <Tab label="Requests" />
                </Tabs>
            </Stack>
            {/* Dialog Content */}
            <DialogContent>
                <Stack sx={{width:"100%"}}>
                    <Stack spacing={2.5}>
                        {(()=>{
                            switch (value) {
                                case 0:     // Display all Users
                                    return <UsersList/>
                                case 1:     // Display all Friends
                                    return <FriendList/>                                    
                                case 2:     // Display all Friend-Requests
                                    return <FriendRequestList/>
                                default:
                                    break;
                            }
                        })()}
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    </>
  )
}

export default Friends

import React, { useEffect } from 'react'
import { Box, Stack } from '@mui/material';
import { Chat_History } from '../../data';
import { DocMsg, LinkMsg, MediaMsg, ReplyMsg, TextMsg, Timeline } from './MsgTypes';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../socket.js'
import { UpdateCurrentMessages } from '../../redux/slices/conversation.js';

const user_id = window.localStorage.getItem("user_id");

const Message = ({ menu }) => {
    const { current_conversation, current_messages } = useSelector((state) => state.conversation.direct_chat)
    const dispatch = useDispatch();
    const conversation_id = current_conversation.id;
    useEffect(() => {
        socket.emit("get_messages", { conversation_id }, (messages) => {
            let current_messages = [];
            if (messages !== null && messages.messages.length > 0) {
                current_messages = messages.messages.map((el) => (
                    {
                        type: "msg",
                        message: el.text,
                        incoming: el.from.toString() !== user_id,
                        outgoing: el.from.toString() === user_id,
                    }
                ))
                dispatch(UpdateCurrentMessages({ selected_messages: current_messages }));
            }
            else {
                dispatch(UpdateCurrentMessages({ selected_messages: current_messages }));
            }
        })
    }, [conversation_id]);
    return (
        <Box p={3}>
            <Stack spacing={3}>
                {current_messages.map((el, idx) => {
                    switch (el.type) {
                        case "divider":
                            return <Timeline key={idx} el={el} />

                        case "msg":
                            switch (el.subtype) {
                                case "img":
                                    // img msg
                                    return <MediaMsg key={idx} el={el} menu={menu} />

                                case "doc":
                                    // doc msg
                                    return <DocMsg key={idx} el={el} menu={menu} />

                                case "link":
                                    // link msg
                                    return <LinkMsg key={idx} el={el} menu={menu} />

                                case "reply":
                                    // reply msg
                                    return <ReplyMsg key={idx} el={el} menu={menu} />

                                default:
                                    // Text Message
                                    return <TextMsg key={idx} el={el} menu={menu} />
                            }

                        default:
                            return <></>;
                    }
                })}
            </Stack>
        </Box>
    )
}

export default Message

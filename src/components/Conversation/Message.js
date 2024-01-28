import React from 'react'
import { Box, Stack } from '@mui/material';
import { Chat_History } from '../../data';
import { DocMsg, LinkMsg, MediaMsg, ReplyMsg, TextMsg, Timeline } from './MsgTypes';

const Message = ({menu}) => {
    return (
        <Box p={3}>
            <Stack spacing={3}>
                {Chat_History.map((el,idx) => {
                    switch (el.type) {
                        case "divider":
                            return <Timeline key={idx} el={el} />

                        case "msg":
                            switch (el.subtype) {
                                case "img":
                                    // img msg
                                    return <MediaMsg key={idx} el={el} menu={menu}/>

                                case "doc":
                                    // doc msg
                                    return <DocMsg key={idx} el={el} menu={menu}/>

                                case "link":
                                    // link msg
                                    return <LinkMsg key={idx} el={el} menu={menu}/>

                                case "reply":
                                    // reply msg
                                    return <ReplyMsg key={idx} el={el} menu={menu}/>

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

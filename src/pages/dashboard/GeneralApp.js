import React from "react";
import Chats from "./Chats";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import Conversation from "../../components/Conversation";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import SharedMessages from "../../components/SharedMessages";
import StarredMessage from "../../components/StarredMessage";
import NoChatSVG from "../../assets/Illustration/NoChat";

const GeneralApp = () => {
  const theme = useTheme();
  const { sidebar, chat_type, room_id } = useSelector((store) => store.app);
  return (
    <Stack direction="row" sx={{ width: "100%" }}>
      {/* Chats  */}
      <Chats />

      {/* Conversation */}
      <Box sx={{ width: sidebar.open ? "calc(100vw - 740px)" : "calc(100vw - 420px)", backgroundColor: theme.palette.mode === "light" ? "#F0F4FA" : theme.palette.background.paper }}>
        {room_id !== null && chat_type==="individual"? <Conversation /> : 
          <Stack spacing={2} sx={{width:"100%", height:"100%"}} alignItems="center" justifyContent="center">
            <NoChatSVG/>
            <Typography variant="subtitle2">
              Select a conversation to start new one...
            </Typography>
          </Stack>
        }
        
      </Box>

      {/* Contact */}
      {sidebar.open && (() => {
        switch (sidebar.type) {
          case "CONTACT":
            return <Contact />
          case "STARRED":
            return <StarredMessage/>
          case "SHARED":
            return <SharedMessages />
          default:
            break;
        }
      })()}
    </Stack>
  );
};

export default GeneralApp;

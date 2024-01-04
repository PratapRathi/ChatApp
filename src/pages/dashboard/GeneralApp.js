import React from "react";
import Chats from "./Chats";
import { Box, Stack, useTheme } from "@mui/material";
import Conversation from "../../components/Conversation";

const GeneralApp = () => {

  const theme = useTheme();

  return (
    <Stack direction="row" sx={{ width: "100%" }}>
      {/* Chats  */}
      <Chats />

      {/* Conversation */}
      <Box sx={{ width: "calc(100vw - 420px)", backgroundColor: theme.palette.mode === "light" ? "#fff" : theme.palette.background.default}}>
        <Conversation />
      </Box>
    </Stack>
  );
};

export default GeneralApp;

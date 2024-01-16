import React, { useState } from "react";
import { Box, Divider, IconButton, Link, Stack, Typography, useTheme } from "@mui/material";
import { MagnifyingGlass, Plus } from "phosphor-react";
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search/index.js';
import { SimpleBarStyle } from "../../components/Scrollbar.js";
import { ChatList } from "../../data/index.js";
import ChatElement from "../../components/ChatElement.js";
import CreateGroup from "../../sections/main/CreateGroup.js";

const Group = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        {/* Left */}
        <Box
          sx={{
            height: "100vh",
            backgroundColor: (theme) => theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background,
            width: 320,
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)"
          }}>
          <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
            <Stack>
              <Typography variant="h5">Groups</Typography>
            </Stack>

            <Stack sx={{ width: "100%" }}>
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass color='#709CE6' />
                </SearchIconWrapper>
                <StyledInputBase placeholder='Search...' />
              </Search>
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle2" component={Link}>Create New Group</Typography>
              <IconButton onClick={()=>setOpenDialog(true)}><Plus style={{ color: theme.palette.primary.main }} /></IconButton>
            </Stack>
            <Divider />

            <Stack className='scrollbar' sx={{ flexGrow: 1, overflowY: "auto", height: '100%' }}>
              <SimpleBarStyle timeout={500} clickOnTrack={false}>
                <Stack spacing={2.4}>
                  {/* Heading */}
                  <Typography variant='subtitle2' sx={{ color: '#676667' }}>Pinned</Typography>
                  {/* Chat List */}
                  {ChatList.filter((el) => el.pinned).map((el, i) => { return <ChatElement key={i} {...el} />; })}
                  {/* Heading */}
                  <Typography variant='subtitle2' sx={{ color: '#676667' }}>All Groups</Typography>
                  {/* Chat List */}
                  {ChatList.filter((el) => !el.pinned).map((el, i) => { return <ChatElement key={i} {...el} />; })}
                </Stack>
              </SimpleBarStyle>
            </Stack>

          </Stack>
        </Box>


        {/* Right */}
        {/* //TODO => Reuse Conversation component */}

      </Stack>
      {openDialog && <CreateGroup open={openDialog} handleClose={handleCloseDialog}/>}
    </>
  );
};

export default Group;

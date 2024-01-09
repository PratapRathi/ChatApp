import React from 'react'
import { Bell, CaretRight, Phone, Prohibit, Star, Trash, VideoCamera, X } from 'phosphor-react';
import { Avatar, Box, Button, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material'
import { useDispatch } from 'react-redux';
import { ToggleSidebar } from '../redux/slices/app';
import AntSwitch from './AntSwitch'
import { faker } from '@faker-js/faker';

const Contact = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  return (
    <Box sx={{ width: 320, height: "100vh" }}>
      <Stack sx={{ height: "100%" }}>
        {/* Header */}
        <Box sx={{ width: "100%", backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background, boxShadow: "0px 0px 2px rgba(0,0,0,0.25)" }}>
          <Stack sx={{ height: "100%" }} p={2} direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant='subtitle1'>Contact Info</Typography>
            <IconButton onClick={() => dispatch(ToggleSidebar())}><X /></IconButton>
          </Stack>
        </Box>

        {/* Body */}
        <Stack className='scrollbar' height="100%" p={3} spacing={3} position="relative" sx={{ flexGrow: 1, overflowY: "scroll" }}>
          <Stack alignItems="center" direction="row" spacing={3}>
            <Avatar src={faker.image.avatar()} alt={faker.name.firstName()} sx={{ height: 64, width: 64 }} />
            <Stack spacing={0.5}>
              <Typography variant='article' fontWeight={600}>{faker.name.fullName()}</Typography>
              <Typography variant='body2' fontWeight={500}>{"+91 8171084566"}</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-evenly">
            <Stack spacing={1} alignItems="center">
              <IconButton><Phone /></IconButton>
              <Typography variant='overline'>Voice</Typography>
            </Stack>
            <Stack spacing={1} alignItems="center">
              <IconButton><VideoCamera /></IconButton>
              <Typography variant='overline'>Video</Typography>
            </Stack>
          </Stack>

          <Divider />
          <Stack spacing={0.5}>
            <Typography variant='article'>About</Typography>
            <Typography variant='body2'>{"Hi there, I am using Chat App"}</Typography>
          </Stack>
          <Divider />

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant='subtitle'>Media, Links & Docs</Typography>
            <Button endIcon={<CaretRight />}>{"201"}</Button>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            {[1, 2, 3].map((el) => (
              <Box><img src={faker.image.food()} alt={faker.name.fullName} /></Box>
            ))}
          </Stack>

          <Divider />
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Star size={21} weight="fill" color="#ffd700" />
              <Typography variant='subtitle2'>Starred Messages</Typography>
            </Stack>
            <IconButton><CaretRight /></IconButton>
          </Stack>
          <Divider />

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Bell size={21} weight="bold" />
              <Typography variant='subtitle2'>Mute Notifications</Typography>
            </Stack>
            <AntSwitch />
          </Stack>
          <Divider />

          <Typography>{`${1} group in common`}</Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />
            <Stack spacing={0.5}>
              <Typography variant='subtitle2'>Coding Monk</Typography>
              <Typography variant='caption'>Owl, Parrot, Rabbit, You</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={2} >
              <Button startIcon={<Prohibit/>} fullWidth variant='outlined'>Block</Button>
              <Button startIcon={<Trash/>} fullWidth variant='outlined'>Delete</Button>
          </Stack>

        </Stack>
      </Stack>
    </Box>
  )
}

export default Contact

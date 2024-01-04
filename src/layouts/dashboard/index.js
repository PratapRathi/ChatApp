import { useTheme} from "@mui/material/styles";
import { Avatar, Box, Divider, IconButton, Stack} from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Logo from "../../assets/Images/logo.ico"
import { Nav_Buttons } from "../../data/index.js"
import { Gear } from "phosphor-react";
import { faker } from '@faker-js/faker';
import useSettings from "../../hooks/useSettings.js";
import AntSwitch from "../../components/AntSwitch.js"



const DashboardLayout = () => {

  const [selected, setSelectecd] = useState(0);
  const theme = useTheme();
  const {onToggleMode} = useSettings();

  return (
    <Stack direction="row">
      <Box
        p={2}
        sx={{
          backgroundColor: theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          height: "100vh",
          width: 100
        }}>
        <Stack direction="column" alignItems="center" justifyContent="space-between" sx={{ width: "100%", height: "100%"}} spacing={3}>
          <Stack alignItems="center" spacing={4}>            
            <Box
              sx={{
                backgroundColor: theme.palette.primary.main,
                height: 64,
                width: 64,
                borderRadius: 1.5
              }}>
              <img src={Logo} alt="Logo" />
            </Box>
            
            <Stack sx={{ width: "max-content" }} direction="column" alignItems="center" spacing={3}>
              {Nav_Buttons.map((el) => (
                el.index === selected ?
                  <Box key={el.index} sx={{ backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }}>
                    <IconButton key={el.index} sx={{ width: "max-content", color: "#fff" }}>{el.icon}</IconButton>
                  </Box>
                  : <IconButton onClick={() => { setSelectecd(el.index) }} key={el.index} sx={{ width: "max-content", color: theme.palette.mode === "light" ? "#000" : theme.palette.text.primary }}>{el.icon}</IconButton>
              ))}
              <Divider sx={{ width: "48px" }} />
              {selected === 3 ? (
                <Box sx={{ backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }}>
                  <IconButton sx={{ width: "max-content", color: "#fff" }}>
                    <Gear />
                  </IconButton>
                </Box>
              ) : (
                <IconButton onClick={() => { setSelectecd(3) }} sx={{ width: "max-content", color: theme.palette.mode === "light" ? "#000" : theme.palette.text.primary }}>
                  <Gear />
                </IconButton>
              )
              }
            </Stack>
          </Stack>

          <Stack spacing={4} alignItems="center">
            <AntSwitch onChange={()=>{onToggleMode()}} defaultChecked/>
            <Avatar src={faker.image.avatar()} />
          </Stack>
        </Stack>
      </Box>
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
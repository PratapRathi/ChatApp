import React from "react";
import {Navigate, Outlet } from "react-router-dom";
import {Stack} from "@mui/material";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";



const DashboardLayout = () => {
  const{isLoggedIn} = useSelector((state)=> state.auth);
  if(!isLoggedIn){
    return <Navigate to="/auth/login" />
  }

  return (
    <Stack direction="row">
      {/* SideBar */}
      <SideBar/>
      
      {/* Rest Child Route Components */}
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
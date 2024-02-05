import React, { useEffect } from "react";
import {Navigate, Outlet } from "react-router-dom";
import {Stack} from "@mui/material";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, socket } from "../../socket";
import { openSnackbar } from "../../redux/slices/app";



const DashboardLayout = () => {
  const dispatch = useDispatch();
  const{isLoggedIn} = useSelector((state)=> state.auth);

  const user_id = window.localStorage.getItem("user_id");

  
  useEffect(()=>{
    if(isLoggedIn){
      window.onload = function(){
        if(!window.location.hash){
          window.location = window.location + '#loaded';
          window.location.reload();
        }
      }
      window.onload();
      if(!socket){
        connectSocket(user_id);
      }

      // New Friend Request
      socket.on("request_sent",(data)=>{
        console.log(data);
        dispatch(openSnackbar( "success", data.message));
      });
      socket.on("new_friend_request",(data)=>{
        dispatch(openSnackbar("success",data.message));
      });
      socket.on("request_accepted",(data)=>{
        dispatch(openSnackbar("success",data.message));
      });
    }


    // Remove event listener on component unmount
    return ()=>{
      socket?.off("request_sent");
      socket?.off("new_friend_request");
      socket?.off("request_accepted");
    }
  },[isLoggedIn, socket])

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
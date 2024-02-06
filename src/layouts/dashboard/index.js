import React, { useEffect } from "react";
import {Navigate, Outlet } from "react-router-dom";
import {Stack} from "@mui/material";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, socket } from "../../socket";
import { SelectConversation, openSnackbar } from "../../redux/slices/app";
import { AddDirectConversation, UpdateDirectConversation, AddNewTextMessage } from "../../redux/slices/conversation";



const DashboardLayout = () => {
  const dispatch = useDispatch();
  const{isLoggedIn} = useSelector((state)=> state.auth);
  const{conversation} = useSelector((state)=> state.conversation.direct_chat);

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
      socket.on("start_chat", (data)=>{
        const existing_conversation = conversation.find((el)=> el._id === data._id);
        if(existing_conversation){
          dispatch(UpdateDirectConversation({conversation: data}));
        }
        else{
          // Add direct conversation
          dispatch(AddDirectConversation({conversation: data}));
        }
        dispatch(SelectConversation({room_id: data._id}));
      });
      socket.on("new_text_message", (data)=>{
        const {conversation_id, message} = data;
        dispatch(AddNewTextMessage({conversation_id, message}));
      })
    }


    // Remove event listener on component unmount
    return ()=>{
      socket?.off("request_sent");
      socket?.off("new_friend_request");
      socket?.off("request_accepted");
      socket?.off("start_chat");
      socket?.off("new_text_message");
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
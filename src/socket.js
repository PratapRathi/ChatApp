import io from "socket.io-client";

let socket;

const connectSocket = (user_id) => {
    socket = io("http://localhost:3500/",{
        query: `user_id=${user_id}`
    })
}


export{ socket, connectSocket };
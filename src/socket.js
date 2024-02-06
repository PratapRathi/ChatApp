import io from "socket.io-client";
import { BASE_URL } from "./config";

let socket;

// const connectSocket = (user_id) => {
//     socket = io("http://localhost:3500/",{
//         query: `user_id=${user_id}`
//     })
// }

const connectSocket = (user_id) => {
    socket = io(BASE_URL,{
        query: `user_id=${user_id}`
    })
}


export{ socket, connectSocket };
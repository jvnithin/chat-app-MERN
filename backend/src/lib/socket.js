import {Server } from "socket.io"
import http from "http"
import express from "express";


const app=express();

const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:["http://localhost:5173"]

    }
})

export function getReceiverSocketId(userId){
    return userSockerMap[userId];
}

//store online users
const userSockerMap={};
io.on("connection",(socket)=>{
    console.log("A user is connected",socket.id)
    const userId=socket.handshake.query.userId
    if(userId) userSockerMap[userId]=socket.id
    io.emit("getOnlineUsers",Object.keys(userSockerMap))

    socket.on("disconnect",()=>{
        console.log("A user is disconnected",socket.id)
        delete userSockerMap[userId]
        io.emit("getOnlineUsers",Object.keys(userSockerMap))
    })
})
export {io,server,app}
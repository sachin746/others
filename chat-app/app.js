const http=require('http');
const path=require('path');
var express=require('express');
const formatmsg=require('./utilis/messages')
const socketio=require('socket.io');
const botname='Chatbot';
const {userJion,getcurruser,userleave,getroomusers}=require('./utilis/user');

var app=express();
const server=http.createServer(app);
const io=socketio(server);

var port=process.env.PORT||3000;

const publicDir=path.join(__dirname,'public');
app.use(express.static(publicDir))

io.on('connection',socket=>{

    socket.on('joinroom',({username,room})=>{
        const user=userJion(socket.id,username,room)
        socket.join(user.room)

         //welcome cureent user
    socket.emit('message',formatmsg(botname,'Welcome to chat app'))

    //broadcast when a user connects
    socket.broadcast.to(user.room).emit('message',formatmsg(botname,` ${username} has joined the chat`))

    //send users info
    io.to(user.room).emit('roomusers',{
        room:user.room,
        users:getroomusers(user.room)
    })
    })

    socket.on('chatMessage',msg=>{
        const user=getcurruser(socket.id);
        io.to(user.room).emit('message',formatmsg(user.username,msg))
    })

    //this runs when somwone disconnect
    socket.on('disconnect',()=>{
        const user=userleave(socket.id);
        if(user){
            io.to(user.room).emit('message',formatmsg(botname,`${user.username} has left the chat`))
            //remove forom frontend users
             //send users info
        io.to(user.room).emit('roomusers',{
        room:user.room,
        users:getroomusers(user.room)
            })
        }
    })

})

server.listen(port,()=>{
    console.log(`server has started at port ${port}`)
})
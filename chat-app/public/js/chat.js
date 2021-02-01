const chatForm=document.getElementById('chat-form');
const chatMessage=document.querySelector('.chat-messages')
const roomname=document.getElementById('room-name');
const userlist=document.getElementById('users')

//get username from url
const{username,room}=Qs.parse(location.search,{
    ignoreQueryPrefix:true
})

const socket=io();

//join chatroom
socket.emit('joinroom',{username,room})

//get room and users
socket.on('roomusers',({room,users})=>{
    outputroomname(room);
    outputusers(users);
})

socket.on('message',message=>{
    console.log(message)
    outputmsg(message)
    //scroll down
    chatMessage.scrollTop=chatMessage.scrollHeight;
})

//message submit
chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg=e.target.elements.msg.value;
    socket.emit('chatMessage',msg);
    e.target.elements.msg.value='';
    e.target.elements.msg.focus();
})
function outputmsg(message){
    const div=document.createElement('div');
    div.classList.add('message');
    div.innerHTML=`	<p class="meta">${message.username} <span>${message.time}:${message.min}:${message.sec}</span></p>
    <p class="text">
       ${message.textmsg}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div)
}

//room 
function outputroomname(room){
    roomname.innerText=room;
}

//users
function outputusers(users){
    userlist.innerHTML=`${users.map(user=>`<li>${user.username}</li>`).join('')}`
}
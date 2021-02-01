const users=[];
//join user to chat
function userJion(id,username,room){
    const user={id,username,room};

    users.push(user);
    return user;
}

//get the current user
function getcurruser(id){
    return users.find(user=>user.id===id);
}
function userleave(id){
    const index=users.findIndex(user=>user.id===id);
    if(index!=='-1'){
        return users.splice(index,1)[0]
    }
}
//get room users
function getroomusers(room){
    return users.filter(user=>user.room===room)
}

module.exports={
    userJion,
    getcurruser,
    userleave,
    getroomusers
}
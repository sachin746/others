function formatmsg(username,textmsg){
    return{
        username,
        textmsg,
        time:new Date().getUTCHours(),
        min:new Date().getUTCMinutes(),
        sec:new Date().getUTCSeconds()

    }
}

module.exports=formatmsg;
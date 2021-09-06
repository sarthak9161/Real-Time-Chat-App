const socket =io()
var audio = new Audio('/ting.mp3');
let name;
let messageArea=document.querySelector('.message__area')

let textarea=document.querySelector('#textArea')
do{

    name=prompt("Enter your name:")

}while(!name)

textarea.addEventListener('keyup',(e)=>{

    if(e.key=='Enter'){

        sendMessage(e.target.value)
    }

})

function sendMessage(message){
    let msg={
        user:name,
        message:message.trim()
    }

    //append msg
    appendMsg(msg,'outgoing')
    textarea.value=''
    scrolltoBottom()

    //send to server
    socket.emit('message',msg)
}

function appendMsg(msg,type){
    let maindiv=document.createElement('div')
    let className=type
    maindiv.classList.add(className,'message')
    if(type == 'incoming'){
        // console.log('sound is playing');
        audio.play();
    }

    let markup=`

    <h4>${msg.user}</h4>
    <p>${msg.message}</p>

    `

    maindiv.innerHTML=markup
    messageArea.appendChild(maindiv)


}

//receive msg
socket.on('message',(msg)=>{
    appendMsg(msg,'incoming')
  
    scrolltoBottom()
})

function scrolltoBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}



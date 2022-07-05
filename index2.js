const socket = io("ws://192.168.29.137:3000/chat");
console.log(socket);

const name = prompt("enter your name ");

function getAllMessages() {
    // socket.emit('findAllMessages')
    socket.on('findAllMessages',(data) => {
        console.log(data);
        const messages = JSON.parse(data);
        console.log(messages);          
        messages.forEach(user => {
            addMessage(user);
        });
    })
};

function sendMessage(){
    // const name = document.querySelector('#user-name-input').value
    const message = document.querySelector('#text-input').value;
    document.querySelector('#text-input').value = null;
    socket.emit('createMessage',{name,message});
}

function addMessage(message){
    const messageBox = document.querySelector('.message-box');
    console.log('message to be added',message);
    const mess = document.createElement('p');
    mess.innerHTML = `[${message.name}] : ${message.message}` ;
    messageBox.appendChild(mess);
}
const response =socket.on('message',(payload) => addMessage(JSON.parse(payload)));
console.log(response);
socket.on('connection',getAllMessages);
socket.on('createMessage',addMessage);

/// query selecting the button
const sendButton = document.querySelector('#send-button');
sendButton.addEventListener('click',sendMessage)
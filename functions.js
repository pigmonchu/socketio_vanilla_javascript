const namespace = '/test';

// Connect to the Socket.IO server.
// The connection URL has the following format, relative to the current page:
//     http[s]://<domain>:<port>[/<namespace>]
const socket = io('ws://localhost:5000')

// Event handler for new connections.
// The callback function is invoked when a connection with the
// server is established.
socket.on('connect', (data) => {
    console.log("He conectado:", data)
    //socket.emit('message', {data: "I\'m the client and I has connected!"});
});

socket.on('output', (data) => {
    p = data.param
    msg = data.msg
    v = prompt(msg)
    document.querySelector(`#${p}`).value = v
    submitAdd()
})

const setData = (value) => {
    document.querySelector("#data").innerHTML += (value +'<br />')
}

// Event handler for server sent data.
// The callback function is invoked whenever the server emits data
// to the client. The data is then displayed in the "Received"
// section of the page.
socket.on('identified', (msg) => {
    localStorage.setItem('socketId', msg.id)
    setData(msg.id)
});

socket.on('close', (data) => {
    console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
    setTimeout(function() {
      connect();
    }, 1000);
});


const xhr = new XMLHttpRequest();

const reqHandler = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText)
        json = JSON.parse(xhr.response)
        document.querySelector("#resultado").innerHTML= json.result
    } else {
        setData(xhr.readyState+","+xhr.status)
    }
}

xhr.onload = reqHandler;

const submitAdd = () => {
    const json = {
        "op1": document.querySelector("#op1").value,
        "op2": document.querySelector("#op2").value,
        "iid": localStorage.getItem('socketId') || ''
    };

    xhr.open('POST', 'http://localhost:5000/api/v1.0/add')
    
    // set `Content-Type` header
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    // set `Content-Type` header
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    // send rquest with JSON payload
    xhr.send(JSON.stringify(json));


}

// create a JSON object

const handleClick = (ev) => {
    ev.preventDefault();
    submitAdd()
}

const btnAceptar = document.querySelector("#btnSuma")
btnAceptar.addEventListener('click', handleClick, false)

const getCookie = (cname) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

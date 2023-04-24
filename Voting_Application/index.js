const {WebSocketServer,WebSocket} = require("ws");

const wss = new WebSocketServer({port:7821});

const candidates = [
    {name:"Haroon",id:1,votes:0},
    {name:"Rizwan",id:2,votes:0},
    {name:"Rehan",id:3,votes:0}
]

wss.on("connection",(socket) => {
    console.log("new connection extablished")
    socket.send(JSON.stringify(candidates));

    socket.send("message",(data)=>{
        console.log(data);
        data = JSON.parse(data)
        const {id} = data;
        console.log(id)
        candidates.forEach((candidate)=>{
            if(candidate.id===id) candidate.votes++;
        })
        console.log(candidates)
        // socket.send(JSON.stringify(candidates));
        wss.clients.forEach(function each(client) {
            if(client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(candidates),{binary: isBinary});
            }
        })
    })
})
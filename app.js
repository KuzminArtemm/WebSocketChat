
const WebSocket = require("ws");
const express = require("express");
const http = require("http");
const path = require("path");
const { db } = require("./DB");


const PORT = 3001;

const app = express();

const server = http.createServer(app);

const map = new Map(); // object that store a connection

app.set("view engine", "hbs");
app.set("views", path.join(process.env.PWD, "src", "views"));
app.use(express.static(path.join(process.env.PWD, "public")));

app.get("/", (req, res) => {

  const allMessages = JSON.parse(JSON.stringify(db.chat))
  //console.log(allMessages)
  allMessages.forEach(messages => {
    const messageAuthor = db.people.find(el => el.id === messages.personId)
   // console.log(messageAuthor)
    messages.name = messageAuthor.name
    messages.avatar = messageAuthor.avatar
  })
  res.render("main", {allMessages});
});

const wss = new WebSocket.Server({ clientTracking: false, noServer: true });

server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});
wss.on("connection", (ws, request) => {
  ws.on("message", (message) => {
    const parsedMessage = JSON.parse(message);
    //console.log(parsedMessage.text);
    switch (parsedMessage.type) {
      case "SignUp": {
        ws.personId = parsedMessage.id
        map.set(parsedMessage.id, ws);
        const preparePerson = {...parsedMessage}
        delete preparePerson.type
        db.people.push(preparePerson)

     
        
        map.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            
            client.send(
              JSON.stringify({
                type: "SignUp",
                avatar: parsedMessage.avatar,
                name: parsedMessage.name,
                //text: parsedMessage.text
              })
            );
            console.log(parsedMessage.name)
          }
        });
        break;
      }
      case "text": {
        
        const messageAuthor = db.people.find((el) => el.id === parsedMessage.personId)

        const arrayMap = [...map]

        const newMessage = {
          personId: parsedMessage.personId,
          date: Date.now(),
          text: parsedMessage.text,
        }

        db.chat.push(newMessage)
        arrayMap.forEach(([key, value]) => {
          if (value.readyState === WebSocket.OPEN) {
            const isAuthor = key === parsedMessage.personId
            value.send(
              JSON.stringify({
                type: "text",
                avatar: messageAuthor.avatar,
                name: messageAuthor.name,
                text: newMessage.text,
                date: Date.now(),
                isAuthor,
              })
            );
            console.log(parsedMessage.name)
          }
        })
    /*     map.forEach((client) => {
         // console.log(messageAuthor)
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                type: "text",
                text: parsedMessage.text,
                date: Date.now(),
                name: messageAuthor.name,
                avatar: messageAuthor.avatar,
                isAuthor: messageAuthor.id === client.personId
              })
            );
          }
          
        }); */
       
        
        break
      }

      default:
        break;
      
    }
   /*  ws.on('close', (messages) => {
      map.delete(parsedMessage.id)
      console.log({messages})
    }) */
    
  });
  
});

server.listen(PORT, () => {
  console.log(`OK on port: ${PORT}`)
})

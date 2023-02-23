const { Server } = require("socket.io");

const corsOptions = {
    origin: ["http://localhost:3000", "https://livecody.onrender.com","https://code4moveo.onrender.com"],
  }


const io = new Server({
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  let mentors = {}

  io.on("connection", (socket) => {

    socket.on("join_room", (data) => {
      socket.join(data);
      //check if someone already entered the codeblock room
      if(!mentors[data]){
        mentors[data] = socket;
        socket.emit("role","mentor");
      }
      else{
        socket.emit("role","student")
      }
  
      
      socket.on('disconnect', () => {
        console.log(`user ${socket.id} disconnected`);
        if (socket === mentors[data]) {
          mentors[data] = null;
        }
      });
  
  
    });
    
    //on codeChange emit the change to everyone in that room
    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
    });
  
  });


  io.listen(5001);
  
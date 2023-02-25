const { Server } = require("socket.io");


const corsOptions = {
    origin: ["http://localhost:3000", "https://mentorship-y5pa.onrender.com"]
  }


const io = new Server({
    cors: {
      corsOptions,
      methods: ["GET", "POST"],
    },
  });

  let mentors = {}

  io.on("connection",  (socket) => {

    socket.on("join_codeblock", (data) => {
      socket.join(data);
      //check if someone already entered the codeblock room
      if(!mentors[data]){
        mentors[data] = socket;
        socket.emit("role","mentor");
      }
      else{
        socket.emit("role","student")
      }
          
      socket.on('disconnect', async () => {

        if (socket === mentors[data]) {
          mentors[data] = null;
        }
      });
  
    });
    
    //on codeChange emit the change to everyone in that room
    socket.on("send_code", (data) => {
      socket.to(data.id).emit("receive_code", data);
    });
  
  });


  io.listen(5001);
  
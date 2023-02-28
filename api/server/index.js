const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const codeblockRoute = require("../routes/codeblockRoutes")
const { connectDB } = require("../config/db")
const path = require("path");
const app = express();


const corsOptions = {
  origin: ["http://localhost:3000", "https://mentorship-y5pa.onrender.com"]
}



dotenv.config();
connectDB();


app.use(morgan("common"));

app.use(express.json());

app.use(
  cors({
    corsOptions
  })
  );
  
  app.use("/api/codeblocks" , codeblockRoute);






  app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });

    /*----------------------PRODUCTION------------------------*/


  app.use(express.static(path.join(__dirname, 'build')));

  app.get('/*', function(req,res) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });


  module.exports = app;
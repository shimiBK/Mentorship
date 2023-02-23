const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const codeblockRoute = require("../routes/codeblockRoutes")
const { connectDB } = require("../config/db")
const app = express();


const corsOptions = {
  origin: ["http://localhost:3000", "https://livecody.onrender.com","https://code4moveo.onrender.com"],
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

  module.exports = app;
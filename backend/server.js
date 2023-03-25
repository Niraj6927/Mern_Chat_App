const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const path = require("path");

dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json()); // to accept json data

app.use("/api/user", userRoutes);

// -------------------Deployment------------------

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname1, "frontend","build","index.html"))
  })
} else {
  app.get("/", (req, res) => {
    res.send("API is Running Succesfully");
  });
}

// -------------------Deployment------------------

app.use(notFound);
app.use(errorHandler);

app.listen(5000, console.log(`Server Started on PORT ${PORT}`.yellow.bold));

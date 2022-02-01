import http from "http";
import SocketIO from "socket.io";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import config from "./config";
import bodyParser from "body-parser";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import orderRouter from "./routes/orderRouter";
import categoryRouter from "./routes/categoryRouter";

const cloudinary = require("cloudinary").v2;

dotenv.config();

const mongodbURL = config.MONGODB_URL;

mongoose
  .connect(mongodbURL, {
    useNewUrlParser: true,
  })
  .catch((error) => console.log(error));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// console.log(cloudinary);

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/uploads", async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "qzbic9ps",
    });
    res.status(200).send({ msg: "image uploaded", data: uploadResponse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRouter);
app.use("/api/category", categoryRouter);

const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"));
});

const httpServer = http.Server(app);
const io = SocketIO(httpServer, { cors: { origin: "*" } });
const users = [];

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    const user = users.find((user) => user.socketId === socket.id);
    if (user) {
      user.online = false;
      // console.log("Offline", user.name);
      const admin = users.find((user) => user.isAdmin && user.online);
      if (admin) {
        io.to(admin.socketId).emit("updateUser", user);
      }
    }
  });

  socket.on("onLogin", (user) => {
    const updatedUser = {
      ...user,
      online: true,
      socketId: socket.id,
      messages: [],
    };
    // console.log(user);
    const existUser = users.find((x) => x._id === updatedUser._id);
    if (existUser) {
      existUser.socketId = socket.id;
      existUser.online = true;
      // console.log("a");
    } else {
      // console.log("b");
      users.push(updatedUser);
    }
    // console.log("online", user.name);
    // console.log(users);
    const admin = users.find((user) => user.isAdmin && user.online);
    if (admin) {
      io.to(admin.socketId).emit("updateUser", updatedUser);
    }
    if (updatedUser.isAdmin) {
      io.to(updatedUser.socketId).emit("listUsers", users);
    }
  });

  socket.on("onUserSelected", (user) => {
    const admin = users.find((user) => user.isAdmin && user.online);
    if (admin) {
      const existUser = users.find((x) => x._id === user._id);
      // console.log(existUser);
      io.to(admin.socketId).emit("selectUser", existUser);
    }
  });

  socket.on("onMessage", (message) => {
    // console.log(message);
    if (message.isAdmin) {
      const user = users.find((x) => x._id === message._id && x.online);
      if (user) {
        io.to(user.socketId).emit("message", message);
        user.messages.push(message);
      }
    } else {
      const admin = users.find((x) => x.isAdmin && x.online);
      // console.log(users);
      // console.log(admin);
      if (admin) {
        // console.log(admin, "a");
        io.to(admin.socketId).emit("message", message);
        const user = users.find((x) => x._id === message._id && x.online);
        user.messages.push(message);
        // console.log(user);
      } else {
        io.to(socket.id).emit("message", {
          name: "Admin",
          body: "Sorry, I am not available right now.",
        });
      }
    }
  });
});

httpServer.listen(process.env.PORT || 5000, () => {
  console.log("Server start at port 5000");
});

// app.listen(process.env.PORT || 5000, () => {
//   console.log("Server start at port 5000");
// });

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

// const cloudinary = require("cloudinary").v2;

dotenv.config();

const mongodbURL = config.MONGODB_URL;

mongoose
  .connect(mongodbURL, {
    useNewUrlParser: true,
  })
  .catch((error) => console.log(error));

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// console.log(cloudinary);

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// app.use("/api/uploads", async (req, res) => {
//   // console.log(req.body.data);
//   try {
//     const fileStr = req.body.data;
//     const uploadResponse = await cloudinary.uploader.upload(fileStr, {
//       upload_preset: "qzbic9ps",
//     });
//     // console.log(uploadResponse);
//     res.status(200).send({ msg: "image uploaded", data: uploadResponse });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ err: "Something went wrong" });
//   }
// });
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRouter);
app.use("/api/category", categoryRouter);
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   next();
// });
// const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
// app.use(express.static(path.join(__dirname, "/frontend/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/frontend/build/index.html"));
// });

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "build", "index.html"));
//   });
// }

app.listen(process.env.PORT || 5000, () => {
  console.log("Server start at port 5000");
});

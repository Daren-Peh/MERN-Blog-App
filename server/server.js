import express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import colors from "colors";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from "cors";
import connectToDB from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import { imageUpload } from "./config/imageHandler.js";

dotenv.config();
connectToDB();
const app = express();
app.use(json());
app.use(urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// ROUTES
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/posts", postRoutes);
const __filename = fileURLToPath(import.meta.url);
// load images settings
const __dirname = dirname(__filename);
app.use("/uploads", express.static(path.join( __dirname, "/uploads")));

// Storing Images
app.post(
    "/api/upload",
    imageUpload.single("file"), (req, res, next) => {
      const file = req.file;
      if (!file){
       res.status(400).json("please upload a file");
      } else{
        res.status(200).json("File has been uploaded")
      } 
    });

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production"){
    // import client build to server  
    app.use(express.static(path.join(__dirname, "../client/build")));
    // redirect requests to index.html
    app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../client/build", "index.html")));
}




app.listen(PORT, console.log(`Server is running on port ${PORT}`.cyan));
import multer from "multer";


const storage = multer.diskStorage({
    // "destination" and "filename" functions that define the settings for storing a file
    destination:(req, file, cb) => {
        cb(null, "uploads");
    }, filename:(req, file, cb) => {
        cb(null, file.originalname);
    }
  });


export const imageUpload = multer({storage: storage});

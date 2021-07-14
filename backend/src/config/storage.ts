import multer from "multer";
import { v4 as uuid } from "uuid";
import path from "path";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads/'));
    },

    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname))
    }
});

const fields = [
    { name: "productImages", maxCount: 6},
    { name: "categoryImage", maxCount: 1}
]

export { storage, fields }
import express from "express";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

import router from "../src/routes/router.routes";

const app = express();

app.set("port", process.env.PORT || 4000);

app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(morgan("dev"));
const storage = multer.diskStorage({
  destination: path.join(path.join(__dirname, 'uploads')),
  filename: (req, file, cb, filename) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});
app.use(multer({ storage: storage }).single("image"));
//configuracion de subir imagenes
app.use(cors({ origin: "http://localhost:4200" }));
app.use(router);

app.listen(app.get("port"), () => {
  console.log("server running at http://localhost:" + app.get("port"));
});

// Conexión a la base de datos con mongo
import mongoose from "mongoose";
import config_db from "../config/database.config.json";

const user = config_db.user;
const password = config_db.password;

function select(x) {
  let url;
  switch (x) {
    case 1:
      url = config_db.database.local_url;
      break;
    case 2:
      url = `mongodb+srv://nsg:nsg123@cluster0-x3ldm.mongodb.net/<dbname>?retryWrites=true&w=majority`;
    default:
      break;
      f;
  }
  return url;
}

const on = true;

function on_off(control, x) {
  let controlValue = control;
  if (controlValue == "ON" || controlValue == "on") {
    mongoose
      .connect(select(x), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then((db) => console.log("DB is connected...."))
      .catch((err) => console.log(err));
  } else {
    console.log("Mongo DB is OFF!");
  }
}

module.exports = on_off;

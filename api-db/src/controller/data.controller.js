import cloudinary from "cloudinary";
import multer from "multer";
import on_off from "../database/database.config";
import Data from "../models/data.model";
import cloudinary_config from "../config/cloudinary.config.json";

// write on or ON to turn up the database, off or OFF to
//turn off the database
//AND write 1 for db local and 2 for db mongo Atlas (web).
on_off("ON", 1);

cloudinary.config({
  cloud_name: cloudinary_config.cloud_name,
  api_key: cloudinary_config.api_key,
  api_secret: cloudinary_config.api_secret,
});

const indexDataCtrl = {};

indexDataCtrl.indexGet = async (req, res) => {
  const data = await Data.find();
  res.send(data);
};

indexDataCtrl.indexPost = async (req, res) => {
  let data = new Data(req.body);
 /*  data.FileName = req.file.originalname;
  data.FilePath = req.file.path; */
  await data.save();
  res.send(data);
  console.log(req.file);
};

indexDataCtrl.indexPut = async (req, res) => {
  let id = req.params.id;
  let newData = req.body;
  await Data.findByIdAndUpdate(id, newData, (error, response) => {
    if (error) {
      res.status(500).send({
        message: "Server error.",
      });
    } else {
      if (!newData) {
        res.status(200).send({
          message: "In this moment is not possible to update",
          statusCode: 400,
        });
      } else {
        res.status(200).send({
          status: "Update data",
          data: newData,
          statusCode: 200,
        });
      }
    }
  });
};

indexDataCtrl.indexDelete = async (req, res) => {
  let id = req.params.id;

  Data.findByIdAndDelete(id, (err, dataDeleted) => {
    if (err) {
      res.status(500).send({
        message: "Server error,",
      });
    } else {
      if (!dataDeleted) {
        res.status(200).send({
          message: "In this moment is not possible to update",
          statusCode: 400,
        });
      } else {
        res.status(200).send({
          status: "Deleted data",
          data: dataDeleted,
          statusCode: 200,
        });
      }
    }
  });
};

indexDataCtrl.indexGetId = async (req, res) => {
  let id = req.params.id;
  const data = await Data.findById(id);
  res.send(data);
};

indexDataCtrl.dropAll = async (req, res) => {
  await Data.remove((err, dataFind) => {
    if (err) {
      res.status(500).send({
        message: "Server error,",
      });
    } else {
      if (!dataFind) {
        res.status(200).send({
          message: "In this moment is not possible to update",
          statusCode: 400,
        });
      } else {
        res.status(200).send({
          status: "Deleted data",
          data: dataFind,
          statusCode: 200,
        });
      }
    }
  });
};

module.exports = indexDataCtrl;

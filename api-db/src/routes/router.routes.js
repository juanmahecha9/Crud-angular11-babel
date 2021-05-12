import express from "express";
import indexDataCtrl from "../controller/data.controller";
import multer from "../lib/multer";

const router = express.Router();

router.get("/", multer.single("image"), indexDataCtrl.indexGet);
router.get("/byId/:id", indexDataCtrl.indexGetId);
router.post("/", indexDataCtrl.indexPost);
router.put("/:id", indexDataCtrl.indexPut);
router.delete("/borrar/:id", indexDataCtrl.indexDelete);
router.delete("/remove", indexDataCtrl.dropAll);

module.exports = router;

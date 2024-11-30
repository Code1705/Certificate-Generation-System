import express from "express";
import {
  createCertificate,
  getCertificates,
} from "../controllers/certificateController.js";

const router = express.Router();

router.post("/create", createCertificate);
router.get("/get", getCertificates);

export default router;

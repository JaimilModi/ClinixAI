import express from "express";
import { auth } from "../middlewares/auth.js";
import { reviewReport, writeSymptom } from "../controllers/aiController.js";
import { upload } from "../configs/multer.js";

const aiRouter = express.Router();

aiRouter.post("/write-symptom", auth, writeSymptom);
aiRouter.post("/review-report", upload.single("pdf"), auth, reviewReport);

export default aiRouter;
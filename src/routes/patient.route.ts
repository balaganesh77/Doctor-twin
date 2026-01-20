import express from "express";
import validate from "../middlewares/validate";
import { patientValidation } from "../validations";
import { patientController } from "../controllers";

const router = express.Router();

router.post(
  "/create",
  validate(patientValidation.createPatient),
  patientController.createPatient,
);

export default router;

import catchAsync from "../utils/catchAsync";
import { patientService } from "../services";
import apiResponse from "../utils/api.response";
import pick from "../utils/pick";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError";

const createPatient = catchAsync(async (req, res) => {
  const patient = await patientService.createPatient(req.body);

  res.send(apiResponse.successResponseWithData(patient));
});

export default {
  createPatient
};

import joi from "joi";

const createPatient = {
  body: joi.object().keys({
    name: joi.string().required(),
    email: joi.string().email().required(),
    phoneNo: joi.string().required(),
  }),
};

export default {
  createPatient,
};

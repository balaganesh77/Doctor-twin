import express from "express";
import patientRoute from "./patient.route";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/patient",
    route: patientRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


export default router;
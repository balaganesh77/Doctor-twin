import config from "../config/config";
import moment from "moment";
import jwt from "jsonwebtoken";

const getAccessToken = function (
  userId: string,
  permission: AccessPermission,
  role: string,
) {
  const payload = {
    uid: userId,
    iat: moment().unix(),
    exp: moment().add(config.jwt.accessExpirationMinutes, "minutes").unix(),
    iss: config.project,
    aud: `${config.project} Application`,
    type: tokenType.ACCESS,
    access: permission,
    role: role,
  };
  return jwt.sign(payload, config.jwt.secret);
};

const getRefreshToken = function (userId: string, role: string) {
  const refreshTokenPayload = {
    uid: userId,
    iat: moment().unix(),
    exp: moment().add(config.jwt.refreshExpirationDays, "days").unix(),
    iss: config.project,
    aud: `${config.project} Application`,
    type: tokenType.REFRESH,
    role: role,
  };
  return jwt.sign(refreshTokenPayload, config.jwt.secret);
};

const generateAuthTokens = function (
  userId: string,
  permission: AccessPermission,
  role: string,
) {
  return {
    accessToken: getAccessToken(userId, permission, role),
    refreshToken: getRefreshToken(userId, role),
  };
};

const generateResetToken = function (
  userId: string,
  permission: AccessPermission,
  role: string,
) {
  const payload = {
    uid: userId,
    iat: moment().unix(),
    exp: moment().add(20, "minutes").unix(),
    iss: config.project,
    aud: `${config.project} Application`,
    type: tokenType.RESET_PASSWORD,
    access: permission,
    role: role,
  };
  return jwt.sign(payload, config.jwt.secret);
};

export default {
  generateAuthTokens,
  generateResetToken,
};

export interface AuthTokensResponse {
  accessToken: string;
  refreshToken: string;
}

export enum AccessPermission {
  BASIC = "Basic",
  ENHANCED = "Enforced",
}

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  PATIENT = "PATIENT",
  DOCTOR = "DOCTOR",
  PHYSICIAN = "PHYSICIAN",
}

export enum tokenType {
  ACCESS = "ACCESS",
  REFRESH = "REFRESH",
  RESET_PASSWORD = "RESET_PASSWORD",
}

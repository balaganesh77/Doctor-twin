import { NextFunction, Request, Response } from "express";
import { inHTMLData } from "xss-filters";

/**
 * Clean for xss.
 * @param {string/object} data - The value to sanitize
 * @return {string/object} The sanitized value
 */
export const clean = <T>(data: T | string = ""): T => {
  let isObject = false;
  if (typeof data === "object") {
    data = JSON.stringify(data);
    isObject = true;
  }

  data = inHTMLData(data as string).trim();
  if (isObject) data = JSON.parse(data);

  return data as T;
};

const middleware = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.body) req.body = clean(req.body);
    if (req.query) {
      const sanitizedQuery = clean(req.query);
      for (const key in sanitizedQuery) {
        (req.query as any)[key] = sanitizedQuery[key];
      }
    }
    if (req.params) {
      const sanitizedParams = clean(req.params);
      for (const key in sanitizedParams) {
        (req.params as any)[key] = sanitizedParams[key];
      }
    }
    next();
  };
};

export default middleware;

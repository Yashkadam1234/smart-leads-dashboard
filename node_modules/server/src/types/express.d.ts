import type { IUserPayload } from "../../../shared/types";

declare global {
  namespace Express {
    interface Request {
      user?: IUserPayload;
    }
  }
}

export {};
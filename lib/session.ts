import { IronSessionOptions } from "iron-session";

export interface SessionData {
  user?: { id: number; name: string; email: string };
}

export const sessionOptions: IronSessionOptions = {
  password: process.env.SESSION_SECRET as string, // minimal 32 char
  cookieName: "inventory_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

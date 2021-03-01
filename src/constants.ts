import { config } from "dotenv";

config();

export const __prod__ = process.env.NODE_ENV === "production";
export const __psql__ = process.env.SQL_SECRET;
export const __port__ = process.env.PORT;

import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables");
}

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

export const config = {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    Client_ID: process.env.Client_ID || process.env.GOOGLE_CLIENT_ID,
    Client_secret: process.env.Client_secret || process.env.GOOGLE_CLIENT_SECRET
};

export default config;
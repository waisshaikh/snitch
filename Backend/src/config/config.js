import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not define in envirmentoal variable")
}

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not define in envirmentoal variable")
}

if (!process.env.Client_ID && !process.env.Client_secret) {
    throw new Error("Client_ID and Client_secret is not define in envirmentoal variable")
}


export const config = {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    Client_ID: process.env.Client_ID,
    Client_secret: process.env.Client_secret

};


export default config;
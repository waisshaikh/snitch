import env from "dotenv";
env.config();

type CONFIG = {
   readonly MONGO_URI: string;

}

if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in the environment variables");
}   

export const config: CONFIG = {
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/snitch"
}

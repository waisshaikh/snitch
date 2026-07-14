import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { config } from "./src/config/config.js";


const port = 5000;
const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

import { app } from "./app.js";
import connectDB from "./db/connectDB.js";
import dotenv from "dotenv";

dotenv.config({path : "./.env"});
const PORT = process.env.PORT || 5000;

function startServer() {
    try {
        app.listen(PORT, async () => {
            await connectDB();
            console.log("Server is running on port", PORT);
        })
        
    } catch (error) {
        console.error("Error starting the server:", error);
        process.exit(1);    
    }
}

startServer();
import mongoose from "mongoose";
import { config } from "dotenv";
config();

const URI: string = process.env.MONGO_ATLAS_DATABASE_URL || "";

if(URI === "") console.error("Impossible to catch varible env from connected database");

export default mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) console.error(err);
});
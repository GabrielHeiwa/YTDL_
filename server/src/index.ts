import Server from "./server";
import { config } from "dotenv";
config();

const PORT = process.env.PORT || 3333;
Server.app.listen(PORT, () => console.log(`> Server runnning in http://localhost:${PORT}`));
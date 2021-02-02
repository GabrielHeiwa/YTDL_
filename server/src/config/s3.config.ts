import aws from "aws-sdk";
import { config } from "dotenv";
config();

export default new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_HEIWA,
    region: process.env.AWS_DEFAULT_REGION_HEIWA,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_HEIWA,
    
});
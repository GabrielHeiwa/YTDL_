import { Request, Response } from "express";
import S3Connection from "../config/s3.config";
import DBConnection from "../config/db.config";

export default {
    async convertYoutubeURL(req: Request, res: Response): Promise<string> {
        // Initializated services.
        const awsS3 = S3Connection;
        const Database = DBConnection;

    }
};
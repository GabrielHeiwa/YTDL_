import { Request, Response } from "express";
import S3Connection from "../config/s3.config";
import DBConnection from "../config/db.config";
import ytdl from "ytdl-core";
import downloadModel from "../database/models/download.model";

interface IRequestBody {
    youtubeVideoUrl: string;
    downloadFormat: string;
    downloadQuality: string;
}

export default {
    async convertYoutubeURL(req: Request, res: Response) {
        // Get data from URL
        const { youtubeVideoUrl, downloadFormat, downloadQuality } = req.body as IRequestBody;

        // Initializated services.
        const awsS3 = S3Connection;
        DBConnection;

        // Get video information
        const {
            videoId: downloadID,
            title: downloadTitle,
        } = await ytdl.getInfo(youtubeVideoUrl)
            .then(info => info.videoDetails)

        // Verify if video has been downloaded other hour
        const downloadfind = await downloadModel
            .find({ downloadID: downloadID })
        if (downloadfind.length > 0) {
            res.status(200).send(downloadfind[0].downloadS3Url);
        };

        // Upload video from S3
        const bucket = process.env.AWS_BUCKET_HEIWA || "";
        if (bucket === "") res.send("Error to read the enviroment variables");

        const keyName = downloadTitle.concat(".", downloadFormat);
        const fileUploaded = await awsS3.upload({
            Key: keyName,
            Bucket: bucket,
            Body: ytdl(youtubeVideoUrl, {
                filter: downloadFormat === "mp3" ? "audioonly" : "audioandvideo",
                quality: downloadFormat === "mp3" ? downloadQuality.concat("audio") : downloadQuality.concat("video"),
            }),
            ACL: "public-read",
        }, (err, data) => {

        }).promise();

        // Saved in the database
        const { Location: downloadS3Url } = fileUploaded
        new downloadModel({
            downloadID,
            downloadS3Url,
        }).save({}, (err, doc) => {
            doc.isNew = true
            if (!err) return console.log("Download register");
            return console.log("failed to register download");
        })

        // Send aswer for request
        res.status(200).send(fileUploaded.Location);
    }
};
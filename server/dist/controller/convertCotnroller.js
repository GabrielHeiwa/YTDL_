"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var s3_config_1 = __importDefault(require("../config/s3.config"));
var db_config_1 = __importDefault(require("../config/db.config"));
var ytdl_core_1 = __importDefault(require("ytdl-core"));
var download_model_1 = __importDefault(require("../database/models/download.model"));
exports.default = {
    convertYoutubeURL: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, youtubeVideoUrl, downloadFormat, downloadQuality, awsS3, _b, downloadID, downloadTitle, downloadfind, bucket, keyName, fileUploaded, downloadS3Url;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, youtubeVideoUrl = _a.youtubeVideoUrl, downloadFormat = _a.downloadFormat, downloadQuality = _a.downloadQuality;
                        awsS3 = s3_config_1.default;
                        db_config_1.default;
                        return [4 /*yield*/, ytdl_core_1.default.getInfo(youtubeVideoUrl)
                                .then(function (info) { return info.videoDetails; })
                            // Verify if video has been downloaded other hour
                        ];
                    case 1:
                        _b = _c.sent(), downloadID = _b.videoId, downloadTitle = _b.title;
                        return [4 /*yield*/, download_model_1.default
                                .find({ downloadID: downloadID })];
                    case 2:
                        downloadfind = _c.sent();
                        if (downloadfind.length > 0) {
                            res.status(200).send(downloadfind[0].downloadS3Url);
                        }
                        ;
                        bucket = process.env.AWS_BUCKET_HEIWA || "";
                        if (bucket === "")
                            res.send("Error to read the enviroment variables");
                        keyName = downloadTitle.concat(".", downloadFormat);
                        return [4 /*yield*/, awsS3.upload({
                                Key: keyName,
                                Bucket: bucket,
                                Body: ytdl_core_1.default(youtubeVideoUrl, {
                                    filter: downloadFormat === "mp3" ? "audioonly" : "audioandvideo",
                                    quality: downloadFormat === "mp3" ? downloadQuality.concat("audio") : downloadQuality.concat("video"),
                                }),
                                ACL: "public-read",
                            }, function (err, data) {
                            }).promise()];
                    case 3:
                        fileUploaded = _c.sent();
                        downloadS3Url = fileUploaded.Location;
                        new download_model_1.default({
                            downloadID: downloadID,
                            downloadS3Url: downloadS3Url,
                        }).save({}, function (err, doc) {
                            doc.isNew = true;
                            if (!err)
                                return console.log("Download register");
                            return console.log("failed to register download");
                        });
                        // Send aswer for request
                        res.status(200).send(fileUploaded.Location);
                        return [2 /*return*/];
                }
            });
        });
    }
};

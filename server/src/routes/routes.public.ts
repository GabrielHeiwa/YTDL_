import { Router } from "express";
import ConvertController from "../controller/convertCotnroller";

export default function Routes() {
    const routes = Router();
    routes.get("/", (req, res) => {
        res.send("hello world");
    });

    routes.post("/convert", ConvertController.convertYoutubeURL)

    return routes;
} 
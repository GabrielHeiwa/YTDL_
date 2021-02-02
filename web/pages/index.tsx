import React, { useRef } from "react";
import Axios from "axios";
import {
    HomePageContainer,
    HomePageContent
} from "../styles/index";

export default function Home() {
    const inputYoutubeVideoURL = useRef<HTMLInputElement>(null),
        selectTypeFormat = useRef<HTMLSelectElement>(null),
        selectTypeQuality = useRef<HTMLSelectElement>(null);

    async function convertYoutubeVideo() {
        await Axios("http://localhost:3031/convert", {
            data: {
                youtubeVideoUrl: inputYoutubeVideoURL.current.value,
                downloadFormat: selectTypeFormat.current.value,
                downloadQuality: selectTypeQuality.current.value,
            },
            method: "POST",
        }).then(res => {
            console.log(res)
            if (res.status === 200) {
                const ancor = document.createElement("a");
                ancor.href = res.data;
                ancor.download = "hello.mp3";
                ancor.click();
            };
        });
    };

    return <HomePageContainer>
        <HomePageContent>
            <h2 className="ytdlTitle">Youtube Video Convert</h2>
            <div className="ytdlInputUrl">
                <input
                    placeholder="Youtube URL"
                    ref={inputYoutubeVideoURL} />
            </div>

            <div className="ytdlInputFormat">
                <select ref={selectTypeFormat}>
                    <option value="mp3">MP3</option>
                    <option value="mp4">MP4</option>
                </select>
            </div>

            <div className="ytdlInputQuality">
                <select ref={selectTypeQuality}>
                    <option value="lowest">Low</option>
                    <option value="highest">High</option>
                </select>
            </div>

            <div className="ytdlInputConvert">
                <button 
                    onClick={() =>   convertYoutubeVideo()}>
                    Converter
                </button>
            </div>

        </HomePageContent>
    </HomePageContainer>
};

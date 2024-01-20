"use client";

import axios from "axios";
import { useState } from "react";
import PreviewVideo from "./previewVideo";

const DownloadBtn = () => {
  const [urlInput, setUrlInput] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isValidInput, setIsValidInput] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const validateYoutubeUrl = (url: string) => {
    // Regular expression for a YouTube video URL
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    return youtubeRegex.test(url);
  };

  const downloadVideo = (url:string) => {
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.setAttribute("download", "video.mp4");
    document.body.appendChild(anchor);

    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleClick = async () => {
    try {
      setVideoUrl('')
      const isValidUrl = validateYoutubeUrl(urlInput);
      if (isValidUrl) {
        setIsLoading(true);
        setIsValidInput(true);
        const response = await axios.post(
          "https://youtube-url-to-video.onrender.com/download",
          {
            video_url: urlInput,
          },
          {
            responseType: "blob",
          }
        );
  
        const blob = new Blob([response.data], { type: "video/mp4" });
        const videoUrl = URL.createObjectURL(blob);
        downloadVideo(videoUrl)
  
        setVideoUrl(videoUrl);
        setIsLoading(false);
      } else {
        setIsValidInput(false);
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full max-w-[850px]">
      <div className="md:my-5 md:px-4 md:py-3 w-full md:flex items-center gap-2 border-white  md:bg-white rounded-sm">
        <input
          className="w-full focus:outline-none focus:ring-0 focus:border-transparent p-3 text-black"
          placeholder="Paste youtube url here...."
          onChange={(e) => setUrlInput(e.target.value)}
        />
        <div className="flex justify-center">
          <button
            className={`my-5 md:my-0 px-5 py-3 flex bg-black rounded-sm shadow-[rgba(250,250,255,0.16)_0px_-5px_6px_0px_inset,_rgba(38,_37,37,0.24)_4px_6px_11px_1px_inset;] ${
              isLoading ? "opacity-50" : ""
            }`}
            onClick={() => handleClick()}
            disabled={isLoading}
          >
            Download
          </button>
        </div>
      </div>
      {!isValidInput && (
        <p className="w-full text-left">Please enter valid url !</p>
      )}
      {isLoading && (
        <div className="w-full mt-20 md:mt-32 flex items-center justify-center">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-black"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )}
      {videoUrl && <PreviewVideo videoUrl={videoUrl} />}
    </div>
  );
};

export default DownloadBtn;

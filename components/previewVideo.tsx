import React from "react";

type Props = {
  videoUrl: string
};

const PreviewVideo = ({ videoUrl }: Props) => {
  return (
    <video controls autoPlay className="w-full max-w-[850px]">
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default PreviewVideo;

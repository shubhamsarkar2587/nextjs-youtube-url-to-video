import DownloadBtn from "@/components/downloadBtn";

export default function Home() {
  return (
    <div>
      <div className="px-5 md:px-8 py-4 md:py-5 flex items-center justify-between border-b-[0.01px] border-white">
        <h6 className="text-2xl md:text-3xl font-bold">Y2 Down</h6>
        <a
          href="https://www.buymeacoffee.com/shubhamsarkar"
          className="font-bold hover:text-[#FFDC01]"
        >
          Buy Me Coffee
        </a>
      </div>
      <div className="h-full container mx-auto px-5 py-10 md:p-10 flex flex-col items-center">
        <h1 className="mb-5 text-3xl">YouTube Video Downloader</h1>
        <p className="mb-5">Paste YouTube URL to download videos for free</p>
        <DownloadBtn />
      </div>
    </div>
  );
}

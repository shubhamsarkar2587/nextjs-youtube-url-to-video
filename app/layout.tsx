import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "You2 downloader",
  description: "Youtube video downloader",
  openGraph: {
    type: "website",
    title: "Youtube Video downloader",
    description: "YouTube Video Downloader Paste YouTube URL to download videos for free",
    siteName: "You2 down",
    images: [
      {
        url: "/ogPreview.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

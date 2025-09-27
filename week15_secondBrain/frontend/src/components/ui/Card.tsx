import { useEffect } from "react";
import { PlusIcon } from "../../icons/PlusIcon";
import { ShareIcon } from "../../icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "Youtube";
}

export const Card = ({ title, link, type }: CardProps) => {
  const embedUrl =
    type === "Youtube" && link
      ? (() => {
          try {
            const url = new URL(link);
            if (url.hostname.includes("youtu.be")) {
              return `https://www.youtube.com/embed${url.pathname}`;
            }
            const videoId = url.searchParams.get("v");
            return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
          } catch {
            return "";
          }
        })()
      : "";

  // Load Twitter widget only once
useEffect(() => {
  if (type === "twitter" && (window as any).twttr?.widgets) {
    (window as any).twttr.widgets.load();
  }
}, [type, link]);

  return (
    <div className="h-full">
      <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200 w-full h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-gray-600 font-medium truncate">
            <ShareIcon size="lg" className="mr-2" />
            {title || "Project Ideas"}
          </div>
          <div className="flex items-center space-x-3 text-gray-500">
            {link && (
              <a href={link} target="_blank" rel="noopener noreferrer">
                <ShareIcon size="lg" />
              </a>
            )}
            <PlusIcon size="lg" />
          </div>
        </div>

        <div className="relative w-full flex-grow flex items-center justify-center">
          {type === "Youtube" && embedUrl ? (
            <iframe
              className="w-full h-64 rounded-md"
              src={embedUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title={title}
            ></iframe>
          ) : type === "twitter" ? (
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          ) : (
            <div className="text-gray-400">No valid content</div>
          )}
        </div>
      </div>
    </div>
  );
};

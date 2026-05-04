import { Heart, MessageCircle, Share2, Flame, Music } from "lucide-react";

interface VideoCardProps {
  index: number;
  username?: string;
  caption?: string;
  sound?: string;
  aspectRatio?: string;
  videoLabel?: string;
  clickLoginLabel?: string;
}

function getCardStyle(aspectRatio: string): React.CSSProperties {
  const [w, h] = aspectRatio.split("/").map(Number);
  const ratio = w / h;

  if (ratio < 1) {
    return { aspectRatio, width: "100%", maxWidth: "420px", maxHeight: "90%" };
  } else {
    return { aspectRatio, height: "80%", maxHeight: "80%", width: "auto", maxWidth: "90%" };
  }
}

export default function VideoCard({
  index,
  username = "@username",
  caption = "Amazing video caption!",
  sound = "Original sound · TopTop",
  aspectRatio = "9/16",
  videoLabel = "Video",
  clickLoginLabel = "Click \"Log in\" to get started",
}: VideoCardProps) {
  const cardStyle = getCardStyle(aspectRatio);

  return (
    <div
      className="flex items-center justify-center px-4 py-4"
      style={{ height: "100%", scrollSnapAlign: "center", scrollSnapStop: "always" }}
    >
      <div
        className="bg-surface rounded-[12px] flex items-center justify-center relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:scale-[1.01] transition-transform duration-200"
        style={cardStyle}
      >
        <div className="text-center z-10">
          <p className="font-semibold text-[18px] mb-2 text-text-primary">{videoLabel} {index + 1}</p>
          <p className="text-[14px] text-text-muted">{clickLoginLabel}</p>
        </div>

        <div className="absolute right-4 bottom-24 flex flex-col gap-5 items-center z-20">
          {[Heart, MessageCircle, Share2].map((Icon, j) => (
            <div
              key={j}
              className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center hover:bg-[rgba(255,255,255,0.2)] transition-colors cursor-pointer"
            >
              <Icon className="w-5 h-5 text-white" />
            </div>
          ))}
        </div>

        <div className="absolute left-4 bottom-4 text-white z-20">
          <p className="font-bold text-[16px] hover:underline cursor-pointer">{username}</p>
          <p className="text-[14px] mt-1 mb-1.5 flex items-center gap-1">
            {caption} <Flame className="w-4 h-4 text-brand" />
          </p>
          <p className="text-[13px] text-text-secondary flex items-center gap-1">
            <Music className="w-4 h-4" /> {sound}
          </p>
        </div>
      </div>
    </div>
  );
}

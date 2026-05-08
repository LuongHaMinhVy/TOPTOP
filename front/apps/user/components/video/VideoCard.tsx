import { Heart, MessageCircle, Share2, Bookmark, Music, Plus, Volume2, VolumeX, Play, Pause } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setMuted, setVolume, toggleMuted } from "@/store/slices/mediaSlice";
import { InteractionButton } from "./InteractionButton";

interface VideoCardProps {
  index: number;
  videoUrl?: string;
  username?: string;
  caption?: string;
  sound?: string;
  aspectRatio?: string;
  avatarUrl?: string;
  likes?: string;
  comments?: string;
  saves?: string;
  shares?: string;
}

export default function VideoCard({
  index,
  videoUrl,
  username = "baprang4k",
  caption = "80% SINH VIÊN KHÔNG BIẾT NHỮNG MẸO NGẦM TÂM LÝ KHI BẢO VỆ KLTN...",
  sound = "Original sound - baprang4k",
  aspectRatio = "9/16",
  avatarUrl = "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/7313627042858860549~c5_100x100.jpeg?lk3s=30310797&x-expires=1715238000&x-signature=...", 
  likes = "4549",
  comments = "8",
  saves = "2292",
  shares = "495",
}: VideoCardProps) {
  const dispatch = useDispatch();
  const isMuted = useSelector((state: RootState) => state.media.isMuted);
  const volume = useSelector((state: RootState) => state.media.volume);
  
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControlIcon, setShowControlIcon] = useState(false);
  const [iconType, setIconType] = useState<"play" | "pause">("play");
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const ratioParts = (aspectRatio || "9/16").split('/');
  const isWide = ratioParts.length === 2 && (parseInt(ratioParts[0]) / parseInt(ratioParts[1]) > 1);

  const videoRef = useRef<HTMLVideoElement>(null);
  const isIntersectingRef = useRef(false);

  const isPlayingRef = useRef(isPlaying);
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        videoRef.current?.pause();
      } else if (isIntersectingRef.current && isPlayingRef.current) {
        videoRef.current?.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersectingRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          if (videoRef.current) {
            videoRef.current.currentTime = 0;
            if (!document.hidden) {
              videoRef.current.play().catch(() => {});
              setIsPlaying(true);
            } else {
              setIsPlaying(true);
            }
          }
        } else {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 }
    );

    if (videoRef.current) observer.observe(videoRef.current);
    
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIconType("pause");
      } else {
        videoRef.current.play();
        setIconType("play");
      }
      setIsPlaying(!isPlaying);
      setShowControlIcon(true);
      setTimeout(() => setShowControlIcon(false), 500);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current && videoRef.current.duration) {
      const val = parseFloat(e.target.value);
      const seekTime = (val / 100) * videoRef.current.duration;
      videoRef.current.currentTime = seekTime;
      setProgress(val);
      dispatch(setMuted(false)); 
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    dispatch(setVolume(newVolume));
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  return (
    <div
      className="flex items-center justify-center h-full w-full relative"
      style={{ scrollSnapAlign: "center", scrollSnapStop: "always" }}
    >
      <div className="flex flex-col lg:flex-row items-center lg:items-end gap-3 lg:gap-5 w-full lg:w-auto px-4 lg:px-0">
        <div className="flex flex-col w-full lg:w-auto items-center">
          <div 
            className="relative rounded-xl lg:rounded-lg group shadow-2xl flex items-center justify-center bg-black"
            style={{ 
              maxHeight: isWide ? "60vh" : "calc(100vh - 20px)", 
              maxWidth: "100%",
            }}
          >
            {videoUrl ? (
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl lg:rounded-lg" onClick={togglePlay}>
                <video 
                  ref={videoRef}
                  src={videoUrl} 
                  className="w-auto h-auto block cursor-pointer"
                  style={{ 
                    maxHeight: isWide ? "60vh" : "calc(100vh - 20px)", 
                    maxWidth: "100%",
                  }}
                  loop 
                  muted={isMuted}
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                />
                
                {/* Control Icon Animation */}
                <div 
                  className={`absolute inset-0 flex items-center justify-center pointer-events-none z-50 transition-all duration-300 transform
                    ${showControlIcon ? "opacity-100 scale-100" : "opacity-0 scale-150"}`}
                >
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md">
                    {iconType === "play" ? (
                      <Play className="w-10 h-10 text-white fill-white ml-1" />
                    ) : (
                      <Pause className="w-10 h-10 text-white fill-white" />
                    )}
                  </div>
                </div>

                {/* Progress Bar TRACK (inside clipper) */}
                <div className="absolute bottom-0 left-0 w-full h-1 group-hover:h-2 transition-all pointer-events-none z-40">
                  <div className="w-full h-full bg-white/20">
                    <div 
                      className="h-full bg-brand transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Top Gradient Overlay for UI elements (visible on hover) */}
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 via-black/10 to-transparent pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div 
                  className="absolute top-4 left-4 z-50 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onMouseEnter={() => setShowVolumeSlider(true)}
                  onMouseLeave={() => setShowVolumeSlider(false)}
                >
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(toggleMuted());
                    }}
                    className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors z-10"
                  >
                    {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <div className={`flex items-center bg-black/40 backdrop-blur-md rounded-r-full pr-4 pl-1 h-10 transition-all duration-300 origin-left ${showVolumeSlider ? 'w-32 opacity-100' : 'w-0 opacity-0 overflow-hidden'}`}>
                    <input 
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div 
                className="bg-[#1f1f1f] rounded-xl lg:rounded-lg" 
                style={{ 
                  aspectRatio, 
                  width: "100%",
                  maxHeight: isWide ? "60vh" : "calc(100vh - 20px)", 
                }} 
              />
            )}

            <div 
              className="absolute bottom-0 left-0 w-full h-4 hover:h-6 flex items-end z-50 group/progress" 
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full h-1 group-hover/progress:h-2 transition-all relative">
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_rgba(255,255,255,0.5)] z-[60]"
                  style={{ left: `calc(${progress}% - 8px)` }}
                />
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleSeek}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none active:[&::-webkit-slider-thumb]:cursor-grabbing z-[70]"
                />
              </div>
            </div>
            
            <div className="absolute right-2 bottom-20 lg:hidden flex flex-col items-center gap-4 z-40">
               <div className="relative mb-2">
                <div className="w-11 h-11 rounded-full border border-white/20 overflow-hidden cursor-pointer shadow-lg">
                  <img src={avatarUrl} alt={username} className="w-full h-full object-cover" />
                </div>
                <button className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-brand flex items-center justify-center text-white border-2 border-background">
                  <Plus className="w-2.5 h-2.5" />
                </button>
              </div>

              <InteractionButton 
                active={isLiked} 
                activeColor="text-brand" 
                icon={<Heart className={`w-7 h-7 ${isLiked ? "fill-brand" : ""}`} />} 
                label={likes} 
                onClick={() => setIsLiked(!isLiked)} 
                isOverlay
              />

              <InteractionButton 
                icon={<MessageCircle className="w-7 h-7" />} 
                label={comments} 
                isOverlay
              />

              <InteractionButton 
                active={isSaved} 
                activeColor="text-yellow-400" 
                icon={<Bookmark className={`w-7 h-7 ${isSaved ? "fill-yellow-400" : ""}`} />} 
                label={saves} 
                onClick={() => setIsSaved(!isSaved)} 
                isOverlay
              />

              <InteractionButton 
                icon={<Share2 className="w-7 h-7" />} 
                label={shares} 
                isOverlay
              />
            </div>

            <div className="absolute bottom-4 right-4 z-20 lg:block hidden">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border-[8px] border-gray-800 flex items-center justify-center animate-spin-slow">
                <div className="w-4 h-4 rounded-full bg-gray-700 border border-gray-600" />
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none z-10" />

            <div className="absolute bottom-4 lg:bottom-6 left-3 lg:left-4 right-12 z-20 text-white select-none">
              <h3 className="font-bold text-[16px] lg:text-[17px] mb-1 hover:underline cursor-pointer inline-block pointer-events-auto">
                {username}
              </h3>
              <p className="text-[14px] lg:text-[15px] line-clamp-2 leading-relaxed opacity-90 font-medium">
                {caption}
              </p>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex flex-col items-center gap-4 pb-12">

          <div className="relative mb-2">
            <div className="w-12 h-12 rounded-full border border-white/10 overflow-hidden cursor-pointer">
              <img src={avatarUrl} alt={username} className="w-full h-full object-cover" />
            </div>
            <button className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-brand flex items-center justify-center text-white hover:scale-110 transition-transform border-2 border-background">
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <InteractionButton 
            active={isLiked} 
            activeColor="text-brand" 
            icon={<Heart className={`w-7 h-7 ${isLiked ? "fill-brand" : ""}`} />} 
            label={likes} 
            onClick={() => setIsLiked(!isLiked)} 
          />

          <InteractionButton 
            icon={<MessageCircle className="w-7 h-7" />} 
            label={comments} 
          />

          <InteractionButton 
            active={isSaved} 
            activeColor="text-yellow-400" 
            icon={<Bookmark className={`w-7 h-7 ${isSaved ? "fill-yellow-400" : ""}`} />} 
            label={saves} 
            onClick={() => setIsSaved(!isSaved)} 
          />

          <InteractionButton 
            icon={<Share2 className="w-7 h-7" />} 
            label={shares} 
          />
        </div>
      </div>
    </div>
  );
}

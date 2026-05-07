"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  Users, Video, Clock, X, TrendingUp,
  Compass, MessageSquare, Bell, MoreHorizontal, Upload,
  ChevronUp, ChevronDown, User
} from "lucide-react";
import Link from "next/link";
import VideoCard from "../components/VideoCard";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { clearCredentials, openAuthModal } from "@/store/authSlice";
import { authLogout } from "@/services/auth-api-service";
import { useRouter } from "next/navigation";

const FAKE_FOLLOWING = [
  { name: "Hải Ly Manga Review", username: "hailymangareview", color: "#FF6B6B" },
  { name: "rivine", username: "rivine7", color: "#4ECDC4" },
  { name: "sagetaoist", username: "sagetaoist", color: "#45B7D1" },
  { name: "Tuệ Mẫn", username: "tueman", color: "#A29BFE" },
];

export default function HomePage() {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const openSearch = () => {
    setSearchOpen(true);
    setTimeout(() => searchInputRef.current?.focus(), 350);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeSearch(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const collapsed = searchOpen;

  return (
    <div className="flex flex-col h-screen bg-background text-text-primary overflow-hidden">

      <header className="lg:hidden flex items-center gap-3 px-4 h-[56px] border-b border-elevated bg-background z-20 flex-shrink-0">
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-7 h-7 rounded-[4px] bg-gradient-to-tr from-brand to-cyan flex items-center justify-center font-bold text-white text-sm">t</div>
          <span className="text-[17px] font-bold tracking-tight">TopTop</span>
        </div>
        <div className="flex-1 flex items-center bg-elevated rounded-full h-[36px] px-3 gap-2">
          <Search className="w-4 h-4 text-text-muted flex-shrink-0" />
          <input type="text" placeholder="Tìm kiếm" className="bg-transparent flex-1 text-text-primary placeholder:text-text-muted text-[14px] focus:outline-none h-full min-w-0" />
        </div>
        {mounted && isLoggedIn && user ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-elevated flex items-center justify-center border border-elevated">
                {user.avatarUrl
                  ? <img src={user.avatarUrl} alt={user.nickname ?? ""} className="w-full h-full object-cover" />
                  : <span className="text-[13px] font-bold">{(user.nickname ?? user.username ?? "U")[0].toUpperCase()}</span>
                }
              </div>
              <span className="text-[14px] font-semibold truncate max-w-[80px]">{user.nickname ?? user.username}</span>
            </div>
            <button 
              onClick={async () => {
                await authLogout();
                dispatch(clearCredentials());
              }}
              className="text-[12px] font-bold text-brand"
            >
              Logout
            </button>
          </div>
        ) : (
          <button 
            onClick={() => dispatch(openAuthModal("login"))}
            className="btn-primary" 
            style={{ height: 30, fontSize: 13, minWidth: 64, padding: "0 12px" }}
          >
            Log in
          </button>
        )}
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside
          className="hidden lg:flex flex-col flex-shrink-0 border-r border-elevated bg-background overflow-hidden"
          style={{ width: collapsed ? 72 : 240, transition: "width 300ms cubic-bezier(0.4,0,0.2,1)" }}
        >
          <div className="flex items-center px-[18px] pt-5 pb-4 flex-shrink-0">
            <div className="w-14 h-14 rounded-[8px] flex items-center justify-center shadow-lg relative overflow-hidden group">
            <span className="text-white font-extrabold text-3xl italic tracking-tighter absolute z-10">t</span>
            <span className="text-[#25F4EE] font-extrabold text-3xl italic tracking-tighter absolute z-0 -translate-x-[2px] -translate-y-[2px]">t</span>
            <span className="text-[#FE2C55] font-extrabold text-3xl italic tracking-tighter absolute z-0 translate-x-[2px] translate-y-[2px]">t</span>
          </div>
            <span className="text-xl font-bold tracking-tight whitespace-nowrap" style={labelStyle(collapsed, 180, 12)}>TopTop</span>
          </div>

          <div className="px-3 mb-3 flex-shrink-0">
            <button
              onClick={openSearch}
              className="group flex items-center gap-2 w-full rounded-full border border-elevated bg-surface hover:bg-hover transition-colors overflow-hidden"
              style={{ height: 40, paddingLeft: collapsed ? 0 : 14, paddingRight: collapsed ? 0 : 14, justifyContent: collapsed ? "center" : "flex-start" }}
            >
              <Search className="w-[18px] h-[18px] text-text-secondary group-hover:text-text-primary flex-shrink-0" />
              <span className="text-[15px] text-text-secondary whitespace-nowrap" style={labelStyle(collapsed, 150, 2)}>Tìm kiếm</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto flex flex-col">
            <nav className="flex flex-col gap-0.5 px-2">
              <TikNavItem icon={<HomeIcon />} label={'Đề xuất'} active collapsed={collapsed} />
              <TikNavItem icon={<Compass className="w-8 h-8" />} label={'Khám phá'} collapsed={collapsed} />
              <TikNavItem icon={<Users className="w-8 h-8" />} label={'Đã follow'} collapsed={collapsed} />
              <TikNavItem icon={<Users className="w-8 h-8" />} label={'Bạn bè'} collapsed={collapsed} />
              <TikNavItem icon={<Video className="w-8 h-8" />} label={'LIVE'} collapsed={collapsed} />
              <TikNavItem icon={<MessageSquare className="w-8 h-8" />} label={'Tin nhắn'} collapsed={collapsed} />
              <TikNavItem icon={<Bell className="w-8 h-8" />} label={'Hoạt động'} collapsed={collapsed} />
              <TikNavItem icon={<Upload className="w-8 h-8" />} label={'Tải lên'} collapsed={collapsed} />
              <TikNavItem icon={<User className="w-8 h-8" />} label={'Hồ sơ'} collapsed={collapsed} />
            </nav>

            <div
              className="mt-3 border-t border-elevated overflow-hidden"
              style={{
                opacity: collapsed ? 0 : 1,
                maxHeight: collapsed ? 0 : 400,
                transition: "opacity 200ms ease, max-height 300ms cubic-bezier(0.4,0,0.2,1)",
                pointerEvents: collapsed ? "none" : "auto",
              }}
            >
              <p className="text-text-muted text-[13px] font-medium px-4 py-3">Các tài khoản Đã follow</p>
              <ul className="flex flex-col gap-0.5 px-2">
                {FAKE_FOLLOWING.map(u => (
                  <li key={u.username}>
                    <button className="flex items-center gap-3 w-full px-3 py-2 rounded-[8px] hover:bg-hover transition-colors text-left">
                      <span className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[13px] font-bold" style={{ backgroundColor: u.color }}>
                        {u.name[0].toUpperCase()}
                      </span>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[14px] font-medium text-text-primary truncate">{u.name}</span>
                        <span className="text-[12px] text-text-muted truncate">{u.username}</span>
                      </div>
                    </button>
                  </li>
                ))}
                <li>
                  <button className="flex items-center gap-3 w-full px-3 py-2 rounded-[8px] hover:bg-hover transition-colors text-brand text-[14px] font-medium">
                    <span className="w-8 h-8 rounded-full border border-elevated flex items-center justify-center flex-shrink-0">
                      <MoreHorizontal className="w-4 h-4" />
                    </span>
                    See all
                  </button>
                </li>
              </ul>

              {!mounted || !isLoggedIn && (
                <div className="mx-4 mt-4 mb-3 border-t border-elevated pt-4">
                  <p className="text-text-secondary text-[13px] mb-3 leading-relaxed">Log in to follow creators, like videos, and view comments.</p>
                  <button 
                    onClick={() => dispatch(openAuthModal("login"))}
                    className="btn-secondary w-full"
                  >
                    Log in
                  </button>
                </div>
              )}

              <div className="px-4 pb-4">
                <div className="flex flex-wrap gap-x-2 gap-y-1 mb-2">
                  {["Company", "Programs", "Terms", "Privacy"].map(label => (
                    <span key={label} className="text-[11px] text-text-muted hover:underline cursor-pointer">{label}</span>
                  ))}
                </div>
                <span className="text-[11px] text-text-muted">© 2026 TopTop</span>
              </div>
            </div>
          </div>
        </aside>

        <div
          className="hidden lg:flex flex-col flex-shrink-0 border-r border-elevated bg-background overflow-hidden"
          style={{ width: searchOpen ? 310 : 0, opacity: searchOpen ? 1 : 0, transition: "width 300ms cubic-bezier(0.4,0,0.2,1), opacity 220ms ease" }}
        >
          <div className="w-[310px] p-4 flex flex-col gap-5 h-full">
            <div className="flex items-center gap-2 mt-3">
              <h2 className="text-[20px] font-extrabold flex-1">Search</h2>
              <button onClick={closeSearch} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-hover transition-colors text-text-muted hover:text-text-primary">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center bg-elevated rounded-full px-4 h-[44px] gap-2 ring-1 ring-transparent focus-within:ring-[rgba(255,255,255,0.25)] transition-all">
              <Search className="w-4 h-4 text-text-muted flex-shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Accounts and videos"
                className="bg-transparent flex-1 text-text-primary placeholder:text-text-muted text-[14px] focus:outline-none h-full min-w-0"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-text-muted hover:text-text-primary flex-shrink-0"><X className="w-3.5 h-3.5" /></button>
              )}
            </div>

            <section>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">Recent</span>
                <button className="text-brand text-[12px] hover:underline">Clear all</button>
              </div>
              <div className="flex flex-col gap-0.5">
                <SearchRow icon={<Clock className="w-4 h-4" />} label="trending" removable />
                <SearchRow icon={<Clock className="w-4 h-4" />} label="cats" removable />
              </div>
            </section>

            <section>
              <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider block mb-2">You may like</span>
              <div className="flex flex-col gap-0.5">
                <SearchRow icon={<TrendingUp className="w-4 h-4 text-brand" />} label="viral" />
                <SearchRow icon={<TrendingUp className="w-4 h-4 text-brand" />} label="challenge" />
              </div>
            </section>
          </div>
        </div>

        <main className="flex-1 relative overflow-hidden bg-background">
          <div className="hidden lg:flex fixed top-3 right-5 items-center gap-3 z-50 bg-background/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-elevated shadow-lg">
            {mounted && isLoggedIn && user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-hover cursor-pointer transition-colors">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-elevated flex items-center justify-center border border-elevated">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt={user.nickname ?? ""} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[13px] font-bold">
                        {(user.nickname ?? user.username ?? "U")[0].toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span className="text-[15px] font-semibold text-text-primary">
                    {user.nickname ?? user.username}
                  </span>
                </div>
                <div className="w-[1px] h-4 bg-elevated mx-1" />
                <button 
                  onClick={async () => {
                    await authLogout();
                    dispatch(clearCredentials());
                  }}
                  className="text-[14px] font-medium text-text-muted hover:text-brand transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => dispatch(openAuthModal("login"))}
                  className="btn-primary" 
                  style={{ height: 32, fontSize: 14, minWidth: 80, padding: "0 16px" }}
                >
                  Log in
                </button>
                <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-hover transition-colors text-text-muted hover:text-text-primary">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          <div
            className="h-full overflow-y-auto"
            style={{
              scrollSnapType: "y mandatory",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            } as React.CSSProperties}
          >
            {[
              { 
                index: 0, 
                videoUrl: "/sech.mp4",
                aspectRatio: "9/16",
                username: "juxtweb",
                caption: "EVIL AURAA COME OUT! #webtoon #manhwa #webtoonrecomendation #manhwarecomendation",
                likes: "8676",
                comments: "52",
                saves: "2122",
                shares: "113"
              },
              { 
                index: 1, 
                videoUrl: "/snaptik.vn_jok61.mp4",
                aspectRatio: "9/16",
                username: "baprang4k", 
                caption: "This is a vertical video test. 📱 #vertical #toptop",
                likes: "12.5K",
                comments: "431",
                saves: "5000",
                shares: "120"
              }
            ].map((v) => (
              <VideoCard key={v.index} {...v} />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="absolute right-5 bottom-32 flex flex-col gap-2 z-40 hidden xl:flex">
            <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <ChevronUp className="w-6 h-6 text-white" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <ChevronDown className="w-6 h-6 text-white" />
            </button>
          </div>
        </main>
      </div>

      <nav className="lg:hidden flex items-center justify-around border-t border-elevated bg-background h-[56px] flex-shrink-0 z-20">
        <BottomNav icon={<HomeIcon size={24} />} label="Home" active />
        <BottomNav icon={<Compass className="w-6 h-6" />} label="Explore" />
        <BottomNav icon={<Upload className="w-6 h-6" />} label="Upload" />
        <BottomNav icon={<Users className="w-6 h-6" />} label="Friends" />
        <BottomNav icon={<MessageSquare className="w-6 h-6" />} label="Inbox" />
      </nav>
    </div>
  );
}

function labelStyle(collapsed: boolean, w: number, ml: number): React.CSSProperties {
  return {
    opacity: collapsed ? 0 : 1,
    width: collapsed ? 0 : w,
    marginLeft: collapsed ? 0 : ml,
    overflow: "hidden",
    whiteSpace: "nowrap",
    transition: "opacity 180ms ease, width 300ms cubic-bezier(0.4,0,0.2,1), margin 300ms cubic-bezier(0.4,0,0.2,1)",
  };
}

function HomeIcon({ size = 32 }: { size?: number }) {
  return (
    <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
      <path d="M24.95 7.84a1.5 1.5 0 0 0-1.9 0l-16.1 13.2a1.5 1.5 0 0 0 .95 2.66h2.33l1.2 13.03A2.5 2.5 0 0 0 13.9 39h7.59a1 1 0 0 0 1-1v-9.68a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1V38a1 1 0 0 0 1 1h7.59a2.5 2.5 0 0 0 2.49-2.27l1.19-13.03h2.33a1.5 1.5 0 0 0 .95-2.66l-16.1-13.2Z"/>
    </svg>
  );
}

function TikNavItem({ icon, label, active, collapsed }: { icon: React.ReactNode; label: string; active?: boolean; collapsed: boolean }) {
  return (
    <button
      className={`flex items-center rounded-[8px] w-full py-2 transition-colors ${active ? "text-text-primary font-extrabold" : "text-text-secondary hover:bg-hover hover:text-text-primary font-semibold"}`}
      style={{ paddingLeft: 12, paddingRight: 12, justifyContent: collapsed ? "center" : "flex-start" }}
    >
      <span className="flex items-center justify-center w-8 h-8 flex-shrink-0">{icon}</span>
      <span className="text-[16px] whitespace-nowrap" style={labelStyle(collapsed, 160, 12)}>{label}</span>
    </button>
  );
}

function BottomNav({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button className={`flex flex-col items-center gap-0.5 transition-colors ${active ? "text-text-primary" : "text-text-muted hover:text-text-primary"}`}>
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}

function SearchRow({ icon, label, removable }: { icon: React.ReactNode; label: string; removable?: boolean }) {
  return (
    <div className="flex items-center justify-between px-2 py-2 rounded-[8px] hover:bg-hover cursor-pointer group transition-colors">
      <div className="flex items-center gap-3 text-text-secondary group-hover:text-text-primary transition-colors min-w-0">
        <span className="flex-shrink-0">{icon}</span>
        <span className="text-[14px] truncate">{label}</span>
      </div>
      {removable && <X className="w-3.5 h-3.5 text-text-muted opacity-0 group-hover:opacity-100 flex-shrink-0 transition-opacity" />}
    </div>
  );
}

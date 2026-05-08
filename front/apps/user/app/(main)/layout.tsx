"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  Users, Video, X, TrendingUp,
  Compass, MessageSquare, Bell, MoreHorizontal, Upload,
  User, Clock
} from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { openAuthModal } from "@/store/slices/authSlice";
import { useLogoutMutation } from "@/hooks/auth-hooks";

import { 
  SearchRow, 
  TikNavItem, 
  BottomNav, 
  HomeIcon, 
  labelStyle,
  Logo
} from "@/components/layout/LayoutHelpers";

const FAKE_FOLLOWING = [
  { name: "Hải Ly Manga Review", username: "hailymangareview", color: "#FF6B6B" },
  { name: "rivine", username: "rivine7", color: "#4ECDC4" },
  { name: "sagetaoist", username: "sagetaoist", color: "#45B7D1" },
  { name: "Tuệ Mẫn", username: "tueman", color: "#A29BFE" },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const [mounted, setMounted] = useState(false);
  const logoutMutation = useLogoutMutation();
  
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
      {/* Mobile/Tablet Header */}
      <header className="lg:hidden flex items-center gap-3 px-4 h-[60px] border-b border-elevated bg-background/80 backdrop-blur-md z-20 flex-shrink-0">
        <div className="flex items-center gap-2 flex-shrink-0">
          <Logo size="sm" />
          <span className="text-[18px] font-bold tracking-tight">TopTop</span>
        </div>
        <div className="flex-1 flex items-center bg-elevated rounded-full h-[38px] px-3 gap-2 ml-2">
          <Search className="w-4 h-4 text-text-muted flex-shrink-0" />
          <input type="text" placeholder="Tìm kiếm" className="bg-transparent flex-1 text-text-primary placeholder:text-text-muted text-[14px] focus:outline-none h-full min-w-0" />
        </div>
        {!isLoggedIn && (
          <button 
            onClick={() => dispatch(openAuthModal("login"))}
            className="btn-primary whitespace-nowrap ml-2" 
            style={{ height: 32, fontSize: 13, padding: "0 14px" }}
          >
            Log in
          </button>
        )}
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside
          className="hidden lg:flex flex-col flex-shrink-0 border-r border-elevated bg-background overflow-hidden"
          style={{ width: collapsed ? 72 : 240, transition: "width 300ms cubic-bezier(0.4,0,0.2,1)" }}
        >
          <div className="flex items-center px-[18px] pt-6 pb-5 flex-shrink-0">
            <Logo size="md" />
            <span className="text-xl font-bold tracking-tight whitespace-nowrap" style={labelStyle(collapsed, 180, 14)}>TopTop</span>
          </div>

          <div className="px-3 mb-4 flex-shrink-0">
            <button
              onClick={openSearch}
              className="group flex items-center gap-2 w-full rounded-full border border-elevated bg-surface hover:bg-hover transition-colors overflow-hidden"
              style={{ height: 44, paddingLeft: collapsed ? 0 : 16, paddingRight: collapsed ? 0 : 16, justifyContent: collapsed ? "center" : "flex-start" }}
            >
              <Search className="w-[20px] h-[20px] text-text-secondary group-hover:text-text-primary flex-shrink-0" />
              <span className="text-[15px] text-text-secondary whitespace-nowrap" style={labelStyle(collapsed, 150, 4)}>Tìm kiếm</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto flex flex-col custom-scrollbar">
            <nav className="flex flex-col gap-1 px-2">
              <TikNavItem icon={<HomeIcon size={26} />} label={'Đề xuất'} active collapsed={collapsed} />
              <TikNavItem icon={<Compass className="w-[26px] h-[26px]" />} label={'Khám phá'} collapsed={collapsed} />
              <TikNavItem icon={<Users className="w-[26px] h-[26px]" />} label={'Đã follow'} collapsed={collapsed} />
              <TikNavItem icon={<Video className="w-[26px] h-[26px]" />} label={'LIVE'} collapsed={collapsed} />
              <TikNavItem icon={<MessageSquare className="w-[26px] h-[26px]" />} label={'Tin nhắn'} collapsed={collapsed} />
              <TikNavItem icon={<Bell className="w-[26px] h-[26px]" />} label={'Hoạt động'} collapsed={collapsed} />
              <TikNavItem icon={<Upload className="w-[26px] h-[26px]" />} label={'Tải lên'} collapsed={collapsed} />
              <TikNavItem icon={<User className="w-[26px] h-[26px]" />} label={'Hồ sơ'} collapsed={collapsed} />
            </nav>

            <div
              className="mt-4 border-t border-elevated overflow-hidden"
              style={{
                opacity: collapsed ? 0 : 1,
                maxHeight: collapsed ? 0 : 800,
                transition: "opacity 200ms ease, max-height 300ms cubic-bezier(0.4,0,0.2,1)",
                pointerEvents: collapsed ? "none" : "auto",
              }}
            >
              <p className="text-text-muted text-[13px] font-medium px-4 py-4">Các tài khoản Đã follow</p>
              <ul className="flex flex-col gap-1 px-2">
                {FAKE_FOLLOWING.map(u => (
                  <li key={u.username}>
                    <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-[10px] hover:bg-hover transition-colors text-left">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[13px] font-bold shadow-md" style={{ backgroundColor: u.color }}>
                        {u.name[0].toUpperCase()}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[14px] font-semibold text-text-primary truncate">{u.name}</span>
                        <span className="text-[12px] text-text-muted truncate">{u.username}</span>
                      </div>
                    </button>
                  </li>
                ))}
                <li>
                  <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-[10px] hover:bg-hover transition-colors text-brand text-[14px] font-semibold mt-1">
                    <div className="w-8 h-8 rounded-full border border-elevated flex items-center justify-center flex-shrink-0 bg-surface">
                      <MoreHorizontal className="w-4 h-4" />
                    </div>
                    See all
                  </button>
                </li>
              </ul>

              {!mounted || (!isLoggedIn && (
                <div className="mx-4 mt-6 mb-4 p-4 rounded-xl bg-elevated/30 border border-elevated">
                  <p className="text-text-secondary text-[13px] mb-4 leading-relaxed">Đăng nhập để follow các tác giả, thích video và xem bình luận.</p>
                  <button 
                    onClick={() => dispatch(openAuthModal("login"))}
                    className="btn-primary w-full"
                    style={{ height: 40 }}
                  >
                    Log in
                  </button>
                </div>
              ))}

              <div className="px-4 pb-6 mt-4">
                <div className="flex flex-wrap gap-x-3 gap-y-1.5 mb-3 opacity-60">
                  {["Company", "Programs", "Terms", "Privacy"].map(label => (
                    <span key={label} className="text-[11px] text-text-muted hover:underline cursor-pointer">{label}</span>
                  ))}
                </div>
                <span className="text-[11px] text-text-muted opacity-50">© 2026 TopTop</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Search Panel */}
        <div
          className="hidden lg:flex flex-col flex-shrink-0 border-r border-elevated bg-background overflow-hidden shadow-2xl z-10"
          style={{ width: searchOpen ? 320 : 0, opacity: searchOpen ? 1 : 0, transition: "width 300ms cubic-bezier(0.4,0,0.2,1), opacity 220ms ease" }}
        >
          <div className="w-[320px] p-6 flex flex-col gap-6 h-full">
            <div className="flex items-center gap-2 mt-2">
              <h2 className="text-[22px] font-extrabold flex-1">Tìm kiếm</h2>
              <button onClick={closeSearch} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-hover transition-colors text-text-muted hover:text-text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center bg-elevated rounded-full px-4 h-[48px] gap-3 ring-1 ring-transparent focus-within:ring-brand/40 transition-all bg-surface">
              <Search className="w-5 h-5 text-text-muted flex-shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Tài khoản và video"
                className="bg-transparent flex-1 text-text-primary placeholder:text-text-muted text-[15px] focus:outline-none h-full min-w-0"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-text-muted hover:text-text-primary flex-shrink-0"><X className="w-4 h-4" /></button>
              )}
            </div>

            <section>
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-[12px] font-bold text-text-muted uppercase tracking-widest">Gần đây</span>
                <button className="text-brand text-[13px] font-semibold hover:underline">Xóa hết</button>
              </div>
              <div className="flex flex-col gap-1">
                <SearchRow icon={<Clock className="w-4 h-4" />} label="trending" removable />
                <SearchRow icon={<Clock className="w-4 h-4" />} label="cats" removable />
              </div>
            </section>

            <section>
              <span className="text-[12px] font-bold text-text-muted uppercase tracking-widest block mb-3 px-1">Gợi ý cho bạn</span>
              <div className="flex flex-col gap-1">
                <SearchRow icon={<TrendingUp className="w-4 h-4 text-brand" />} label="viral" />
                <SearchRow icon={<TrendingUp className="w-4 h-4 text-brand" />} label="challenge" />
              </div>
            </section>
          </div>
        </div>

        {/* Responsive Header Overlay (Login/User Profile) */}
        <div className="fixed top-3 lg:top-4 right-4 lg:right-6 flex items-center gap-3 z-[60] transition-all duration-300">
          <div className="flex items-center gap-2 bg-background/60 backdrop-blur-xl px-2.5 py-1.5 lg:px-3 lg:py-2 rounded-2xl border border-elevated shadow-2xl hover:bg-background/80 transition-colors">
            {mounted && isLoggedIn && user ? (
              <div className="flex items-center gap-2 lg:gap-3">
                <div className="flex items-center gap-2 lg:gap-2.5 group cursor-pointer">
                  <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full overflow-hidden bg-elevated flex items-center justify-center border-2 border-brand/20 group-hover:border-brand/50 transition-all shadow-inner">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt={user.nickname ?? ""} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[14px] font-bold text-brand">
                        {(user.nickname ?? user.username ?? "U")[0].toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span className="hidden sm:block text-[14px] lg:text-[15px] font-bold text-text-primary group-hover:text-brand transition-colors">
                    {user.nickname ?? user.username}
                  </span>
                </div>
                <div className="w-[1px] h-4 bg-elevated mx-0.5 lg:mx-1" />
                <button 
                  onClick={() => logoutMutation.mutate()}
                  className="text-[13px] lg:text-[14px] font-bold text-text-muted hover:text-brand transition-colors px-1"
                >
                  {logoutMutation.isPending ? "..." : "Logout"}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => dispatch(openAuthModal("login"))}
                  className="btn-primary" 
                  style={{ height: 34, fontSize: 14, minWidth: 84, padding: "0 18px", borderRadius: "12px" }}
                >
                  Log in
                </button>
                <button className="hidden sm:flex w-9 h-9 rounded-xl items-center justify-center hover:bg-hover transition-colors text-text-muted hover:text-text-primary">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 relative overflow-hidden bg-background">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden flex items-center justify-around border-t border-elevated bg-background/90 backdrop-blur-md h-[64px] flex-shrink-0 z-20 pb-safe">
        <BottomNav icon={<HomeIcon size={26} />} label="Home" active />
        <BottomNav icon={<Compass className="w-[26px] h-[26px]" />} label="Explore" />
        <BottomNav icon={<Upload className="w-[26px] h-[26px]" />} label="Upload" />
        <BottomNav icon={<Users className="w-[26px] h-[26px]" />} label="Friends" />
        <BottomNav icon={<User className="w-[26px] h-[26px]" />} label="Profile" />
      </nav>
    </div>
  );
}

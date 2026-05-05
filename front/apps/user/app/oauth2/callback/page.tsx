"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { setToken } from "@/store/authSlice";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    
    if (accessToken) {
      dispatch(setToken(accessToken));
      router.replace("/");
    } else {
      router.replace("/login");
    }
  }, [router, searchParams, dispatch]);

  return null;
}

export default function OAuth2CallbackPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <Loader2 className="w-10 h-10 animate-spin mb-4 text-[#FE2C55]" />
      <h2 className="text-[20px] font-semibold text-text-primary">Đang xác thực...</h2>
      <p className="text-[14px] text-gray-400 mt-2">Vui lòng chờ trong giây lát, hệ thống đang đăng nhập cho bạn.</p>
      
      <Suspense fallback={null}>
        <CallbackContent />
      </Suspense>
    </div>
  );
}

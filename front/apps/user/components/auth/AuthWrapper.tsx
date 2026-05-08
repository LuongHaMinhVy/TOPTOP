"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import AuthModal from "./AuthModal";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { openAuthModal, closeAuthModal } from "@/store/slices/authSlice";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isLoading } = useCurrentUser();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const { isAuthModalOpen, authModalType } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const isAuthPage = pathname === "/login" || pathname === "/signup" || pathname.startsWith("/oauth2") || pathname === "/verify-email";
    
    // Check if we should show the modal on initial entry
    // We can use a session storage flag to avoid showing it on every refresh if the user closes it
    const hasBeenShown = sessionStorage.getItem("initial_auth_modal_shown");

    if (!isLoading && !user && !isAuthPage && !hasBeenShown) {
      const timer = setTimeout(() => {
        dispatch(openAuthModal("login"));
        sessionStorage.setItem("initial_auth_modal_shown", "true");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, user, pathname, dispatch]);

  return (
    <>
      {children}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => dispatch(closeAuthModal())} 
        initialType={authModalType}
      />
    </>
  );
}

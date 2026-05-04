"use client";

import { useState } from "react";
import { 
  QrCode, 
  User, 
  Apple, 
  ChevronLeft,
  X,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type AuthMethod = "options" | "phone_email";

export default function LoginPage() {

  const router = useRouter();
  const [authMethod, setAuthMethod] = useState<AuthMethod>("options");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const payload = { email, password };

      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "An error occurred");
      }

      setSuccessMsg(data.message || "Login successful");
      
      if (data.data && data.data.accessToken) {
        localStorage.setItem("token", data.data.accessToken);
      }
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to authenticate";
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderOptions = () => (
    <div className="flex flex-col gap-4">
      <h2 className="text-[36px] font-bold text-center mb-6 text-text-primary">
        Log in to TopTop
      </h2>

      <div className="flex flex-col gap-4">
        <button className="flex items-center w-full p-3 border border-elevated rounded-[4px] hover:bg-[rgba(255,255,255,0.1)] transition-colors text-text-primary bg-surface">
          <QrCode className="w-5 h-5 ml-2" />
          <span className="flex-1 text-center font-semibold text-[16px]">Use QR code</span>
        </button>

        <button 
          onClick={() => {
            setAuthMethod("phone_email");
            setErrorMsg("");
            setSuccessMsg("");
          }}
          className="flex items-center w-full p-3 border border-elevated rounded-[4px] hover:bg-[rgba(255,255,255,0.1)] transition-colors text-text-primary bg-surface"
        >
          <User className="w-5 h-5 ml-2" />
          <span className="flex-1 text-center font-semibold text-[16px]">Use phone / email / username</span>
        </button>

        <button className="flex items-center w-full p-3 border border-elevated rounded-[4px] hover:bg-[rgba(255,255,255,0.1)] transition-colors text-text-primary bg-surface">
          <Apple className="w-5 h-5 ml-2" />
          <span className="flex-1 text-center font-semibold text-[16px]">Continue with Apple</span>
        </button>
      </div>
    </div>
  );

  const renderForm = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => setAuthMethod("options")}
          className="p-2 -ml-2 rounded-full hover:bg-[rgba(255,255,255,0.1)] transition-colors text-text-primary"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-[28px] font-bold mx-auto text-text-primary">
          Log in
        </h2>
        <div className="w-10"></div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <span className="font-semibold text-[16px] text-text-primary">
          Email / Username
        </span>
      </div>

      {errorMsg && (
        <div className="bg-[#F04438]/10 border border-[#F04438]/50 text-[#F04438] p-3 rounded-[4px] mb-4 text-[14px]">
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div className="bg-[#12B76A]/10 border border-[#12B76A]/50 text-[#12B76A] p-3 rounded-[4px] mb-4 text-[14px]">
          {successMsg}
        </div>
      )}

      <form className="flex flex-col gap-4 flex-1" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email or username"
            required
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Link href="#" className="text-[14px] font-semibold text-text-secondary hover:underline hover:text-text-primary mt-2">
          Forgot password?
        </Link>

        <button 
          type="submit"
          className="btn-primary w-full mt-4 flex items-center justify-center gap-2"
          disabled={isLoading || !email || !password}
        >
          {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
          Log in
        </button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgba(0,0,0,0.7)] px-4">
      <div className="w-full max-w-[480px] bg-transparent rounded-[12px] p-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative flex flex-col">
        
        <Link href="/" className="absolute top-4 right-4 p-2 rounded-full text-text-secondary hover:bg-[rgba(255,255,255,0.1)] hover:text-text-primary transition-colors">
          <X className="w-6 h-6" />
        </Link>

        <div className="flex-1 mt-6">
          {authMethod === "options" ? renderOptions() : renderForm()}
        </div>

        <div className="mt-8 pt-6 border-t border-elevated text-center">
          <p className="text-[12px] text-text-muted mb-6 leading-relaxed">
            By continuing, you agree to our{" "}
            <Link href="#" className="text-text-primary hover:underline">Terms of Service</Link>
            {" "}and confirm that you have read our{" "}
            <Link href="#" className="text-text-primary hover:underline">Privacy Policy</Link>.
          </p>
          
          <div className="flex items-center justify-center gap-2">
            <span className="text-[15px] text-text-primary">
              Don't have an account?
            </span>
            <Link 
              href="/signup"
              className="text-brand font-bold text-[15px] hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { 
  QrCode, 
  User, 
  Apple, 
  ChevronLeft,
  X,
  Loader2,
  Eye,
  EyeOff
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authRegister } from "@/services/auth-api-service";

type AuthMethod = "options" | "phone_email";

export default function SignupPage() {

  const router = useRouter();
  const [authMethod, setAuthMethod] = useState<AuthMethod>("options");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const validateForm = () => {
    if (username.length < 2 || username.length > 24) {
      return "Username must be between 2 and 24 characters.";
    }
    if (!/^[a-zA-Z0-9._]+$/.test(username)) {
      return "Username can only contain letters, numbers, dots, and underscores.";
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Invalid email format.";
    }

    if (password.length < 8 || password.length > 20) {
      return "Password must be between 8 and 20 characters.";
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,20}$/.test(password)) {
      return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&#).";
    }

    if (!dateOfBirth) {
      return "Date of birth is required.";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await authRegister({ username, email, password, dateOfBirth });

      setSuccessMsg(response.message || "Registration successful");
      
      setTimeout(() => {
        router.push("/login");
      }, 2000);
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
        Sign up for TopTop
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
          Sign up
        </h2>
        <div className="w-10"></div>
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
            type="text"
            placeholder="Username"
            required
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            required
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="input-field pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-text-primary transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          <input
            type="date"
            placeholder="Date of birth"
            required
            className="input-field"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>

        <button 
          type="submit"
          className="btn-primary w-full mt-4 flex items-center justify-center gap-2"
          disabled={isLoading || !email || !password || !username || !dateOfBirth}
        >
          {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
          Sign up
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
              Already have an account?
            </span>
            <Link 
              href="/login"
              className="text-brand font-bold text-[15px] hover:underline"
            >
              Log in
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

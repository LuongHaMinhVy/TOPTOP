"use client";

import { useState, useEffect } from "react";
import { 
  User, 
  ChevronLeft,
  X,
  Loader2,
  Eye,
  EyeOff
} from "lucide-react";
import { useRouter } from "next/navigation";
import { authLogin, authRegister } from "@/services/auth-api-service";
import Facebook from "@/components/FaceBookIcon";
import Google from "@/components/GoogleIcon";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/authSlice";
import { useMutation } from "@tanstack/react-query";

type AuthType = "login" | "signup";
type AuthMethod = "options" | "form";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: AuthType;
}

export default function AuthModal({ isOpen, onClose, initialType = "login" }: AuthModalProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [type, setType] = useState<AuthType>(initialType);
  const [method, setMethod] = useState<AuthMethod>("options");
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    dateOfBirth: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setType(initialType);
      setMethod("options");
      resetForm();
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, initialType]);

  const resetForm = () => {
    setFormData({ email: "", password: "", username: "", dateOfBirth: "" });
    setErrorMsg("");
    setSuccessMsg("");
    setShowPassword(false);
  };

  const handleOAuth = (provider: 'google' | 'facebook') => {
    const urls = {
      google: `${process.env.NEXT_PUBLIC_BACK_END_URL}/oauth2/authorization/google`,
      facebook: `${process.env.NEXT_PUBLIC_BACK_END_URL}/login/oauth2/code/facebook`
    };
    window.location.href = urls[provider];
  };

  const loginMutation = useMutation({
    mutationFn: authLogin,
    onSuccess: (response) => {
      setSuccessMsg(response.message || "Login successful");
      if (response.data) dispatch(setCredentials(response.data));
      setTimeout(() => { onClose(); router.refresh(); }, 1000);
    },
    onError: (err: any) => setErrorMsg(err.message || "Failed to authenticate")
  });

  const validateSignup = () => {
    const { username, email, password, dateOfBirth } = formData;
    if (username.length < 2 || username.length > 24) return "Username must be 2-24 characters.";
    if (!/^[a-zA-Z0-9._]+$/.test(username)) return "Invalid username characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (!dateOfBirth) return "Date of birth is required.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (type === "signup") {
      const err = validateSignup();
      if (err) return setErrorMsg(err);
      try {
        const response = await authRegister(formData);
        setSuccessMsg(response.message || "Registration successful");
        setTimeout(() => { setType("login"); setMethod("form"); }, 1500);
      } catch (err: any) {
        setErrorMsg(err.message || "Registration failed");
      }
    } else {
      loginMutation.mutate({ email: formData.email, password: formData.password });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-[480px] bg-[#121212] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:bg-white/10 hover:text-white transition-colors z-10">
          <X className="w-6 h-6" />
        </button>

        <div className="flex-1 px-8 pt-10 pb-6 overflow-y-auto custom-scrollbar">
          {method === "options" ? (
            <div className="flex flex-col gap-6">
              <h2 className="text-[32px] font-bold text-center text-white">
                {type === "login" ? "Log in to TopTop" : "Sign up for TopTop"}
              </h2>
              <div className="flex flex-col gap-3">
                <OptionBtn icon={<User className="w-5 h-5" />} text="Use email" onClick={() => setMethod("form")} />
                <OptionBtn icon={<Google className="w-5 h-5" />} text="Continue with Google" onClick={() => handleOAuth('google')} />
                <OptionBtn icon={<Facebook className="w-5 h-5" />} text="Continue with Facebook" onClick={() => handleOAuth('facebook')} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex items-center mb-8">
                <button onClick={() => setMethod("options")} className="p-2 -ml-2 rounded-full hover:bg-white/10 text-white"><ChevronLeft className="w-6 h-6" /></button>
                <h2 className="text-[24px] font-bold mx-auto text-white">{type === "login" ? "Log in" : "Sign up"}</h2>
                <div className="w-10" />
              </div>

              {(errorMsg || successMsg) && (
                <div className={`p-3 rounded-sm mb-4 text-[14px] border ${errorMsg ? "bg-red-500/10 border-red-500/50 text-red-500" : "bg-green-500/10 border-green-500/50 text-green-500"}`}>
                  {errorMsg || successMsg}
                </div>
              )}

              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                {type === "signup" && (
                  <>
                    <Input label="Username" placeholder="Username" value={formData.username} onChange={v => setFormData({...formData, username: v})} />
                    <Input label="Birthday" type="date" value={formData.dateOfBirth} onChange={v => setFormData({...formData, dateOfBirth: v})} />
                  </>
                )}
                <Input label="Email" type="email" placeholder="Email address" value={formData.email} onChange={v => setFormData({...formData, email: v})} />
                <div className="relative">
                  <Input 
                    label="Password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Password" 
                    value={formData.password} 
                    onChange={v => setFormData({...formData, password: v})} 
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute bottom-3 right-4 text-gray-400 hover:text-white">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                
                {type === "login" && <button type="button" className="text-[13px] font-semibold text-gray-400 hover:underline text-left">Forgot password?</button>}
                
                <button type="submit" disabled={loginMutation.isPending} className="w-full bg-[#fe2c55] hover:bg-[#ef2950] disabled:opacity-50 text-white font-bold py-3 rounded-sm mt-4 flex items-center justify-center gap-2">
                  {loginMutation.isPending && <Loader2 className="w-5 h-5 animate-spin" />}
                  {type === "login" ? "Log in" : "Sign up"}
                </button>
              </form>
            </div>
          )}
        </div>

        <div className="bg-[#121212] border-t border-white/5 p-6 flex flex-col items-center gap-4">
          <p className="text-[12px] text-gray-500 text-center leading-tight max-w-[320px]">
            By continuing, you agree to TopTop's <span className="text-white hover:underline cursor-pointer">Terms of Service</span> and <span className="text-white hover:underline cursor-pointer">Privacy Policy</span>.
          </p>
          <div className="flex items-center gap-2 text-[15px]">
            <span className="text-white">{type === "login" ? "Don't have an account?" : "Already have an account?"}</span>
            <button onClick={() => { setType(type === "login" ? "signup" : "login"); setMethod("options"); resetForm(); }} className="text-[#fe2c55] font-bold hover:underline">
              {type === "login" ? "Sign up" : "Log in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function OptionBtn({ icon, text, onClick }: { icon: React.ReactNode, text: string, onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center w-full p-3 border border-white/10 rounded-sm hover:bg-white/5 bg-[#1f1f1f] transition-colors">
      <div className="ml-2">{icon}</div>
      <span className="flex-1 text-center font-semibold text-[15px] text-white">{text}</span>
    </button>
  );
}

function Input({ label, value, onChange, ...props }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[14px] font-semibold text-white ml-1">{label}</label>
      <input
        {...props}
        className="w-full bg-[#2f2f2f] border-none rounded-sm px-4 py-3 text-white placeholder:text-gray-500 focus:ring-1 focus:ring-white/20 outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

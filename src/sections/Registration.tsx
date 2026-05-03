"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { CheckCircle, ChevronLeft, Terminal, Eye, EyeOff, ShieldAlert } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type FormData = {
  name: string;
  email: string;
  password: string;
  teamName: string;
  track: string;
};

export default function Registration() {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, trigger, formState: { errors } } = useForm<FormData>();

  const nextStep = async () => {
    const fields = step === 1 ? ["name", "email", "password"] as const : ["teamName", "track"] as const;
    const valid = await trigger(fields);
    if (valid) setStep((s) => s + 1);
  };

  const onSubmit = (data: FormData) => {
    console.log("Transmission Received:", data);
    setIsSuccess(true);
  };

  const glassPanel = "bg-black/40 backdrop-blur-xl border-2 border-[#00FFC2]/20 rounded-2xl shadow-[8px_8px_0px_rgba(0,255,194,0.1)] flex flex-col justify-between";
  const inputStyle = "w-full bg-black/60 border-2 border-white/10 rounded-xl px-5 py-4 text-white focus:border-[#00FFC2] focus:shadow-[0_0_15px_rgba(0,255,194,0.2)] outline-none transition-all font-mono text-sm";
  const labelStyle = "block text-xs font-mono text-[#00FFC2] mb-2 tracking-widest uppercase";

  return (
    <section className="py-24 relative flex items-center justify-center z-20" id="register">
      <div className="max-w-6xl w-full mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 italic uppercase">
            System <span className="text-[#00FFC2]">Access</span>
          </h2>
          <p className="text-gray-500 font-mono tracking-widest text-sm uppercase">Initialize Operative Onboarding</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch min-h-[550px]">
          <div className={cn(glassPanel, "p-8 md:p-10 border-white/10")}>
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center text-center">
                  <CheckCircle className="w-16 h-16 text-[#00FFC2] mb-6" />
                  <h3 className="text-3xl font-black mb-3 italic">ACCESS GRANTED</h3>
                  <p className="text-gray-400 font-mono text-sm mb-10">Credentials encrypted and uploaded to the grid.</p>
                  <button 
                    onClick={() => { setStep(1); setIsSuccess(false); }} 
                    className="w-full py-4 border-2 border-[#00FFC2] text-[#00FFC2] font-bold rounded-xl uppercase"
                    suppressHydrationWarning
                  >
                    Reset Console
                  </button>
                </motion.div>
              ) : (
                <motion.form key={step} onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-10">
                      <span className="text-[10px] font-mono text-[#00FFC2] tracking-widest">PHASE_0{step}</span>
                      <div className="flex gap-2 w-32">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className={cn("h-1 flex-1 rounded-full transition-all", step >= i ? "bg-[#00FFC2]" : "bg-white/10")} />
                        ))}
                      </div>
                    </div>

                    {step === 1 && (
                      <div className="space-y-5">
                        <div>
                          <label className={labelStyle}>Operative Alias</label>
                          <input {...register("name", { required: true })} className={inputStyle} placeholder="FULL NAME" suppressHydrationWarning />
                        </div>
                        <div>
                          <label className={labelStyle}>Comms Link</label>
                          <input {...register("email", { required: true })} type="email" className={inputStyle} placeholder="EMAIL@GRID.COM" suppressHydrationWarning />
                        </div>
                        <div>
                          <label className={labelStyle}>Secure Cipher</label>
                          <div className="relative">
                            <input 
                              type={showPassword ? "text" : "password"} 
                              {...register("password", { required: true })} 
                              className={inputStyle} 
                              placeholder="••••••••" 
                              suppressHydrationWarning 
                            />
                            <button 
                              type="button" 
                              onClick={() => setShowPassword(!showPassword)} 
                              className="absolute right-5 top-1/2 -translate-y-1/2 text-[#00FFC2]/60 hover:text-[#00FFC2] transition-colors"
                              suppressHydrationWarning
                            >
                              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-6">
                        <div>
                          <label className={labelStyle}>Squad Designation</label>
                          <input {...register("teamName", { required: true })} className={inputStyle} placeholder="TEAM NAME" suppressHydrationWarning />
                        </div>
                        <div>
                          <label className={labelStyle}>Operational Track</label>
                          <select {...register("track", { required: true })} className={cn(inputStyle, "appearance-none cursor-pointer")} suppressHydrationWarning>
                            <option value="" className="bg-black">CHOOSE VECTOR...</option>
                            <option value="ai" className="bg-black">AI & ML</option>
                            <option value="web3" className="bg-black">WEB3 & BLOCKCHAIN</option>
                            <option value="cyber" className="bg-black">CYBERSECURITY</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="h-full flex flex-col items-center justify-center text-center py-6">
                        <ShieldAlert className="w-16 h-16 text-[#00FFC2] mb-4 animate-pulse" />
                        <h3 className="text-xl font-bold mb-2 uppercase italic">Finalize Transmission</h3>
                        <p className="text-gray-500 text-xs font-mono">Hardware must be ready for 24h sustained uptime.</p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center mt-10">
                    {step > 1 ? (
                      <button 
                        type="button" 
                        onClick={() => setStep(step - 1)} 
                        className="text-[10px] font-mono text-gray-500 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2"
                        suppressHydrationWarning
                      >
                        <ChevronLeft size={14} /> Previous
                      </button>
                    ) : <div />}
                    
                    <button 
                      type={step < 3 ? "button" : "submit"} 
                      onClick={step < 3 ? nextStep : undefined} 
                      className="px-8 py-3 bg-[#00FFC2] text-black font-black rounded-lg uppercase tracking-tighter hover:bg-white transition-colors"
                      suppressHydrationWarning
                    >
                      {step < 3 ? "Next_Phase" : "Submit_Application"}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <div className={cn(glassPanel, "p-10 md:p-12 border-[#00FFC2]/20 bg-gradient-to-br from-[#00FFC2]/5 to-transparent")}>
            <div className="flex items-center gap-3 mb-10">
              <Terminal size={20} className="text-[#00FFC2]" />
              <span className="uppercase font-mono tracking-widest text-[10px] text-[#00FFC2]">HackStreet_Intel</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black italic leading-tight uppercase">
              The future belongs to those who code the invisible.
            </h3>
            <div className="mt-10 space-y-6">
              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                <div>
                  <p className="text-[10px] font-mono text-gray-500 uppercase">Status</p>
                  <p className="text-xs font-bold text-[#00FFC2]">● LIVE_NODE</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-gray-500 uppercase">Location</p>
                  <p className="text-xs font-bold uppercase">Raichur_NIT</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { CheckCircle, ChevronRight, ChevronLeft, Terminal, Eye, EyeOff, ShieldAlert } from "lucide-react";

// --- REFINED TYPEWRITER COMPONENT ---
function Typewriter({ text, speed = 50 }: { text: string; speed?: number }) {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [index, text, speed]);

  return (
    <span>
      {displayText}
      <span className="animate-pulse text-[#00FFC2]">_</span>
    </span>
  );
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

  // Reusable Cyber-Brutalist Glass Style
  const glassPanel = "bg-black/40 backdrop-blur-xl border-2 border-[#00FFC2]/20 rounded-2xl shadow-[8px_8px_0px_rgba(0,255,194,0.1)] flex flex-col justify-between";
  const inputStyle = "w-full bg-black/60 border-2 border-white/10 rounded-xl px-5 py-4 text-white focus:border-[#00FFC2] focus:shadow-[0_0_15px_rgba(0,255,194,0.2)] outline-none transition-all font-mono text-sm";
  const labelStyle = "block text-xs font-mono text-[#00FFC2] mb-2 tracking-widest uppercase";

  return (
    <section className="min-h-screen py-24 relative flex items-center justify-center overflow-hidden" id="register">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#00FFC2]/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl w-full mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black tracking-tighter mb-4 italic"
          >
            SYSTEM <span className="text-[#00FFC2] drop-shadow-[0_0_10px_rgba(0,255,194,0.5)]">ACCESS</span>
          </motion.h2>
          <p className="text-gray-500 font-mono tracking-widest text-sm uppercase">Initialize Operative Onboarding</p>
        </div>

        {/* Container with items-stretch to force equal height */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch min-h-[550px]">
          
          {/* LEFT - DYNAMIC FORM PANEL */}
          <div className={`${glassPanel} p-8 md:p-10 border-white/10`}>
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-[#00FFC2]/10 flex items-center justify-center mb-6 border-2 border-[#00FFC2]">
                    <CheckCircle className="w-12 h-12 text-[#00FFC2]" />
                  </div>
                  <h3 className="text-3xl font-black mb-3">ACCESS GRANTED</h3>
                  <p className="text-gray-400 font-mono text-sm max-w-xs mb-10">Your credentials have been encrypted and uploaded to the neural grid.</p>
                  <button 
                    onClick={() => { setStep(1); setIsSuccess(false); }}
                    className="w-full py-4 border-2 border-[#00FFC2] text-[#00FFC2] hover:bg-[#00FFC2] hover:text-black font-bold rounded-xl transition-all uppercase tracking-widest"
                  >
                    Reset Console
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key={step}
                  onSubmit={handleSubmit(onSubmit)} 
                  className="h-full flex flex-col"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="flex-1">
                    {/* Stepper Display */}
                    <div className="flex items-center justify-between mb-10">
                      <span className="text-[10px] font-mono text-[#00FFC2] tracking-[0.3em]">PHASE_0{step}</span>
                      <div className="flex gap-2 w-32">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= i ? "bg-[#00FFC2] shadow-[0_0_8px_#00FFC2]" : "bg-white/10"}`} />
                        ))}
                      </div>
                    </div>

                    {step === 1 && (
                      <div className="space-y-5">
                        <div>
                          <label className={labelStyle}>Operative Alias</label>
                          <input {...register("name", { required: true })} className={inputStyle} placeholder="FULL NAME" />
                        </div>
                        <div>
                          <label className={labelStyle}>Comms Link</label>
                          <input {...register("email", { required: true })} type="email" className={inputStyle} placeholder="EMAIL@GRID.COM" />
                        </div>
                        <div>
                          <label className={labelStyle}>Secure Cipher</label>
                          <div className="relative">
                            <input 
                              type={showPassword ? "text" : "password"} 
                              {...register("password", { required: true })} 
                              className={inputStyle} 
                              placeholder="••••••••"
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-[#00FFC2]/60 hover:text-[#00FFC2]">
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
                          <input {...register("teamName", { required: true })} className={inputStyle} placeholder="TEAM NAME" />
                        </div>
                        <div>
                          <label className={labelStyle}>Operational Track</label>
                          <select {...register("track", { required: true })} className={`${inputStyle} appearance-none`}>
                            <option value="" className="bg-[#0B0B0B]">CHOOSE VECTOR...</option>
                            <option value="ai" className="bg-[#0B0B0B]">AI & MACHINE LEARNING</option>
                            <option value="web3" className="bg-[#0B0B0B]">WEB3 & BLOCKCHAIN</option>
                            <option value="cyber" className="bg-[#0B0B0B]">CYBERSECURITY</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="h-full flex flex-col items-center justify-center text-center py-6">
                        <ShieldAlert className="w-16 h-16 text-[#00FFC2] mb-4 animate-pulse" />
                        <h3 className="text-xl font-bold mb-2 uppercase tracking-tighter">Finalize Transmission</h3>
                        <p className="text-gray-500 text-xs font-mono leading-relaxed">
                          By clicking submit, you agree to follow the HackStreet protocol. Your hardware must be ready for 24h sustained uptime.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Navigation Button Footer */}
                  <div className="flex justify-between items-center mt-10">
                    {step > 1 ? (
                      <button type="button" onClick={() => setStep(step - 1)} className="text-[10px] font-mono text-gray-500 hover:text-white flex items-center gap-2 uppercase tracking-widest">
                        <ChevronLeft size={14} /> Previous_Step
                      </button>
                    ) : <div />}
                    
                    {step < 3 ? (
                      <button type="button" onClick={nextStep} className="px-8 py-3 bg-white text-black font-black rounded-lg hover:bg-[#00FFC2] transition-all flex items-center gap-2 text-xs uppercase tracking-tighter">
                        Next_Phase <ChevronRight size={16} />
                      </button>
                    ) : (
                      <button type="submit" className="px-8 py-4 bg-[#00FFC2] text-black font-black rounded-lg hover:shadow-[0_0_20px_rgba(0,255,194,0.4)] transition-all text-xs uppercase tracking-tighter">
                        Submit_Application
                      </button>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT - INFO PANEL (MATCHED HEIGHT) */}
          <div className={`${glassPanel} p-10 md:p-12 border-[#00FFC2]/20 bg-gradient-to-br from-[#00FFC2]/5 to-transparent`}>
            <div>
              <div className="flex items-center gap-3 mb-10">
                <div className="p-2 rounded-lg bg-[#00FFC2]/10 border border-[#00FFC2]/20">
                  <Terminal size={20} className="text-[#00FFC2]" />
                </div>
                <span className="uppercase font-mono tracking-[0.3em] text-[10px] text-[#00FFC2]">HackStreet_Intel</span>
              </div>

              <div className="min-h-[120px]">
                <blockquote className="text-2xl md:text-3xl font-black leading-tight tracking-tighter italic">
                  “<Typewriter text="The future belongs to those who code the invisible." />”
                </blockquote>
              </div>
            </div>

            <div className="space-y-6">
              <div className="h-px w-full bg-gradient-to-r from-[#00FFC2]/30 to-transparent" />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-mono text-gray-500 uppercase">Status</p>
                  <p className="text-xs font-bold text-[#00FFC2] animate-pulse">● LIVE_NODE</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-mono text-gray-500 uppercase">Location</p>
                  <p className="text-xs font-bold">RAICHUR_NIT</p>
                </div>
              </div>
              <p className="text-gray-500 text-[10px] font-mono leading-relaxed uppercase">
                All applications are processed through the neural grid. Selected teams will receive encrypted access codes via their provided comms link.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
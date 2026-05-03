// src/components/AIAssistant.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot } from "lucide-react";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "System initialized. How can I assist your hackathon deployment?", isBot: true }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: input, isBot: false }]);
    setInput("");

    // Mock AI Logic
    setTimeout(() => {
      let response = "I am processing your query. Please refer to the timeline for event details.";
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes("prize")) response = "The total bounty pool is over $8,000, including a $5,000 Grand Champion prize.";
      if (lowerInput.includes("track")) response = "We have three main vectors: AI/ML, Web3, and FinTech.";
      if (lowerInput.includes("time") || lowerInput.includes("start")) response = "Initialization begins Day 1 at 09:00 AM. You have exactly 24 hours.";

      setMessages(prev => [...prev, { text: response, isBot: true }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-80 glass-card overflow-hidden flex flex-col h-96 shadow-[0_0_40px_rgba(0,255,194,0.1)]"
          >
            {/* Header */}
            <div className="bg-white/5 border-b border-white/10 p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-[#00FFC2]" />
                <span className="font-bold text-white text-sm">Event AI Oracle</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[85%] p-3 rounded-lg text-sm ${
                    msg.isBot ? 'bg-white/10 text-gray-300 rounded-tl-none' : 'bg-[#00FFC2]/20 text-[#00FFC2] border border-[#00FFC2]/30 rounded-tr-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-black/20 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about HackStreet..."
                className="flex-1 bg-transparent text-sm text-white focus:outline-none placeholder:text-gray-600"
              />
              <button type="submit" className="text-[#00FFC2] hover:scale-110 transition-transform">
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#00FFC2] rounded-full flex items-center justify-center text-black shadow-[0_0_20px_rgba(0,255,194,0.4)] hover:scale-110 transition-transform"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
}
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

// ── Types ──────────────────────────────────────────────────────────────────

type MessageRole = "user" | "assistant";

interface Message {
  id: string;
  role: MessageRole;
  content: string;
}

interface LeadForm {
  name: string;
  phone: string;
}

interface ChatResponse {
  reply: string;
  leadCapture?: boolean;
}

// ── Constants ──────────────────────────────────────────────────────────────

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: "سلام عزیزم 🌸 من دستیار هوشمند کلینیک دکتر گیتی یزدانپرست هستم. چطور می‌تونم راهنمایی‌تون کنم؟",
};

function randomId() {
  return Math.random().toString(36).slice(2);
}

// ── Icons ──────────────────────────────────────────────────────────────────

function ChatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ── Loading dots ───────────────────────────────────────────────────────────

function LoadingDots() {
  return (
    <div className="flex justify-end">
      <div className="bg-primary rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 bg-cream/70 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(randomId);

  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadForm, setLeadForm] = useState<LeadForm>({ name: "", phone: "" });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadService, setLeadService] = useState("");
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, showLeadForm]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = { id: randomId(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const allMessages = [...messages, userMsg]
        .filter((m) => m.id !== "welcome")
        .slice(-10)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: allMessages, sessionId }),
      });

      if (!res.ok) throw new Error("API error");
      const data: ChatResponse = await res.json();

      const botMsg: Message = { id: randomId(), role: "assistant", content: data.reply };
      setMessages((prev) => [...prev, botMsg]);

      if (data.leadCapture && !leadSubmitted) {
        setLeadService(text);
        setShowLeadForm(true);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: randomId(),
          role: "assistant",
          content: "متأسفم، مشکلی پیش آمد. لطفاً دوباره تلاش کنید یا مستقیماً با کلینیک تماس بگیرید. 💜",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, sessionId, leadSubmitted]);

  const handleLeadSubmit = useCallback(async () => {
    if (!leadForm.name.trim() || !leadForm.phone.trim() || isSubmittingLead) return;

    setIsSubmittingLead(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadForm.name,
          phone: leadForm.phone,
          requestedService: leadService,
          sessionId,
        }),
      });
    } catch {
      // Silent — don't break the UX
    } finally {
      setIsSubmittingLead(false);
    }

    setLeadSubmitted(true);
    setShowLeadForm(false);
    setMessages((prev) => [
      ...prev,
      {
        id: randomId(),
        role: "assistant",
        content: `ممنون ${leadForm.name} عزیز 💜 اطلاعات شما ثبت شد. همکاران کلینیک به زودی با شماره ${leadForm.phone} با شما تماس می‌گیرند. 🌸`,
      },
    ]);
  }, [leadForm, leadService, sessionId, isSubmittingLead]);

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height = Math.min(e.currentTarget.scrollHeight, 128) + "px";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Trigger button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="trigger"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.5 }}
            onClick={() => setIsOpen(true)}
            aria-label="گفتگو با دستیار کلینیک"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full
                       bg-gradient-to-br from-primary to-deep text-cream
                       shadow-lg shadow-primary/40
                       flex items-center justify-center
                       hover:scale-105 transition-transform duration-200
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <ChatIcon />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-6 right-6 z-50
                       w-[calc(100vw-3rem)] sm:w-96
                       h-[520px] max-h-[calc(100vh-5rem)]
                       rounded-2xl bg-white
                       border border-primary/20 shadow-2xl shadow-primary/20
                       flex flex-col overflow-hidden"
            style={{ transformOrigin: "bottom right" }}
          >
            {/* Header */}
            <div className="bg-primary px-4 py-3 flex items-center justify-between flex-shrink-0">
              <button
                onClick={() => setIsOpen(false)}
                aria-label="بستن چت"
                className="text-cream/70 hover:text-cream transition-colors duration-150 p-0.5"
              >
                <CloseIcon />
              </button>
              <div className="flex items-center gap-2.5">
                <div className="text-right">
                  <p className="font-sans text-[13px] text-cream font-medium leading-tight">
                    کلینیک دکتر گیتی یزدانپرست
                  </p>
                  <div className="flex items-center justify-end gap-1 mt-0.5">
                    <span className="font-sans text-[11px] text-cream/60">دستیار هوشمند</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                  </div>
                </div>
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-gold/30 border-2 border-gold/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-gold text-sm">✨</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div
              dir="rtl"
              className="flex-1 overflow-y-auto p-4 space-y-3 bg-cream/30"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                  className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[82%] px-4 py-2.5 font-sans text-sm leading-relaxed whitespace-pre-wrap break-words ${
                      msg.role === "user"
                        ? "bg-white border border-gray-100 text-darktext rounded-2xl rounded-tr-sm shadow-sm"
                        : "bg-primary text-cream rounded-2xl rounded-tl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {isLoading && <LoadingDots />}
              <div ref={messagesEndRef} />
            </div>

            {/* Lead capture form */}
            <AnimatePresence>
              {showLeadForm && !leadSubmitted && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="border-t border-primary/10 bg-cream/60 p-4 flex-shrink-0"
                  dir="rtl"
                >
                  <p className="font-sans text-[12px] text-darktext/60 mb-3">
                    برای هماهنگی، اطلاعات زیر را وارد کنید:
                  </p>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="نام شما"
                      value={leadForm.name}
                      onChange={(e) => setLeadForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full border border-gray-200 bg-white px-3 py-2 rounded-lg
                                 font-sans text-sm text-darktext placeholder:text-gray-400
                                 focus:outline-none focus:border-primary/50 focus:bg-white
                                 transition-all duration-200"
                    />
                    <input
                      type="tel"
                      dir="ltr"
                      placeholder="۰۹۱۲..."
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm((f) => ({ ...f, phone: e.target.value }))}
                      className="w-full border border-gray-200 bg-white px-3 py-2 rounded-lg
                                 font-sans text-sm text-darktext placeholder:text-gray-400
                                 focus:outline-none focus:border-primary/50 focus:bg-white
                                 transition-all duration-200 text-left"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleLeadSubmit}
                        disabled={!leadForm.name.trim() || !leadForm.phone.trim() || isSubmittingLead}
                        className="flex-1 bg-primary text-cream font-sans text-sm py-2 rounded-lg
                                   hover:bg-deep transition-colors duration-200
                                   disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmittingLead ? "در حال ارسال..." : "ارسال"}
                      </button>
                      <button
                        onClick={() => setShowLeadForm(false)}
                        className="px-3 py-2 rounded-lg border border-gray-200 font-sans text-sm
                                   text-darktext/60 hover:text-darktext hover:border-gray-300
                                   transition-all duration-200"
                      >
                        بعداً
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input area */}
            {(!showLeadForm || leadSubmitted) && (
              <div
                dir="rtl"
                className="border-t border-gray-100 p-3 flex items-end gap-2 flex-shrink-0 bg-white"
              >
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={input}
                  onChange={handleTextareaInput}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  placeholder="پیام خود را بنویسید..."
                  className="flex-1 resize-none border border-gray-200 bg-gray-50 px-3 py-2.5 rounded-xl
                             font-sans text-sm text-darktext placeholder:text-gray-400
                             focus:outline-none focus:border-primary/50 focus:bg-white
                             transition-all duration-200 max-h-32 leading-relaxed
                             disabled:opacity-60"
                  style={{ minHeight: "42px" }}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  aria-label="ارسال"
                  className="w-10 h-10 rounded-xl bg-primary text-cream flex-shrink-0
                             flex items-center justify-center
                             hover:bg-deep transition-colors duration-200
                             disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <SendIcon />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

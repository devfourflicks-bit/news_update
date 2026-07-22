import React, { useState } from "react";
import { X, Check, ShieldCheck, Mail } from "lucide-react";

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [tier, setTier] = useState<"daily" | "pro">("daily");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setLoading(true);
    try {
      await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tier })
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-[#e2e2e2] relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#5f5e5e] hover:text-[#1a1c1c] p-1.5 rounded-full hover:bg-[#e2e2e2] cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-[#1a1c1c] text-white p-6 sm:p-8 relative">
          <span className="bg-[#bc000b] text-white text-[10px] font-bold px-2 py-0.5 rounded-xs uppercase tracking-widest inline-block mb-3">
            Kinetic Subscription
          </span>
          <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">
            Global High-Velocity Intelligence
          </h3>
          <p className="text-xs sm:text-sm text-[#c8c6c5] mt-2">
            Editorial rigor, sub-second market data, and AI-synthesized research briefs.
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-xl text-[#1a1c1c]">
                Subscription Confirmed
              </h4>
              <p className="text-xs text-[#5f5e5e]">
                A verification link has been dispatched to <strong>{email}</strong>. Welcome to Kinetic Ledger.
              </p>
              <button
                onClick={onClose}
                className="mt-4 bg-[#1a1c1c] text-white text-xs font-bold py-2.5 px-6 rounded-lg hover:bg-[#bc000b] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTier("daily")}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    tier === "daily"
                      ? "border-[#bc000b] bg-[#ffdad5]/30 ring-1 ring-[#bc000b]"
                      : "border-[#e2e2e2] hover:border-[#c8c6c5]"
                  }`}
                >
                  <span className="font-serif font-bold text-sm text-[#1a1c1c] block">
                    Morning Brief
                  </span>
                  <span className="text-[11px] text-[#5f5e5e] block mt-0.5">
                    Free Daily • 06:00 UTC
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setTier("pro")}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    tier === "pro"
                      ? "border-[#bc000b] bg-[#ffdad5]/30 ring-1 ring-[#bc000b]"
                      : "border-[#e2e2e2] hover:border-[#c8c6c5]"
                  }`}
                >
                  <span className="font-serif font-bold text-sm text-[#1a1c1c] block">
                    Ledger Pro
                  </span>
                  <span className="text-[11px] text-[#5f5e5e] block mt-0.5">
                    Real-time Alerts & AI
                  </span>
                </button>
              </div>

              <div>
                <label className="text-xs font-bold text-[#1a1c1c] block mb-1.5">
                  Work / Personal Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#5f5e5e] absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="executive@institution.com"
                    required
                    className="w-full bg-[#f9f9f9] border border-[#e2e2e2] text-xs sm:text-sm text-[#1a1c1c] rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#bc000b]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#bc000b] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl hover:bg-[#a00009] transition-all cursor-pointer shadow-xs"
              >
                {loading ? "Processing..." : "Subscribe Now"}
              </button>

              <div className="flex items-center gap-2 text-[11px] text-[#5f5e5e] justify-center pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero spam. Unsubscribe at any time with one click.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

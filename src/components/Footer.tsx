import React from "react";
import { CategoryType } from "../types";

interface FooterProps {
  onSelectCategory: (cat: CategoryType) => void;
  onGoHome: () => void;
  onOpenSubscribe?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onGoHome
}) => {
  return (
    <footer className="bg-[#1a1c1c] text-white border-t border-[#2f3131] mt-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
          {/* Brand Info */}
          <div className="max-w-sm">
            <button
              onClick={onGoHome}
              className="font-serif font-bold text-3xl sm:text-4xl text-white tracking-tighter hover:opacity-90 transition-opacity cursor-pointer text-left mb-3 block"
            >
              Kinetic Ledger
            </button>
            <p className="text-xs sm:text-sm text-[#c8c6c5] leading-relaxed">
              Defining the speed of information for the global professional. Editorial rigor, digital velocity.
            </p>
          </div>

          {/* Navigation Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 w-full md:w-auto">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#ffdad5]">
                Publishing
              </span>
              <button
                onClick={onGoHome}
                className="text-xs sm:text-sm text-[#c8c6c5] hover:text-[#ffdad5] transition-colors text-left cursor-pointer"
              >
                About Us
              </button>
              <button
                onClick={() => onSelectCategory("Tech")}
                className="text-xs sm:text-sm text-[#c8c6c5] hover:text-[#ffdad5] transition-colors text-left cursor-pointer"
              >
                Tech Reports
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#ffdad5]">
                Legal
              </span>
              <a
                href="#privacy"
                onClick={(e) => e.preventDefault()}
                className="text-xs sm:text-sm text-[#c8c6c5] hover:text-[#ffdad5] transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                onClick={(e) => e.preventDefault()}
                className="text-xs sm:text-sm text-[#c8c6c5] hover:text-[#ffdad5] transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#advertising"
                onClick={(e) => e.preventDefault()}
                className="text-xs sm:text-sm text-[#c8c6c5] hover:text-[#ffdad5] transition-colors"
              >
                Advertising
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#ffdad5]">
                Connect
              </span>
              <a
                href="#contact"
                onClick={(e) => e.preventDefault()}
                className="text-xs sm:text-sm text-[#c8c6c5] hover:text-[#ffdad5] transition-colors"
              >
                Contact
              </a>
              <div className="flex gap-3 mt-1">
                <button
                  title="Global Network"
                  className="w-8 h-8 rounded-full border border-[#5f5e5e] flex items-center justify-center text-[#e2e2e2] hover:bg-[#bc000b] hover:border-[#bc000b] transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">public</span>
                </button>
                <button
                  title="RSS Feed"
                  className="w-8 h-8 rounded-full border border-[#5f5e5e] flex items-center justify-center text-[#e2e2e2] hover:bg-[#bc000b] hover:border-[#bc000b] transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">rss_feed</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#c8c6c5]/70">
          <p>© 2024 Kinetic Ledger. All rights reserved. Intellectual property of K.L. Media Group.</p>
          <span className="italic">Real-time global insights</span>
        </div>
      </div>
    </footer>
  );
};

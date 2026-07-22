import React from "react";
import { TickerNews } from "../types";

interface BreakingTickerProps {
  tickerItems: TickerNews[];
  onArticleClick: (articleId: string) => void;
  mode?: "ticker" | "live-bar";
  liveText?: string;
  updatedTimeAgo?: string;
}

export const BreakingTicker: React.FC<BreakingTickerProps> = ({
  tickerItems,
  onArticleClick,
  mode = "ticker",
  liveText = "Market Resilience: Global indices stabilizing after Kinetic Protocol deployment.",
  updatedTimeAgo = "4 minutes ago"
}) => {
  if (mode === "live-bar") {
    return (
      <div 
        onClick={() => onArticleClick("kinetic-protocol-redefining-integrity")}
        className="bg-[#1a1c1c] text-white px-4 sm:px-6 py-3 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 border-l-4 border-[#bc000b] shadow-xs cursor-pointer hover:bg-[#252828] transition-all group"
      >
        <div className="flex items-center gap-3">
          <span className="bg-[#bc000b] text-white text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-xs animate-pulse">
            Live Report
          </span>
          <p className="text-xs sm:text-sm font-semibold tracking-wide group-hover:text-[#ffb4aa] transition-colors">
            {liveText}
          </p>
        </div>
        <div className="flex items-center gap-2 text-[#c8c6c5] text-xs font-medium self-end sm:self-auto">
          <span className="text-[#ffdad5] font-bold text-[11px] hover:underline mr-1 hidden sm:inline">Read Full Story →</span>
          <span>Last updated: {updatedTimeAgo}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1c1c] text-white px-4 sm:px-6 py-2.5 rounded-lg mb-6 flex items-center overflow-hidden border-l-4 border-[#bc000b]">
      <div className="flex items-center gap-2 shrink-0 pr-4 border-r border-[#474646]">
        <span className="bg-[#bc000b] text-white text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-xs">
          BREAKING
        </span>
      </div>

      <div className="overflow-hidden whitespace-nowrap w-full pl-4 relative">
        <div className="inline-flex items-center gap-8 animate-ticker">
          {tickerItems.concat(tickerItems).map((item, idx) => (
            <button
              key={`${item.id}-${idx}`}
              onClick={() => item.relatedArticleId && onArticleClick(item.relatedArticleId)}
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#e2e2e2] hover:text-[#ffb4aa] transition-colors cursor-pointer text-left"
            >
              <span className="text-[#bc000b] font-bold">•</span>
              <span className="font-medium">{item.text}</span>
              <span className="text-[11px] text-[#c8c6c5]">({item.timeAgo})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

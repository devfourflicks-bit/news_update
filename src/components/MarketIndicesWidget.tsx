import React, { useState } from "react";
import { MarketIndexItem } from "../types";
import { RefreshCw, TrendingUp, TrendingDown, Activity } from "lucide-react";

interface MarketIndicesWidgetProps {
  indices: MarketIndexItem[];
  onRefresh?: () => void;
  isRefreshing?: boolean;
  onSelectArticle?: (articleId: string) => void;
}

export const MarketIndicesWidget: React.FC<MarketIndicesWidgetProps> = ({
  indices,
  onRefresh,
  isRefreshing = false,
  onSelectArticle
}) => {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);

  const activeIndex = indices.find(i => i.symbol === selectedSymbol);

  return (
    <section className="bg-white rounded-[16px] p-6 shadow-md border border-[#e2e2e2]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#bc000b]" />
          <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-[#5f5e5e]">
            MARKET KINETIC
          </h3>
        </div>
        {onRefresh && (
          <button
            onClick={onRefresh}
            title="Refresh Live Rates"
            className="text-[#5f5e5e] hover:text-[#bc000b] p-1 rounded-full transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-[#bc000b]" : ""}`} />
          </button>
        )}
      </div>

      <div className="space-y-4">
        {indices.map((item) => (
          <div
            key={item.symbol}
            onClick={() => setSelectedSymbol(item.symbol)}
            className="flex justify-between items-center border-b border-[#eeeeee] pb-3 last:border-0 last:pb-0 group cursor-pointer hover:bg-[#f9f9f9] p-1.5 rounded-lg transition-colors"
          >
            <div>
              <span className="font-sans text-xs sm:text-sm font-semibold text-[#1a1c1c] block group-hover:text-[#bc000b] transition-colors">
                {item.symbol}
              </span>
              <span className="text-[10px] text-[#5f5e5e] font-mono">
                Vol: {item.volume}
              </span>
            </div>

            <div className="text-right">
              <span className="font-mono font-bold text-sm sm:text-base text-[#1a1c1c] block">
                {item.value}
              </span>
              <span
                className={`font-mono text-xs font-semibold flex items-center justify-end gap-0.5 ${
                  item.isPositive ? "text-emerald-700" : "text-[#ba1a1a]"
                }`}
              >
                {item.isPositive ? "+" : ""}
                {item.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal for Selected Symbol */}
      {activeIndex && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-[#e2e2e2]">
            <button
              onClick={() => setSelectedSymbol(null)}
              className="absolute top-4 right-4 text-[#5f5e5e] hover:text-[#1a1c1c] text-xl font-bold p-1 cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#bc000b] text-white text-[10px] font-bold px-2 py-0.5 rounded-xs uppercase">
                Index Detail
              </span>
              <h4 className="font-serif font-bold text-xl text-[#1a1c1c]">
                {activeIndex.symbol}
              </h4>
            </div>

            <div className="flex items-baseline gap-3 my-4">
              <span className="font-mono text-3xl font-bold text-[#1a1c1c]">
                {activeIndex.value}
              </span>
              <span
                className={`font-mono font-bold text-base ${
                  activeIndex.isPositive ? "text-emerald-700" : "text-[#ba1a1a]"
                }`}
              >
                {activeIndex.change}
              </span>
            </div>

            {/* Simulated Live Mini Chart Visualizer */}
            <div className="bg-[#f3f3f3] p-4 rounded-xl my-4 border border-[#e2e2e2]">
              <div className="flex justify-between text-xs text-[#5f5e5e] mb-2 font-mono">
                <span>24H High: {activeIndex.high}</span>
                <span>24H Low: {activeIndex.low}</span>
              </div>
              <div className="h-24 w-full flex items-end justify-between gap-1 pt-2 border-b border-[#c8c6c5]">
                {[40, 55, 45, 60, 75, 70, 85, 80, 95, 90, 100].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className={`w-full rounded-t-xs transition-all ${
                      activeIndex.isPositive ? "bg-emerald-600" : "bg-[#ba1a1a]"
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-[#5f5e5e] mt-2 font-mono">
                <span>00:00 UTC</span>
                <span>12:00 UTC</span>
                <span>Live</span>
              </div>
            </div>

            <p className="text-xs text-[#5f5e5e] leading-relaxed">
              Real-time feed provided by Kinetic Protocol Sub-Second Settlement Gateway.
            </p>

            {onSelectArticle && (
              <button
                onClick={() => {
                  setSelectedSymbol(null);
                  onSelectArticle("kinetic-pivot-central-banks");
                }}
                className="mt-4 w-full bg-[#bc000b] text-white py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-[#a00009] transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
              >
                <span>Read Full Market News Report</span> →
              </button>
            )}

            <button
              onClick={() => setSelectedSymbol(null)}
              className="mt-2 w-full bg-[#1a1c1c] text-white py-2 rounded-lg font-semibold text-xs hover:bg-[#333] transition-colors cursor-pointer"
            >
              Close Ledger View
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

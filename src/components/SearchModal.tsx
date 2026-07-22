import React, { useState } from "react";
import { Article } from "../types";
import { Search, X, ArrowRight } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (articleId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle
}) => {
  const [query, setQuery] = useState("");

  if (!isOpen) return null;

  const filtered = query.trim() === ""
    ? articles.slice(0, 4)
    : articles.filter((a) =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        a.category.toLowerCase().includes(query.toLowerCase()) ||
        a.author.name.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden border border-[#e2e2e2] animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#e2e2e2] flex items-center gap-3 bg-[#f9f9f9]">
          <Search className="w-5 h-5 text-[#bc000b] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Kinetic Ledger insights, topics, or authors..."
            autoFocus
            className="w-full bg-transparent border-none text-base sm:text-lg text-[#1a1c1c] placeholder:text-[#5f5e5e] focus:outline-none focus:ring-0 font-sans"
          />
          <button
            onClick={onClose}
            className="text-[#5f5e5e] hover:text-[#1a1c1c] p-1 rounded-full hover:bg-[#e2e2e2] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-3">
          <div className="text-[11px] font-bold text-[#5f5e5e] uppercase tracking-wider px-2">
            {query.trim() === "" ? "Recommended Stories" : `Search Results (${filtered.length})`}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-10 text-[#5f5e5e]">
              No reports found for "{query}". Try searching for "Ledger", "CRISPR", "Quantum", or "Central Banks".
            </div>
          ) : (
            filtered.map((article) => (
              <div
                key={article.id}
                onClick={() => {
                  onSelectArticle(article.id);
                  onClose();
                }}
                className="p-3 rounded-xl hover:bg-[#f3f3f3] transition-colors cursor-pointer flex gap-4 items-center border border-transparent hover:border-[#e2e2e2] group"
              >
                <div className="w-16 h-14 rounded-lg overflow-hidden shrink-0 bg-[#1a1c1c]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold text-[#bc000b] uppercase">
                      {article.category}
                    </span>
                    <span className="text-[11px] text-[#5f5e5e]">• {article.timeAgo}</span>
                  </div>
                  <h4 className="font-serif font-semibold text-sm sm:text-base text-[#1a1c1c] group-hover:text-[#bc000b] transition-colors line-clamp-1">
                    {article.title}
                  </h4>
                  <p className="text-xs text-[#5f5e5e] line-clamp-1">
                    By {article.author.name}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#c8c6c5] group-hover:text-[#bc000b] transition-colors shrink-0" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

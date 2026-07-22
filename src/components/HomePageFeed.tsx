import React, { useState } from "react";
import { Article, CategoryType, MarketIndexItem } from "../types";
import { MarketIndicesWidget } from "./MarketIndicesWidget";
import { Bookmark, TrendingUp, Sparkles, ArrowRight, Check } from "lucide-react";

interface HomePageFeedProps {
  articles: Article[];
  featuredArticle: Article;
  activeCategory: CategoryType;
  onSelectArticle: (articleId: string) => void;
  marketIndices: MarketIndexItem[];
  onRefreshMarket: () => void;
  isMarketRefreshing?: boolean;
}

export const HomePageFeed: React.FC<HomePageFeedProps> = ({
  articles,
  featuredArticle,
  activeCategory,
  onSelectArticle,
  marketIndices,
  onRefreshMarket,
  isMarketRefreshing
}) => {
  // Filter articles based on active category (For You & All show all news)
  const filteredArticles = (activeCategory === "All" || activeCategory === "For You" || !activeCategory)
    ? articles.filter(a => a.id !== featuredArticle.id)
    : articles.filter(a => a.category === activeCategory);

  // Trending stories
  const trendingArticles = articles.filter(a => a.trendingRank).sort((a, b) => (a.trendingRank || 99) - (b.trendingRank || 99));

  // Helper to get update count for an article
  const getArticleUpdates = (article: Article): number => {
    if (article.updatesCount) return article.updatesCount;
    if (article.timelineNodes && article.timelineNodes.length > 0) return article.timelineNodes.length;
    let hash = 0;
    for (let i = 0; i < article.id.length; i++) {
      hash = (hash << 5) - hash + article.id.charCodeAt(i);
    }
    return (Math.abs(hash) % 8) + 3;
  };

  return (
    <div className="space-y-6">
      {/* Top Header Section Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3.5 w-3.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#bc000b] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#bc000b]"></span>
          </span>
          <h2 className="text-[12px] font-bold uppercase tracking-widest text-[#1a1c1c]">
            {activeCategory === "For You" || activeCategory === "All" 
              ? "UPDATES" 
              : `${activeCategory.toUpperCase()} UPDATES`}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Main Content Column */}
        <div className="md:col-span-8 space-y-6">
          {/* Featured Special Report Card (when viewing All or Tech or For You) */}
          {(activeCategory === "All" || activeCategory === "Tech" || activeCategory === "For You") && (
            <article
              onClick={() => onSelectArticle(featuredArticle.id)}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-[#e2e2e2] group cursor-pointer"
            >
              <div className="relative aspect-16/9 overflow-hidden bg-[#1a1c1c]">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.imageAlt || featuredArticle.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                {/* Updates Circle Badge for Featured Card */}
                <div className="absolute top-4 right-4 bg-[#1a1c1c]/90 text-white backdrop-blur-md border border-[#bc000b]/80 rounded-full px-3 py-1.5 flex items-center gap-2 shadow-xl">
                  <span className="w-6 h-6 rounded-full bg-[#bc000b] text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-inner">
                    {getArticleUpdates(featuredArticle)}
                  </span>
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                    Updates
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="bg-[#bc000b] text-white text-xs font-bold px-3 py-1 mb-3 inline-block rounded-xs tracking-wider uppercase">
                    {featuredArticle.badge || "Special Report"}
                  </span>
                  <h1 className="font-serif font-bold text-xl sm:text-2xl lg:text-3xl leading-tight text-white drop-shadow-md group-hover:text-[#ffb4aa] transition-colors">
                    {featuredArticle.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-200 mt-2 line-clamp-2 font-sans opacity-90 hidden sm:block">
                    {featuredArticle.excerpt}
                  </p>
                </div>
              </div>
            </article>
          )}

          {/* Article Feed Cards */}
          <div className="space-y-6">
            {filteredArticles.map((article) => {
              const updatesCount = getArticleUpdates(article);
              return (
                <article
                  key={article.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md border border-[#e2e2e2] flex flex-col md:flex-row group hover:-translate-y-0.5 hover:shadow-xl transition-all"
                >
                  <div 
                    onClick={() => onSelectArticle(article.id)}
                    className="relative md:w-1/2 overflow-hidden h-52 md:h-auto bg-[#1a1c1c] cursor-pointer"
                  >
                    <img
                      src={article.image}
                      alt={article.imageAlt || article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Circle Updates Badge overlay on image */}
                    <div className="absolute top-3 right-3 bg-[#1a1c1c]/85 text-white backdrop-blur-xs border border-[#bc000b]/80 rounded-full pl-1.5 pr-2.5 py-1 flex items-center gap-1.5 shadow-md">
                      <span className="w-5 h-5 rounded-full bg-[#bc000b] text-white font-black text-[11px] flex items-center justify-center shrink-0">
                        {updatesCount}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-200">
                        Updates
                      </span>
                    </div>
                  </div>

                  <div className="md:w-1/2 p-5 sm:p-6 flex flex-col justify-between">
                    <div onClick={() => onSelectArticle(article.id)} className="cursor-pointer">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="w-2 h-2 bg-[#bc000b] rounded-full animate-pulse" />
                        <span className="text-[#bc000b] font-semibold text-xs tracking-widest uppercase">
                          {article.category}
                        </span>
                        <span className="text-[#5f5e5e] text-xs">
                          • {article.timeAgo}
                        </span>
                        
                        {/* Circle Badge in Meta bar */}
                        <div className="ml-auto flex items-center gap-1.5 bg-[#fce8e6] text-[#bc000b] px-2.5 py-0.5 rounded-full border border-[#f8c4c0]">
                          <span className="w-4 h-4 rounded-full bg-[#bc000b] text-white font-extrabold text-[10px] flex items-center justify-center">
                            {updatesCount}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider">
                            Updates
                          </span>
                        </div>
                      </div>

                      <h3 className="font-serif font-semibold text-lg sm:text-xl text-[#1a1c1c] mb-2 group-hover:text-[#bc000b] transition-colors leading-snug">
                        {article.title}
                      </h3>

                      <p className="text-[#5f5e5e] text-xs sm:text-sm line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#eeeeee]">
                      <span className="text-xs sm:text-sm font-bold text-[#1a1c1c]">
                        By {article.author.name}
                      </span>
                      <span className="text-xs font-semibold text-[#bc000b] hover:underline cursor-pointer" onClick={() => onSelectArticle(article.id)}>
                        Read Story →
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Right Sidebar Column */}
        <aside className="md:col-span-4 space-y-8">
          {/* Currently Trending Section aligned top with Special Report */}
          <section className="bg-white rounded-2xl p-6 shadow-md border border-[#e2e2e2]">
            <h2 className="font-sans font-bold text-xs uppercase tracking-widest text-[#1a1c1c] border-b border-[#e2e2e2] pb-3 mb-5 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#bc000b]" />
              CURRENTLY TRENDING
            </h2>

            <ul className="space-y-6">
              {trendingArticles.map((article, index) => {
                const updates = getArticleUpdates(article);
                return (
                  <li
                    key={article.id}
                    onClick={() => onSelectArticle(article.id)}
                    className="group cursor-pointer border-b border-[#eeeeee] pb-4 last:border-0 last:pb-0"
                  >
                    <span className="text-[#bc000b] font-serif font-bold text-4xl block leading-none opacity-20 group-hover:opacity-100 transition-opacity">
                      0{index + 1}
                    </span>
                    <h4 className="font-serif font-semibold text-base text-[#1a1c1c] -mt-3 group-hover:text-[#bc000b] transition-colors leading-snug">
                      {article.title}
                    </h4>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-[#5f5e5e] text-xs font-medium">
                        {article.readersCount || "8.5k readers"} • {article.category}
                      </p>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#f2f2f2] text-[#bc000b] text-[10px] font-bold border border-[#e2e2e2]">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#bc000b] text-white text-[9px] font-bold flex items-center justify-center">
                          {updates}
                        </span>
                        <span>UPDATES</span>
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Financial Indices Widget */}
          <MarketIndicesWidget
            indices={marketIndices}
            onRefresh={onRefreshMarket}
            isRefreshing={isMarketRefreshing}
            onSelectArticle={onSelectArticle}
          />
        </aside>
      </div>
    </div>
  );
};

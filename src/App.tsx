import React, { useState } from "react";
import { Article, CategoryType, MarketIndexItem } from "./types";
import { INITIAL_ARTICLES, INITIAL_MARKET_INDICES } from "./data/articles";
import { Header } from "./components/Header";
import { HomePageFeed } from "./components/HomePageFeed";
import { ArticleDetailView } from "./components/ArticleDetailView";
import { SearchModal } from "./components/SearchModal";
import { AccountModal } from "./components/AccountModal";
import { Footer } from "./components/Footer";

export default function App() {
  const [articles] = useState<Article[]>(INITIAL_ARTICLES);
  const [marketIndices, setMarketIndices] = useState<MarketIndexItem[]>(INITIAL_MARKET_INDICES);
  const [isMarketRefreshing, setIsMarketRefreshing] = useState(false);

  // Navigation state - converted default to For You
  const [activeCategory, setActiveCategory] = useState<CategoryType>("For You");
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  // Modal controls
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  // Fetch dynamic market data
  const handleRefreshMarket = async () => {
    setIsMarketRefreshing(true);
    try {
      const res = await fetch("/api/market-data");
      const data = await res.json();
      if (data.indices) {
        setMarketIndices(data.indices);
      }
    } catch {
      // simulate slight random shift
      setMarketIndices((prev) =>
        prev.map((idx) => ({
          ...idx,
          value: (parseFloat(idx.value.replace(/,/g, "")) + (Math.random() - 0.48) * 3).toFixed(2)
        }))
      );
    } finally {
      setTimeout(() => setIsMarketRefreshing(false), 600);
    }
  };

  const selectedArticle = articles.find((a) => a.id === selectedArticleId);
  const featuredArticle = articles.find((a) => a.id === "kinetic-protocol-redefining-integrity") || articles[0];

  // Related articles for detail view
  const relatedArticles = selectedArticle?.widerContextIds
    ? articles.filter((a) => selectedArticle.widerContextIds?.includes(a.id))
    : articles.filter((a) => a.id !== selectedArticleId).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] flex flex-col font-sans selection:bg-[#bc000b] selection:text-white">
      {/* Top Main Navigation Header */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSelectedArticleId(null);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onGoHome={() => {
          setSelectedArticleId(null);
          setActiveCategory("For You");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
      />

      {/* Main Page Container */}
      <main className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 py-6 flex-1">
        {!selectedArticle ? (
          /* Front Page Feed View (Screen 1) */
          <HomePageFeed
            articles={articles}
            featuredArticle={featuredArticle}
            activeCategory={activeCategory}
            onSelectArticle={(id) => {
              setSelectedArticleId(id);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            marketIndices={marketIndices}
            onRefreshMarket={handleRefreshMarket}
            isMarketRefreshing={isMarketRefreshing}
          />
        ) : (
          /* Article Detail View (Screen 2) */
          <ArticleDetailView
            article={selectedArticle}
            relatedArticles={relatedArticles}
            onSelectArticle={(id) => {
              setSelectedArticleId(id);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onGoBack={() => {
              setSelectedArticleId(null);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSelectedArticleId(null);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onGoHome={() => {
          setSelectedArticleId(null);
          setActiveCategory("For You");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {/* Slide-over & Dialog Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={articles}
        onSelectArticle={(id) => {
          setSelectedArticleId(id);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
      />
    </div>
  );
}

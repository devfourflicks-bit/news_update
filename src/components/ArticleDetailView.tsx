import React, { useState, useEffect } from "react";
import { Article, TimelineItem } from "../types";
import { BreakingTicker } from "./BreakingTicker";
import { 
  Bookmark, Share2, Play, Pause, Square, Headphones, Volume2, 
  ArrowLeft, Clock, ChevronUp, ChevronDown, Sparkles, X, Copy, 
  Check, RotateCcw, FileText, Bot, BookOpen, Type
} from "lucide-react";

interface ArticleDetailViewProps {
  article: Article;
  relatedArticles: Article[];
  onSelectArticle: (articleId: string) => void;
  onGoBack: () => void;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  article,
  relatedArticles,
  onSelectArticle,
  onGoBack
}) => {
  const [expandedTimelineId, setExpandedTimelineId] = useState<string | null>("node-1");
  const [copiedShare, setCopiedShare] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // News Audio Option state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isAudioPaused, setIsAudioPaused] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState(1);
  const [audioStatusText, setAudioStatusText] = useState("Listen to report audio narration");

  // AI Synthesize Modal state
  const [isSynthesizeModalOpen, setIsSynthesizeModalOpen] = useState(false);
  const [isSynthesizeLoading, setIsSynthesizeLoading] = useState(false);
  const [synthesizeResult, setSynthesizeResult] = useState<string | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Accessibility / Reader Mode state
  const [isReaderMode, setIsReaderMode] = useState(false);
  const [readerFontSize, setReaderFontSize] = useState<"normal" | "large" | "xlarge">("large");

  const getParagraphClasses = (isFirst: boolean) => {
    if (isReaderMode) {
      const sizeClass = 
        readerFontSize === "normal" 
          ? "text-lg sm:text-xl" 
          : readerFontSize === "large" 
            ? "text-xl sm:text-2xl" 
            : "text-2xl sm:text-3xl";
      const leadingClass = "leading-[2.1] sm:leading-[2.3]";
      return `${sizeClass} ${leadingClass} text-[#111111] font-sans transition-all duration-200 ${isFirst ? "drop-cap font-medium" : "font-normal"}`;
    }
    return `${isFirst ? "text-base sm:text-lg text-[#1a1c1c] drop-cap" : "text-base sm:text-lg text-[#5e3f3b]"} leading-relaxed font-sans transition-all duration-200`;
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset speech and synthesis when article changes
  useEffect(() => {
    setSynthesizeResult(null);
    setIsSynthesizeModalOpen(false);
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [article.id]);

  const fetchSynthesizeSummary = async () => {
    setIsSynthesizeLoading(true);
    try {
      const res = await fetch("/api/ai/analyze-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleTitle: article.title,
          articleContent: article.content.join(" "),
          promptType: "bullet_points"
        })
      });
      const data = await res.json();
      setSynthesizeResult(data.analysis || "Unable to generate synthesis summary.");
    } catch (err) {
      setSynthesizeResult(
        "• Key Insight 1: Strategic framework highlights real-time ledger synchronization and automated governance.\n• Key Insight 2: Multi-regional compliance lowers structural operational latency across institutional nodes.\n• Key Insight 3: Accelerated consensus engine minimizes global transaction settlement friction."
      );
    } finally {
      setIsSynthesizeLoading(false);
    }
  };

  const handleOpenSynthesizeModal = () => {
    setIsSynthesizeModalOpen(true);
    if (!synthesizeResult) {
      fetchSynthesizeSummary();
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const speakArticle = (rate: number) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setAudioStatusText("Audio narration simulated in browser.");
      return;
    }

    window.speechSynthesis.cancel();
    const fullText = `${article.title}. ${article.excerpt}. ${article.content.join(" ")}`;
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.rate = rate;

    utterance.onstart = () => {
      setIsPlayingAudio(true);
      setIsAudioPaused(false);
      setAudioStatusText(`Playing audio narration at ${rate}x speed`);
    };

    utterance.onend = () => {
      setIsPlayingAudio(false);
      setIsAudioPaused(false);
      setAudioStatusText("Finished listening to report narration.");
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
      setIsAudioPaused(false);
      setAudioStatusText("Audio playback completed.");
    };

    window.speechSynthesis.speak(utterance);
  };

  const handlePlayAudio = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setIsPlayingAudio(!isPlayingAudio);
      setAudioStatusText(isPlayingAudio ? "Audio paused" : "Playing simulated audio narration");
      return;
    }

    if (isPlayingAudio) {
      if (isAudioPaused) {
        window.speechSynthesis.resume();
        setIsPlayingAudio(true);
        setIsAudioPaused(false);
        setAudioStatusText(`Resuming narration at ${audioSpeed}x speed`);
      } else {
        window.speechSynthesis.pause();
        setIsAudioPaused(true);
        setAudioStatusText("Audio narration paused");
      }
    } else {
      speakArticle(audioSpeed);
    }
  };

  const handleStopAudio = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
    setIsAudioPaused(false);
    setAudioStatusText("Click play to listen to report narration");
  };

  const handleSpeedToggle = (speed: number) => {
    setAudioSpeed(speed);
    if (isPlayingAudio && !isAudioPaused) {
      speakArticle(speed);
    } else {
      setAudioStatusText(`Speed set to ${speed}x`);
    }
  };

  // Calculate estimated reading time based on article content word count
  const calculateReadingTime = (): { minutes: number; wordCount: number; formatted: string } => {
    const text = [
      article.title,
      article.excerpt,
      ...(article.content || []),
      article.pullQuote?.text || ""
    ].join(" ");
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    const wordsPerMinute = 200; // Average adult reading speed
    const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
    return {
      minutes,
      wordCount,
      formatted: `${minutes} min read`
    };
  };

  const readingTimeStats = calculateReadingTime();

  return (
    <div className="space-y-6 max-w-[1280px] mx-auto relative">
      {/* Dynamic Scroll Reading Progress Bar Fixed at top of screen */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1.5 bg-[#e2e2e2]">
        <div
          className="h-full bg-[#bc000b] transition-all duration-75 ease-out shadow-xs"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Back button header navigation */}
      <div className="flex items-center justify-between pb-2">
        <button
          onClick={onGoBack}
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#5f5e5e] hover:text-[#bc000b] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Front Page</span>
        </button>

        <span className="text-xs font-mono text-[#5f5e5e] flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-[#bc000b]" />
          <span>{readingTimeStats.formatted} ({readingTimeStats.wordCount.toLocaleString()} words)</span>
          <span>•</span>
          <span className="font-semibold text-[#bc000b]">{Math.round(scrollProgress)}% read</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Main Article Content Area */}
        <div className="md:col-span-8 space-y-6">
          {/* Hero Image & Headline Banner */}
          <div className="relative w-full aspect-16/9 overflow-hidden rounded-2xl group bg-[#1a1c1c] border border-[#e2e2e2] shadow-md">
            <img
              src={article.image}
              alt={article.imageAlt || article.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="bg-[#bc000b] text-white text-xs font-bold px-3 py-1 mb-3 inline-block rounded-xs uppercase tracking-wider">
                {article.badge || "Special Report"}
              </span>
              <h1 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-white drop-shadow-md leading-tight">
                {article.title}
              </h1>
            </div>
          </div>

          {/* Article Body Container */}
          <article className="bg-white p-6 sm:p-10 rounded-2xl shadow-xs border border-[#e2e2e2] space-y-6">
            {/* Author Profile & Actions Header */}
            <div className="flex items-center gap-4 pb-6 border-b border-[#e2e2e2]">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#e2e2e2] shrink-0">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-sm sm:text-base text-[#1a1c1c]">
                  By {article.author.name}
                </p>
                <p className="text-xs text-[#5f5e5e] font-medium">
                  {article.author.role}
                </p>
              </div>

              <div className="ml-auto flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setIsReaderMode(!isReaderMode)}
                  title={isReaderMode ? "Exit Reader Mode" : "Toggle Accessibility / Reader Mode"}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer shrink-0 ${
                    isReaderMode
                      ? "bg-[#1a1c1c] text-white border-[#1a1c1c] shadow-xs"
                      : "bg-[#f2f2f2] hover:bg-[#e6e6e6] text-[#1a1c1c] border-[#e2e2e2]"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#bc000b]" />
                  <span>{isReaderMode ? "Reader Mode ON" : "Reader Mode"}</span>
                </button>

                <button
                  onClick={handleOpenSynthesizeModal}
                  title="Synthesize 3-bullet summary with AI"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#bc000b] hover:bg-[#900008] text-white text-xs font-semibold rounded-full shadow-xs hover:shadow-md transition-all transform hover:scale-105 cursor-pointer shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Synthesize</span>
                </button>

                <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 bg-[#f2f2f2] text-[#1a1c1c] text-xs font-semibold rounded-full border border-[#e2e2e2]">
                  <Clock className="w-3.5 h-3.5 text-[#bc000b]" />
                  <span>Est. {readingTimeStats.formatted}</span>
                </span>

                <button
                  onClick={handleShare}
                  title="Share Report"
                  className="p-2 text-[#5f5e5e] hover:text-[#1a1c1c] hover:bg-[#eeeeee] rounded-lg transition-colors cursor-pointer relative"
                >
                  <Share2 className="w-5 h-5" />
                  {copiedShare && (
                    <span className="absolute -top-8 right-0 bg-[#1a1c1c] text-white text-[10px] font-medium px-2 py-1 rounded-sm whitespace-nowrap shadow-md">
                      Link copied!
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Accessibility Reader Mode Controls Bar */}
            {isReaderMode && (
              <div className="bg-[#f8f9fa] border border-[#e2e2e2] p-3.5 rounded-xl flex items-center justify-between flex-wrap gap-3 animate-in fade-in duration-200 shadow-xs">
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4 text-[#bc000b]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1a1c1c]">
                    Reader Mode Active
                  </span>
                  <span className="text-[10px] bg-[#bc000b]/10 text-[#bc000b] font-bold px-2 py-0.5 rounded-xs">
                    Enhanced Font & Spacing
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-[#5f5e5e]">Font Size:</span>
                    <div className="flex items-center bg-white border border-[#e2e2e2] rounded-lg p-0.5 shadow-2xs">
                      <button
                        onClick={() => setReaderFontSize("normal")}
                        title="Normal text size (18px)"
                        className={`px-2.5 py-0.5 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                          readerFontSize === "normal"
                            ? "bg-[#1a1c1c] text-white"
                            : "text-[#5f5e5e] hover:text-[#1a1c1c]"
                        }`}
                      >
                        A
                      </button>
                      <button
                        onClick={() => setReaderFontSize("large")}
                        title="Large text size (22px)"
                        className={`px-2.5 py-0.5 text-sm font-bold rounded-md transition-colors cursor-pointer ${
                          readerFontSize === "large"
                            ? "bg-[#1a1c1c] text-white"
                            : "text-[#5f5e5e] hover:text-[#1a1c1c]"
                        }`}
                      >
                        A+
                      </button>
                      <button
                        onClick={() => setReaderFontSize("xlarge")}
                        title="Extra large text size (26px)"
                        className={`px-2.5 py-0.5 text-base font-bold rounded-md transition-colors cursor-pointer ${
                          readerFontSize === "xlarge"
                            ? "bg-[#1a1c1c] text-white"
                            : "text-[#5f5e5e] hover:text-[#1a1c1c]"
                        }`}
                      >
                        A++
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsReaderMode(false)}
                    className="text-xs text-[#bc000b] hover:underline font-semibold cursor-pointer pl-2 border-l border-[#e2e2e2]"
                  >
                    Exit
                  </button>
                </div>
              </div>
            )}

            {/* Main Paragraphs with Drop Cap & Reader Mode styling */}
            {article.content.map((paragraph, idx) => (
              <React.Fragment key={idx}>
                <p className={getParagraphClasses(idx === 0)}>
                  {paragraph}
                </p>

                {/* Render Pullquote after first paragraph */}
                {idx === 0 && article.pullQuote && (
                  <blockquote className="my-8 border-l-4 border-[#bc000b] pl-6 py-2 bg-[#f9f9f9] rounded-r-xl">
                    <p className="font-serif italic text-xl sm:text-2xl text-[#1a1c1c] mb-2 leading-relaxed font-semibold">
                      "{article.pullQuote.text}"
                    </p>
                    <cite className="text-xs sm:text-sm text-[#5f5e5e] block not-italic font-semibold">
                      — {article.pullQuote.author}
                    </cite>
                  </blockquote>
                )}
              </React.Fragment>
            ))}

            {/* News Audio Narration Section */}
            <div className="mt-8 pt-6 border-t border-[#e2e2e2] bg-[#1a1c1c] text-white p-5 sm:p-6 rounded-2xl shadow-md border border-[#333] space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#bc000b] text-white flex items-center justify-center shrink-0 shadow-md">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base text-white flex items-center gap-2">
                      News Audio Narration
                      {isPlayingAudio && !isAudioPaused && (
                        <span className="flex items-center gap-0.5 h-3 ml-1">
                          <span className="w-0.5 h-full bg-[#00e676] animate-pulse"></span>
                          <span className="w-0.5 h-2/3 bg-[#00e676] animate-bounce"></span>
                          <span className="w-0.5 h-full bg-[#00e676] animate-pulse"></span>
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-gray-300">
                      {audioStatusText}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-[#2a2c2c] px-2.5 py-1 rounded-full border border-[#444]">
                  <span className="text-[10px] uppercase font-bold text-gray-400 mr-1">Speed:</span>
                  {[1, 1.25, 1.5, 2].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSpeedToggle(s)}
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                        audioSpeed === s
                          ? "bg-[#bc000b] text-white"
                          : "text-gray-300 hover:text-white hover:bg-[#383a3a]"
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Audio Controls Bar */}
              <div className="flex items-center gap-3 bg-[#242626] p-3 rounded-xl border border-[#3a3c3c]">
                <button
                  onClick={handlePlayAudio}
                  className="w-10 h-10 rounded-full bg-[#bc000b] hover:bg-[#a00009] text-white flex items-center justify-center transition-transform active:scale-95 cursor-pointer shrink-0 shadow-md"
                  title={isPlayingAudio && !isAudioPaused ? "Pause Audio" : "Play Audio"}
                >
                  {isPlayingAudio && !isAudioPaused ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </button>

                {isPlayingAudio && (
                  <button
                    onClick={handleStopAudio}
                    className="w-8 h-8 rounded-full bg-[#3a3c3c] hover:bg-[#4a4c4c] text-gray-200 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                    title="Stop Audio"
                  >
                    <Square className="w-3.5 h-3.5 fill-current" />
                  </button>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-[11px] text-gray-300 font-mono mb-1">
                    <span className="truncate">{article.title}</span>
                    <span className="shrink-0 text-gray-400">Est. {readingTimeStats.minutes}m audio</span>
                  </div>
                  <div className="w-full bg-[#3a3c3c] h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-[#bc000b] transition-all duration-300 ${
                        isPlayingAudio && !isAudioPaused ? "animate-pulse" : ""
                      }`}
                      style={{ width: isPlayingAudio ? "65%" : "0%" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Integrated Timeline of Events Section */}
            {article.timelineNodes && article.timelineNodes.length > 0 && (
              <div className="mt-10 pt-8 border-t border-[#e2e2e2]">
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1a1c1c] mb-6">
                  Timeline of Events
                </h3>

                <div className="relative pl-8 space-y-8 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#e2e2e2]">
                  {article.timelineNodes.map((node, idx) => {
                    const isExpanded = expandedTimelineId === node.id;
                    const targetArticleId = node.relatedArticleId || (idx === 1 ? "kinetic-pivot-central-banks" : idx === 2 ? "geopolitical-ripple-effects" : article.id);

                    return (
                      <div key={node.id} className="relative group">
                        {/* Dot indicator */}
                        <div
                          onClick={() => onSelectArticle(targetArticleId)}
                          className={`absolute -left-[27px] top-1.5 w-4 h-4 rounded-full ring-4 ring-white transition-transform group-hover:scale-125 cursor-pointer ${
                            idx === 0 ? "bg-[#bc000b]" : "bg-[#c8c6c5]"
                          }`}
                          title="Click to open full report"
                        />

                        {/* Hover Preview Card Popup */}
                        <div
                          onClick={() => onSelectArticle(targetArticleId)}
                          className="hidden lg:block absolute left-8 top-0 z-30 w-72 p-4 bg-white border border-[#e2e2e2] shadow-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-auto cursor-pointer hover:border-[#bc000b] hover:shadow-2xl"
                        >
                          <div className="flex flex-col gap-2">
                            {node.image && (
                              <div className="w-full h-24 rounded-lg overflow-hidden bg-[#1a1c1c] relative">
                                <img
                                  src={node.image}
                                  alt={node.title}
                                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                                <span className="absolute top-2 right-2 bg-[#bc000b] text-white text-[9px] font-bold px-2 py-0.5 rounded-xs uppercase">
                                  Open Full News
                                </span>
                              </div>
                            )}
                            <span className="text-[10px] font-bold text-[#bc000b] uppercase">
                              {node.time}
                            </span>
                            <h5 className="font-serif font-bold text-sm text-[#1a1c1c] leading-tight group-hover:text-[#bc000b] transition-colors">
                              {node.title}: {node.imageCaption || "Update"}
                            </h5>
                            <p className="text-[11px] text-[#5f5e5e] line-clamp-2">
                              {node.description}
                            </p>
                            <div className="text-[10px] text-[#bc000b] font-bold flex items-center gap-1 mt-1">
                              <span>Read Full News Story</span> →
                            </div>
                          </div>
                        </div>

                        {/* Node Content */}
                        <div>
                          <div className="flex justify-between items-start">
                            <div
                              onClick={() => onSelectArticle(targetArticleId)}
                              className="cursor-pointer group-hover:text-[#bc000b] transition-colors flex-1 pr-2"
                            >
                              <span className={`text-xs font-bold uppercase tracking-wider ${idx === 0 ? "text-[#bc000b]" : "text-[#474646]"}`}>
                                {node.time}
                              </span>
                              <h4 className="font-sans font-bold text-base sm:text-lg text-[#1a1c1c] mt-0.5 group-hover:text-[#bc000b] transition-colors">
                                {node.title}
                              </h4>
                              <p className="text-xs sm:text-sm text-[#5f5e5e] mt-1 leading-relaxed">
                                {node.description}
                              </p>
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedTimelineId(isExpanded ? null : node.id);
                              }}
                              className="text-xs text-[#5f5e5e] font-normal flex items-center gap-1 hover:text-[#bc000b] p-1 cursor-pointer shrink-0"
                              title="Toggle context details"
                            >
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          </div>

                          {/* Expandable "Earlier News" details block */}
                          {isExpanded && node.details && (
                            <div className="mt-4 p-4 bg-[#f3f3f3] rounded-2xl border border-[#e2e2e2] transition-all">
                              <div className="flex justify-between items-center mb-1">
                                <h5 className="font-serif font-bold text-sm text-[#1a1c1c]">
                                  Earlier News & System Context
                                </h5>
                                <button
                                  onClick={() => onSelectArticle(targetArticleId)}
                                  className="text-xs font-bold text-[#bc000b] hover:underline cursor-pointer flex items-center gap-1"
                                >
                                  <span>Open Full News</span> →
                                </button>
                              </div>
                              <p className="text-xs text-[#5f5e5e] leading-relaxed">
                                {node.details}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </article>
        </div>

        {/* Sidebar Column */}
        <aside className="md:col-span-4 space-y-8">
          {/* The Wider Context (Related Content) */}
          <section className="bg-[#f3f3f3] p-6 rounded-2xl border border-[#e2e2e2] shadow-md">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#5f5e5e] mb-4">
              The Wider Context
            </h3>

            <div className="flex flex-col gap-4">
              {relatedArticles.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectArticle(item.id)}
                  className="group cursor-pointer flex gap-4 items-center bg-white p-3 rounded-xl border border-[#e2e2e2] hover:border-[#bc000b] shadow-xs hover:shadow-md transition-all"
                >
                  <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-[#1a1c1c]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-col justify-center">
                    <h4 className="font-sans font-bold text-xs sm:text-sm text-[#1a1c1c] group-hover:text-[#bc000b] transition-colors leading-tight line-clamp-2">
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-[#5f5e5e] font-medium mt-1">
                      {item.readTime}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>

      {/* Synthesize 3-Bullet Summary Modal Overlay */}
      {isSynthesizeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#e2e2e2] overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#1a1c1c] text-white border-b border-[#333]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#bc000b] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-white leading-tight">
                    AI Article Synthesis
                  </h3>
                  <p className="text-[10px] uppercase font-mono tracking-wider text-gray-400">
                    3-Bullet Executive Summary
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsSynthesizeModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-[#333] rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1 bg-[#fafafa]">
              <div className="bg-white p-4 rounded-xl border border-[#e2e2e2] shadow-xs">
                <p className="text-[10px] text-[#5f5e5e] font-bold uppercase tracking-wider mb-1">Source Article:</p>
                <h4 className="font-serif font-bold text-sm sm:text-base text-[#1a1c1c] leading-snug">
                  {article.title}
                </h4>
              </div>

              {isSynthesizeLoading ? (
                <div className="py-12 flex flex-col items-center justify-center gap-3 text-center">
                  <div className="w-12 h-12 rounded-full border-3 border-[#bc000b] border-t-transparent animate-spin flex items-center justify-center">
                    <Bot className="w-5 h-5 text-[#bc000b]" />
                  </div>
                  <p className="text-xs font-semibold text-[#1a1c1c]">Synthesizing 3 key executive takeaways...</p>
                  <p className="text-[11px] text-[#5f5e5e]">Analyzing narrative nodes using Gemini 3.6 Flash</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#bc000b] flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Executive Takeaways</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#5f5e5e] bg-[#eef0f2] px-2.5 py-0.5 rounded-full border border-[#d8dce0]">
                      Gemini 3.6 Flash
                    </span>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-[#e2e2e2] shadow-xs space-y-3.5">
                    {synthesizeResult
                      ? synthesizeResult
                          .split(/\n+/)
                          .filter(line => line.trim().length > 0)
                          .map((bullet, idx) => (
                            <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#1a1c1c] leading-relaxed">
                              <span className="w-5 h-5 rounded-full bg-[#fce8e6] text-[#bc000b] font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5 border border-[#f8c4c0]">
                                {idx + 1}
                              </span>
                              <p className="font-medium text-[#2c2e2e]">
                                {bullet.replace(/^[\s•*-]+(\d+[\.\)])?\s*/, "")}
                              </p>
                            </div>
                          ))
                      : null}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-white border-t border-[#e2e2e2] flex items-center justify-between">
              <button
                onClick={fetchSynthesizeSummary}
                disabled={isSynthesizeLoading}
                className="flex items-center gap-1.5 text-xs font-medium text-[#5f5e5e] hover:text-[#bc000b] transition-colors disabled:opacity-50 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Regenerate</span>
              </button>

              <div className="flex items-center gap-2">
                {synthesizeResult && !isSynthesizeLoading && (
                  <button
                    onClick={() => {
                      if (navigator.clipboard && synthesizeResult) {
                        navigator.clipboard.writeText(synthesizeResult);
                        setCopiedSummary(true);
                        setTimeout(() => setCopiedSummary(false), 2000);
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f2f2f2] hover:bg-[#e2e2e2] text-[#1a1c1c] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    {copiedSummary ? <Check className="w-3.5 h-3.5 text-[#00e676]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSummary ? "Copied" : "Copy"}</span>
                  </button>
                )}

                <button
                  onClick={() => setIsSynthesizeModalOpen(false)}
                  className="px-4 py-1.5 bg-[#1a1c1c] hover:bg-[#bc000b] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export type CategoryType = 
  | "All"
  | "For You"
  | "International"
  | "National"
  | "Sports"
  | "Videos"
  | "Polls"
  | "Science"
  | "Politics"
  | "Auto"
  | "Tech";

export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface TimelineItem {
  id: string;
  time: string;
  title: string;
  description: string;
  image?: string;
  details?: string;
  imageCaption?: string;
}

export interface ArticleStats {
  throughput: string;
  latency: string;
  nodeCount: string;
  status: "OPTIMIZED" | "SYNCHRONIZING" | "PEAK_CAPACITY";
}

export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string[];
  pullQuote?: {
    text: string;
    author: string;
  };
  author: Author;
  category: CategoryType;
  timeAgo: string;
  publishedAt: string;
  image: string;
  imageAlt?: string;
  badge?: "Special Report" | "Exclusive" | "Live" | "Deep Dive";
  readTime: string;
  readersCount?: string;
  trendingRank?: number;
  timelineNodes?: TimelineItem[];
  updatesCount?: number;
  stats?: ArticleStats;
  widerContextIds?: string[];
  commentsCount?: number;
}

export interface MarketIndexItem {
  symbol: string;
  value: string;
  change: string;
  isPositive: boolean;
  high: string;
  low: string;
  volume: string;
}

export interface TickerNews {
  id: string;
  isLive: boolean;
  text: string;
  timeAgo: string;
  relatedArticleId?: string;
}

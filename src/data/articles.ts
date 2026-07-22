import { Article, MarketIndexItem, TickerNews } from "../types";

export const INITIAL_ARTICLES: Article[] = [
  {
    id: "kinetic-protocol-redefining-integrity",
    title: "The Kinetic Protocol: How Real-Time Ledgers are Redefining Economic Integrity",
    subtitle: "A silent revolution in global digital infrastructure eliminates latency in cross-border settlements.",
    excerpt: "In the heart of the digital infrastructure, a silent revolution has taken root. The Kinetic Ledger, once a theoretical framework for hyper-fluid capital exchange, has transitioned into its final production phase.",
    content: [
      "In the heart of the digital infrastructure, a silent revolution has taken root. The Kinetic Ledger, once a theoretical framework for hyper-fluid capital exchange, has transitioned into its final production phase. Architects of the system claim it solves the latency problem that has plagued decentralized finance for a decade, introducing a \"living state\" for every transaction that occurs globally.",
      "By maintaining an immutable, sub-second consensus model, sovereign liquidity pools can now execute automated cross-border settlements without intermediate clearinghouse bottlenecks. The system's underlying consensus engine operates at zero packet loss, establishing a fault-tolerant mesh across all major continental financial gateways.",
      "Critics have pointed to the immense energy requirements of maintaining such a high-fidelity record. However, Vane and his team argue that the protocol's inherent efficiency—derived from its \"Kinetic Resynchronization\" algorithms—actually reduces the total carbon footprint of the financial sector by eliminating redundant processing nodes used in traditional banking legacy systems."
    ],
    pullQuote: {
      text: "We aren't just building a faster database. We are engineering a nervous system for the global economy where every cent of value is accounted for in the same nanosecond it moves.",
      author: "Marcus Vane, Lead Architect of Kinetic Ledger"
    },
    author: {
      name: "Elias Thorne",
      role: "Chief Technology Correspondent",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0Ap9n-DNdq7MU0UUKnTTx2JoC5ToDidYxozu2QtQDJT1vF4O0n--xin4a-4AncXwKEMhss_UP4e2pSBgGX0aIlFCE_U5dOZPfsVXbpcKCZuivtpApIF3kpjnFUSHRYj3XaZCzGWybBDDD9gb5jQMamVw7akMFFuSymgysf6UkO-vdRaUIThCfk3fxbCaTEdgmWWDzFS8VNygfoCIABq8XVKwYKUrr5pCrt8nl8emb5nocjf__vYvZMiHShRcHBi5L4Rj3hvGLe-mv"
    },
    category: "Tech",
    timeAgo: "4m ago",
    publishedAt: "2026-07-22T03:20:00Z",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNY8RodHC8SX8VAMniOi-xq527ohfvtkB9MAWPtTWVHqBDfndhuD5diGdfGET3Kt6bAIQHl2w5KuAb0NRJB7B6a2hug8yvDm1LVKvQOyX8Lv_gVNpnaGy_LX9clYri_RqdvSimM-XQh1WOdJMTr6DkFHbUyBP_XW_PyilEqpCWalsSYGCACUtRehQbxQ094us3XHHSCoHfqzhOXBct18Y8cHfJe5WNs0yxi3sIHQ8Sr-gZiq41iHGmHCkwlAYtwu4IabrnhLaykRt0",
    imageAlt: "A futuristic, high-contrast digital architectural rendering of a central ledger processing hub with cold blue light and glowing data channels.",
    badge: "Special Report",
    readTime: "6 min read",
    timelineNodes: [
      {
        id: "node-1",
        time: "09:12 AM GMT",
        title: "Protocol Initialization",
        description: "The Kinetic Core successfully established handshake protocols with the seven major continental liquidity pools.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNY8RodHC8SX8VAMniOi-xq527ohfvtkB9MAWPtTWVHqBDfndhuD5diGdfGET3Kt6bAIQHl2w5KuAb0NRJB7B6a2hug8yvDm1LVKvQOyX8Lv_gVNpnaGy_LX9clYri_RqdvSimM-XQh1WOdJMTr6DkFHbUyBP_XW_PyilEqpCWalsSYGCACUtRehQbxQ094us3XHHSCoHfqzhOXBct18Y8cHfJe5WNs0yxi3sIHQ8Sr-gZiq41iHGmHCkwlAYtwu4IabrnhLaykRt0",
        imageCaption: "Core Handshake Complete",
        details: "Pre-initialization diagnostics confirmed 100% node readiness across all continental sectors at 08:55 AM GMT with 14ms average packet roundtrip."
      },
      {
        id: "node-2",
        time: "08:45 AM GMT",
        title: "Regulatory Clearance",
        description: "European Financial Oversight Authority grants temporary operation license for the Kinetic pilot program.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmHCx4raZv8OmGrpDYRFUGVzziuQLQiT4QjtnZ17QWUHeKep4WVL3HA-XJgPMnk0WlBnle5ddoQGc0x06rHZlPdchKS_mVv32uw6vUkWz1tlJ5WbAtxT7OO-H6a4Ppy63YV9lnfuiDS3gPwx3oxtbms_qXlVoiliqg44tvnyuedKJC3exy51AoADBPdjLFVUlglfiavF9KsURXTmv8aoJ1zSe0D2DRrfjr5FRofuj9UONeJVzWTRsubdU3kLmNOE1LPAj6zMa3owx6",
        imageCaption: "EU Operational License Granted",
        details: "The final compliance audit was submitted at 06:00 AM following a rigorous 48-hour stress test period supervised by international financial monitors."
      },
      {
        id: "node-3",
        time: "07:20 AM GMT",
        title: "Soft-Launch Beta",
        description: "Selected institutional partners in Singapore begin processing high-value cross-border settlements.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfA3yInFh0haDil3Ndoa_Hwa23BgZqSESdH9KRJiQivKdLOsC_2V2qHJFeogIffFzViGW6bPrgHUA9ct25DyKKY0vbXVQ7ab5L4ISthkatw0eQoIEIm1EgbHkorIdTqt5MT1YpRgDq4awE-qwanewkce_PF8k0pnY-FLfChy3g1HENgqSje6Z6A_ycx_OFabod3Hf1nupWhJBso_p1uIpL5xc6Qo59ztob9C7eW6LIUvb0YZGTzTSS9dnisMsEEkDkHhyEKuUAo0C4",
        imageCaption: "Singapore Live Settlement Hub",
        details: "Initial sandbox testing with Singaporean banking syndicates concluded with zero dropped ledger frames and a total settled volume exceeding $4.2B."
      }
    ],
    stats: {
      throughput: "2.4M TPS",
      latency: "14ms",
      nodeCount: "18,504",
      status: "OPTIMIZED"
    },
    widerContextIds: ["hardware-of-speed-silicon", "geopolitical-ripple-effects"]
  },
  {
    id: "kinetic-pivot-central-banks",
    title: "The Kinetic Pivot: Why Central Banks are Embracing Decentralized Ledgers",
    subtitle: "Global monetary authorities shift from containment to active protocol integration.",
    excerpt: "In a stunning reversal of decade-long policies, global financial regulators are beginning to integrate automated liquidity protocols into traditional sovereign debt markets...",
    content: [
      "In a stunning reversal of decade-long policies, global financial regulators are beginning to integrate automated liquidity protocols into traditional sovereign debt markets.",
      "Faced with rising debt issuance friction and liquidity fragmentation, central banks in Tokyo, Zurich, and London have initiated co-pilot nodes with Kinetic Ledger framework. This pivot acknowledges that real-time visibility prevents systemic contagion during extreme volatility.",
      "The transition allows sovereign treasuries to conduct automated open-market operations with nano-second settling speed, fundamentally altering monetary policy execution."
    ],
    author: {
      name: "Marcus Sterling",
      role: "Senior Economics Editor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
    },
    category: "International",
    timeAgo: "4m ago",
    publishedAt: "2026-07-22T03:23:00Z",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_T1WhyWvZatGvf3W9akmHVk4uUbzM_80HrHxR1cw1tlIpyPUHOj4OBfVIZaK2zG6M1en_sGLJUrL8Gcs_KCIowwtYP3XGDn5llsXin-AUb0FnHJ0_QKzsUoUli1V69-5Cj4t1PjJVPgbccgxxodu5kcbkqnnIxK6CsmmbpCZ-GR4W88xH8hfjRCgjWJGC9bSrx9Ys3msre1spw-WJW30ufzhEd5mvyR1MAyUcsFrHMqkYQnkHxMndt9Lkeqv4CC9sDIxsIam0thB6",
    imageAlt: "Futuristic financial trading floor with curved glass screens displaying data visualizations and market trendlines.",
    readTime: "5 min read",
    commentsCount: 24
  },
  {
    id: "urban-evolution-kinetic-infrastructure",
    title: "Urban Evolution: How Kinetic Infrastructure Redefines City Living",
    subtitle: "The Neo-Seoul smart grid integrates transit, energy, and urban ledger systems.",
    excerpt: "The launch of the Neo-Seoul district marks the first time a major metropolis has fully automated its energy and transit grid through a predictive Kinetic Ledger system.",
    content: [
      "The launch of the Neo-Seoul district marks the first time a major metropolis has fully automated its energy and transit grid through a predictive Kinetic Ledger system.",
      "Every solar facade, automated transit pod, and subterranean rainwater channel broadcasts state changes to the municipal ledger. Real-time dynamic pricing balances urban power consumption while eliminating transit bottlenecks during peak commute hours.",
      "City planners worldwide are watching closely as Neo-Seoul reports a 38% reduction in grid distribution loss within its first 90 days of full ledger integration."
    ],
    author: {
      name: "Elena Vane",
      role: "Global Urban Affairs Specialist",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
    },
    category: "National",
    timeAgo: "1h ago",
    publishedAt: "2026-07-22T02:27:00Z",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8Kf4iJb8UW9t3vSxirp4L6n40dtH9WWl2BWbgDvBE5pCLRwHoNEMSRMJQr3s9sNyQifjv0qbQoCqkE3RVZj9bMgo3OofxnRGITc0rzB8blIowDPc7EbwlI3P-1-KXSoMTPsnV2KhdaXZjTK43vRdOL6ftAiXp-If_Ou8sgkgo_Sm_VB0U1CN7-dVGYsvTK1a5hnnOsVm0RdbpRrYc13D9IAUNXCWtQMG0dIHhQhMeRcgA_LvsBs-xl1YslBUQtYwhPwKzBOZpZs-2",
    imageAlt: "Expansive aerial view of futuristic smart city during misty morning with clean white organic architecture.",
    readTime: "4 min read",
    commentsCount: 18
  },
  {
    id: "decoding-longevity-crispr-therapeutics",
    title: "Decoding Longevity: The Ethical Ledger of CRISPR Therapeutics",
    subtitle: "How decentralized genome data verification is enabling safe personalized gene therapies.",
    excerpt: "A deep dive into the recent medical breakthroughs that promise to extend human healthspan, and the massive data structures tracking their global impact.",
    content: [
      "A deep dive into the recent medical breakthroughs that promise to extend human healthspan, and the massive data structures tracking their global impact.",
      "By recording therapeutic vectors and patient cellular responses on an encrypted zero-knowledge ledger, bio-pharmaceutical researchers can verify longevity therapy safety across diverse populations without breaching genetic privacy.",
      "Clinical trials conducted across 14 international bio-hubs show an unprecedented 94.2% stability index in cellular telomere repair mechanisms."
    ],
    author: {
      name: "Dr. Julian Thorne",
      role: "Lead Science Editor",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200"
    },
    category: "Science",
    timeAgo: "3h ago",
    publishedAt: "2026-07-22T00:27:00Z",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdTzai9cMws58iycfL4AB6tPKVOiTedBkbreP81EdNThhCZeM1HCjo5f5Z03uExcI17yGu_22eX8nhMhTP4oUeNFNQ2N6k9c9f6uzQjrqWoqc8UZbWhdwhHo23FvwHpvqVjSRlKVWdukwWK5DPfz8DLsaA89b_8CMVODvX0uhJrZQkLWR2Q3C9xrugpgKHP0cXfvj_Qncw85k2qZYSuEKToc3aI3f5Vk1ZqCRjs9oB56zmeKcmGwOFy2BLrxssX51CIuYLwA_ue-23",
    imageAlt: "Minimalist close-up of a laboratory setting with a high-precision robotic arm holding a glowing red serum vial.",
    readTime: "7 min read",
    commentsCount: 31
  },
  {
    id: "quantum-supremacy-end-of-encryption",
    title: "Quantum Supremacy and the End of Encryption",
    subtitle: "Post-quantum cryptographic standards deployed across global financial backbones.",
    excerpt: "As quantum processors reach 10,000 stable qubits, legacy RSA encryption yields to lattice-based post-quantum algorithms.",
    content: [
      "As quantum processors reach 10,000 stable qubits, legacy RSA encryption yields to lattice-based post-quantum algorithms across global financial backbones.",
      "Kinetic Ledger's core consensus layer has successfully migrated 100% of its cryptographic keys to Kyber-1024 and Dilithium signatures, safeguarding $12 Trillion in daily transactions against future decryption threats."
    ],
    author: {
      name: "Dr. Aris Thorne",
      role: "Quantum Security Researcher",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
    },
    category: "Tech",
    timeAgo: "2h ago",
    publishedAt: "2026-07-22T01:15:00Z",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600",
    readTime: "4 min read",
    readersCount: "14.2k readers",
    trendingRank: 1
  },
  {
    id: "vertical-farming-cereal-markets",
    title: "Vertical Farming Yields Disrupt Cereal Markets",
    subtitle: "Precision indoor ag-tech triggers structural shift in global grain futures.",
    excerpt: "Hydro-kinetic vertical grain towers in Northern Europe achieve 12x traditional field density, upending century-old commodities pricing.",
    content: [
      "Hydro-kinetic vertical grain towers in Northern Europe achieve 12x traditional field density, upending century-old commodities pricing.",
      "Agricultural commodity brokers are adjusting futures pricing models as climate-controlled vertical grain yields achieve 99.8% output reliability regardless of seasonal weather extremes."
    ],
    author: {
      name: "Soren Lindqvist",
      role: "Agri-Tech Strategist",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
    },
    category: "International",
    timeAgo: "5h ago",
    publishedAt: "2026-07-21T22:00:00Z",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=600",
    readTime: "5 min read",
    readersCount: "9.8k readers",
    trendingRank: 2
  },
  {
    id: "arctic-trade-routes-silk-road",
    title: "Arctic Trade Routes: The New Northern Silk Road",
    subtitle: "Ice-free maritime corridors cut shipping latency between Rotterdam and Yokohama by 14 days.",
    excerpt: "Autonomous container vessels navigated by AI ledger routes open year-round transit through the Transpolar passage.",
    content: [
      "Autonomous container vessels navigated by AI ledger routes open year-round transit through the Transpolar passage.",
      "Global supply chains report record fuel efficiency savings, while port authorities in Tromsø and Murmansk expand automated deep-water container berths."
    ],
    author: {
      name: "Astrid Nygård",
      role: "Maritime Geopolitics Analyst",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
    },
    category: "National",
    timeAgo: "6h ago",
    publishedAt: "2026-07-21T21:00:00Z",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600",
    readTime: "6 min read",
    readersCount: "8.5k readers",
    trendingRank: 3
  },
  {
    id: "hardware-of-speed-silicon",
    title: "The Hardware of Speed: Silicon's New Frontier",
    subtitle: "Photonic chipsets break the sub-nanosecond processing barrier in core financial routers.",
    excerpt: "How optical computing architectures are replacing copper interconnects to drive ultra-low latency transaction processing.",
    content: [
      "Photonic chipsets utilizing silicon nitride waveguides have demonstrated sub-nanosecond processing cycles in commercial trial runs.",
      "By manipulating light instead of electric currents, photonic financial routers generate 90% less heat while increasing bandwidth density by two orders of magnitude."
    ],
    author: {
      name: "Kenji Sato",
      role: "Semiconductor Editor",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
    },
    category: "Tech",
    timeAgo: "8 min read",
    publishedAt: "2026-07-22T02:00:00Z",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfA3yInFh0haDil3Ndoa_Hwa23BgZqSESdH9KRJiQivKdLOsC_2V2qHJFeogIffFzViGW6bPrgHUA9ct25DyKKY0vbXVQ7ab5L4ISthkatw0eQoIEIm1EgbHkorIdTqt5MT1YpRgDq4awE-qwanewkce_PF8k0pnY-FLfChy3g1HENgqSje6Z6A_ycx_OFabod3Hf1nupWhJBso_p1uIpL5xc6Qo59ztob9C7eW6LIUvb0YZGTzTSS9dnisMsEEkDkHhyEKuUAo0C4",
    readTime: "8 min read"
  },
  {
    id: "geopolitical-ripple-effects",
    title: "Geopolitical Ripple Effects of Instant Settlements",
    subtitle: "How real-time liquidity streams reduce reliance on legacy correspondent banking networks.",
    excerpt: "Nation states leverage frictionless ledger settlement channels to mitigate unilateral currency freezes and trade friction.",
    content: [
      "Nation states leverage frictionless ledger settlement channels to mitigate unilateral currency freezes and trade friction.",
      "International monetary economists observe a rapid decentralization of reserve asset management as bilateral trade protocols execute instantly across borderless ledger networks."
    ],
    author: {
      name: "Claire Dupont",
      role: "International Finance Policy Fellow",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200"
    },
    category: "Politics",
    timeAgo: "12 min read",
    publishedAt: "2026-07-22T01:30:00Z",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmHCx4raZv8OmGrpDYRFUGVzziuQLQiT4QjtnZ17QWUHeKep4WVL3HA-XJgPMnk0WlBnle5ddoQGc0x06rHZlPdchKS_mVv32uw6vUkWz1tlJ5WbAtxT7OO-H6a4Ppy63YV9lnfuiDS3gPwx3oxtbms_qXlVoiliqg44tvnyuedKJC3exy51AoADBPdjLFVUlglfiavF9KsURXTmv8aoJ1zSe0D2DRrfjr5FRofuj9UONeJVzWTRsubdU3kLmNOE1LPAj6zMa3owx6",
    readTime: "12 min read"
  },
  {
    id: "sports-autonomous-hyperleague-speed",
    title: "Global Autonomous Hyper-League Breaks World Telemetry Speed Records",
    subtitle: "AI-piloted aerodynamic vehicles clock 485 km/h on high-velocity circuit tracks.",
    excerpt: "Next-generation autonomous racing teams powered by sub-second telemetry ledgers deliver flawless overtaking maneuvers in Zurich GP.",
    content: [
      "Next-generation autonomous racing teams powered by sub-second telemetry ledgers deliver flawless overtaking maneuvers in Zurich GP.",
      "Engineers and sports strategists praise the real-time sensor synchronization that calculates vehicle trajectories down to sub-millimeter precision."
    ],
    author: {
      name: "Dante Alessi",
      role: "Sports Technology Analyst",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
    },
    category: "Sports",
    timeAgo: "15m ago",
    publishedAt: "2026-07-22T03:00:00Z",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600",
    readTime: "4 min read"
  },
  {
    id: "videos-inside-kinetic-core-documentary",
    title: "VIDEO: Inside Kinetic Core — The Architecture of Sub-Second Consensus",
    subtitle: "Exclusive video walkthrough inside the quantum-isolated server vaults in Geneva.",
    excerpt: "Take an immersive video tour inside the high-security cryogenic server chambers running the world's most resilient transaction ledger.",
    content: [
      "Take an immersive video tour inside the high-security cryogenic server chambers running the world's most resilient transaction ledger.",
      "Watch lead systems engineers demonstrate real-time node failover procedures under simulated orbital solar flares."
    ],
    author: {
      name: "Maya Lin",
      role: "Video Producer & Chief Anchor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
    },
    category: "Videos",
    timeAgo: "30m ago",
    publishedAt: "2026-07-22T02:45:00Z",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    readTime: "3 min watch"
  },
  {
    id: "polls-reader-sentiment-cross-border",
    title: "POLL: 78% of Institutional Readers Support Instant Cross-Border Clearing",
    subtitle: "Annual Kinetic Ledger Reader Survey reveals overwhelming confidence in automated liquidity.",
    excerpt: "Over 45,000 global financial officers voted in our annual policy poll, highlighting key priorities for 2027 fiscal planning.",
    content: [
      "Over 45,000 global financial officers voted in our annual policy poll, highlighting key priorities for 2027 fiscal planning.",
      "84% of respondents cited zero-latency settlements as the single most critical factor in mitigating foreign exchange volatility."
    ],
    author: {
      name: "Kinetic Research Institute",
      role: "Public Policy Division",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
    },
    category: "Polls",
    timeAgo: "45m ago",
    publishedAt: "2026-07-22T02:30:00Z",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    readTime: "2 min read"
  },
  {
    id: "auto-nextgen-solid-state-fleet",
    title: "Next-Gen Solid-State EVs Integrate Autonomous Micro-Grids",
    subtitle: "Vehicle-to-Grid (V2G) power sharing achieves 1,000 km range benchmarks.",
    excerpt: "Automotive manufacturers unveil solid-state battery vehicles capable of dynamic wireless power exchange at highway cruising speeds.",
    content: [
      "Automotive manufacturers unveil solid-state battery vehicles capable of dynamic wireless power exchange at highway cruising speeds.",
      "With sub-second energy ledger accounting, EV owners earn automated passive income by feeding excess stored power back into municipal grids."
    ],
    author: {
      name: "Henrik Vanger",
      role: "Automotive & Fleet Editor",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
    },
    category: "Auto",
    timeAgo: "1h ago",
    publishedAt: "2026-07-22T02:15:00Z",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600",
    readTime: "5 min read"
  },
  {
    id: "for-you-curated-executive-digest",
    title: "For You: Executive Briefing on AI Sovereignty & Capital Mobility",
    subtitle: "Your personalized intelligence briefing tailored to institutional technology and markets.",
    excerpt: "A curated synthesis of today's highest-impact developments across sovereign computing, energy grid balance, and quantum resilience.",
    content: [
      "A curated synthesis of today's highest-impact developments across sovereign computing, energy grid balance, and quantum resilience.",
      "Key takeaways include rising cross-border settlement volumes and the rapid acceleration of solid-state automotive grid networks."
    ],
    author: {
      name: "Kinetic AI Digest",
      role: "Personalized Intelligence Engine",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200"
    },
    category: "For You",
    timeAgo: "10m ago",
    publishedAt: "2026-07-22T03:10:00Z",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
    readTime: "3 min read"
  }
];

export const INITIAL_TICKER_ITEMS: TickerNews[] = [
  {
    id: "t1",
    isLive: true,
    text: "Global Markets React to Quantum Computing Breakthrough in Kinetic Ledger Lab",
    timeAgo: "2m ago",
    relatedArticleId: "quantum-supremacy-end-of-encryption"
  },
  {
    id: "t2",
    isLive: true,
    text: "New Carbon Capture Sovereign Wealth Fund Launched in Singapore Settlement Hub",
    timeAgo: "10m ago",
    relatedArticleId: "kinetic-protocol-redefining-integrity"
  },
  {
    id: "t3",
    isLive: false,
    text: "European Central Bank Completes First Automated Liquidity Resynchronization",
    timeAgo: "24m ago",
    relatedArticleId: "kinetic-pivot-central-banks"
  },
  {
    id: "t4",
    isLive: false,
    text: "Neo-Seoul Smart Grid Reports 38% Energy Conservation Milestone",
    timeAgo: "1h ago",
    relatedArticleId: "urban-evolution-kinetic-infrastructure"
  }
];

export const INITIAL_MARKET_INDICES: MarketIndexItem[] = [
  {
    symbol: "KINETIC 500",
    value: "4,821.12",
    change: "+1.24%",
    isPositive: true,
    high: "4,835.40",
    low: "4,802.10",
    volume: "14.2B"
  },
  {
    symbol: "NASDAQ LEDGER",
    value: "16,210.45",
    change: "+0.88%",
    isPositive: true,
    high: "16,280.00",
    low: "16,150.20",
    volume: "8.9B"
  },
  {
    symbol: "BTC/KLDG",
    value: "64,302.10",
    change: "-0.42%",
    isPositive: false,
    high: "65,120.00",
    low: "63,900.00",
    volume: "$32.1B"
  }
];

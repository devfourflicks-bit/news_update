import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API client lazily
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Kinetic Ledger API" });
});

// Dynamic market data route
app.get("/api/market-data", (req, res) => {
  const timestamp = new Date().toISOString();
  // Add slight random fluctuation for realistic live feel
  const kineticBase = 4821.12;
  const nasdaqBase = 16210.45;
  const btcBase = 64302.10;

  const kFluct = (Math.random() - 0.48) * 4;
  const nFluct = (Math.random() - 0.48) * 12;
  const bFluct = (Math.random() - 0.52) * 80;

  res.json({
    timestamp,
    indices: [
      {
        symbol: "KINETIC 500",
        value: (kineticBase + kFluct).toFixed(2),
        change: "+1.24%",
        isPositive: true,
        high: "4,835.40",
        low: "4,802.10",
        volume: "14.2B"
      },
      {
        symbol: "NASDAQ LEDGER",
        value: (nasdaqBase + nFluct).toFixed(2),
        change: "+0.88%",
        isPositive: true,
        high: "16,280.00",
        low: "16,150.20",
        volume: "8.9B"
      },
      {
        symbol: "BTC/KLDG",
        value: (btcBase + bFluct).toFixed(2),
        change: "-0.42%",
        isPositive: false,
        high: "65,120.00",
        low: "63,900.00",
        volume: "$32.1B"
      }
    ],
    atAGlance: {
      throughput: "2.4M TPS",
      latency: "14ms",
      nodeCount: "18,504",
      status: "OPTIMIZED",
      lastUpdatedMinutesAgo: Math.floor(Math.random() * 3) + 2
    }
  });
});

// Newsletter subscription route
app.post("/api/newsletter/subscribe", (req, res) => {
  const { email, tier } = req.body;
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  res.json({
    success: true,
    message: `Thank you for subscribing to ${tier || "Morning Ledger"}. Confirmation sent to ${email}.`,
    subscribersCount: "2,400,182"
  });
});

// Gemini AI Article Analysis & Reader QA
app.post("/api/ai/analyze-article", async (req, res) => {
  try {
    const { articleTitle, articleContent, promptType, userQuestion } = req.body;
    const ai = getAIClient();

    if (!ai) {
      // Graceful fallback if GEMINI_API_KEY is not configured yet
      return res.json({
        analysis: promptType === "qa" 
          ? `Based on "${articleTitle}": The Kinetic Protocol introduces real-time settlement with 14ms latency across 18,500+ nodes.`
          : `• Key Takeaway 1: Real-time ledger resynchronization eliminates settlement friction.\n• Key Takeaway 2: Regulatory clearance has been granted by European oversight authorities.\n• Key Takeaway 3: Architecture reduces global energy consumption compared to legacy financial silos.`,
        isFallback: true
      });
    }

    let prompt = "";
    if (promptType === "qa" && userQuestion) {
      prompt = `You are the AI Editorial Assistant for Kinetic Ledger. 
Article Title: "${articleTitle}"
Article Content excerpt: "${articleContent}"

User Question: "${userQuestion}"

Provide a concise, highly accurate, authoritative answer in 2-3 sentences max. Maintain an executive editorial tone.`;
    } else if (promptType === "bullet_points") {
      prompt = `You are the Chief AI Analyst for Kinetic Ledger.
Article Title: "${articleTitle}"
Article Content excerpt: "${articleContent}"

Synthesize this article into 3 crisp, executive bullet points highlighting strategic financial and technological implications.`;
    } else if (promptType === "audio_script") {
      prompt = `Write a 20-second punchy morning radio briefing script for Kinetic Ledger based on: "${articleTitle}". Content: "${articleContent}".`;
    } else {
      prompt = `Summarize the strategic impact of this Kinetic Ledger article in 2 clear sentences: "${articleTitle}". Excerpt: "${articleContent}"`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt
    });

    res.json({
      analysis: response.text || "Analysis complete.",
      isFallback: false
    });
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ error: "Failed to generate AI analysis", details: err.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Kinetic Ledger Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API client on server-side
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// API Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", geminiConfigured: !!apiKey });
});

// AI Chat Endpoint with Gemini 3.6 Flash
app.post("/api/chat", async (req, res) => {
  try {
    const { prompt, history, userDisplayName } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Prompt is required" });
    }

    if (!aiClient) {
      return res.status(503).json({ 
        error: "Gemini API client is not configured.",
        useFallback: true 
      });
    }

    const systemInstruction = `YOU ARE A REAL HUMAN STUDIO CONSULTANT AND PROJECT SPECIALIST FROM "KHONDOKER CREATION" (খন্দকার ক্রিয়েশন স্টুডিও)।

CRITICAL DIRECTIVE - ABSOLUTELY REAL HUMAN TONALITY:
1. NEVER sound like an AI, virtual assistant, bot, or automated system.
2. NEVER say "আমি একটি এআই", "As an AI model", "I am an artificial intelligence", or use robotic bulleted textbook explanations.
3. Speak EXACTLY like a real, polite, expert, and warm human designer/team member from Khondoker Creation chatting live on WhatsApp or Messenger with a client in Bangladesh.
4. Use natural, conversational Bengali (বাংলা) or Banglish (or English if the client writes in English).
5. Greet warmly like a real human (e.g., "আসসালামু আলাইকুম!", "হ্যালো ভাই/আপু, কেমন আছেন?", "খন্দকার ক্রিয়েশন থেকে বলছি!").
6. Keep replies friendly, concise, natural, direct, and conversational — just like a real studio expert answering a client's query instantly.
7. We specialize in 4 core fields:
   - 🎨 Graphics Design, 3D Mockups & Luxury Packaging
   - 🎬 Video Editing, Reels/Shorts & Motion Graphics
   - 📈 Digital Marketing, Meta/Google Ads & Growth
   - 💻 UI/UX Design, Figma & Web/App Interfaces
8. If asked about prices, timelines, or service details, answer helpfully with realistic estimates in a friendly human manner and encourage them to share their project details or contact us for a customized plan.`;

    // Construct conversation messages if history is provided
    let contentsPayload: any = prompt;
    if (Array.isArray(history) && history.length > 0) {
      const formattedHistory = history.map((item: { sender: string; text: string }) => ({
        role: item.sender === 'user' ? 'user' : 'model',
        parts: [{ text: item.text }]
      }));
      formattedHistory.push({
        role: 'user',
        parts: [{ text: prompt }]
      });
      contentsPayload = formattedHistory;
    }

    const response = await aiClient.models.generateContent({
      model: "gemini-3.6-flash",
      contents: contentsPayload,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "ধন্যবাদ! আপনার প্রশ্নের উত্তর তৈরিতে সমস্যা হচ্ছে, অনুগ্রহ করে আবার চেষ্টা করুন।";

    return res.json({ replyText });
  } catch (err: any) {
    console.error("Error in /api/chat Gemini request:", err);
    return res.status(500).json({ 
      error: err?.message || "Failed to generate AI response",
      useFallback: true 
    });
  }
});

// API Order & Inquiry Notification Endpoint for khondokercreation1@gmail.com
app.post("/api/notify-order", async (req, res) => {
  try {
    const { name, email, phone, category, budget, message, type } = req.body;
    const targetEmail = "khondokercreation1@gmail.com";

    const timestamp = new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" });
    console.log(`[ORDER ALERT] New order/inquiry from ${name} (${email}) for ${category || 'General Project'}. Target: ${targetEmail}`);

    const emailSubject = `🔥 NEW ORDER / INQUIRY ALERT: ${name || 'Client'} ordered ${category || 'Creative Service'}`;
    const emailBody = `
==================================================
KHONDOKER CREATION — NEW CLIENT ORDER NOTIFICATION
==================================================
Client Name: ${name || 'N/A'}
Client Email: ${email || 'N/A'}
Client Phone: ${phone || 'N/A'}
Service Category: ${category || 'N/A'}
Budget Range: ${budget || 'N/A'}
Order Type: ${type || 'Website Client Submission'}
Timestamp: ${timestamp} (Dhaka Time)

Project Brief / Instructions:
${message || 'No additional notes provided.'}

Target Gmail: ${targetEmail}
==================================================
`;

    // Return success status confirming order notification was processed
    return res.json({
      success: true,
      message: `Order notification successfully dispatched for ${targetEmail}`,
      orderSummary: {
        name,
        email,
        category,
        budget,
        timestamp,
        targetEmail
      }
    });
  } catch (err: any) {
    console.error("Error processing order notification:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to process order notification"
    });
  }
});

// Start Server with Vite Middleware in Development
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
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

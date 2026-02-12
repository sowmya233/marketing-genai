import { CampaignData, PitchData, Lead, Persona } from "../types";

const API_BASE = "http://localhost:5000/api";

const cleanJSON = (text: string) => {
  try {
    return JSON.parse(
      text.replace(/```json/g, "").replace(/```/g, "").trim()
    );
  } catch {
    return text;
  }
};


// ---------------- CAMPAIGN ----------------
export const generateCampaign = async (
  params: {
    product: string;
    audience: string;
    platform: string;
    budget: string;
    goal: string;
  }
): Promise<CampaignData> => {

  const response = await fetch(`${API_BASE}/campaign`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  const data = await response.json();
  return cleanJSON(data.result);
};

// ---------------- SALES PITCH ----------------
export const generateSalesPitch = async (
  params: {
    product: string;
    persona: string;
    industry: string;
    companySize: string;
    budget: string;
  }
): Promise<PitchData> => {

  const response = await fetch(`${API_BASE}/pitch`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  const data = await response.json();
  return cleanJSON(data.result);
};

// ---------------- LEAD SCORING ----------------
export const scoreLead = async (
  params: Partial<Lead>
): Promise<Partial<Lead>> => {

  const response = await fetch(`${API_BASE}/lead`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  const data = await response.json();
  return cleanJSON(data.result);
};

// ---------------- TRENDS ----------------
export const generateTrends = async (
  industry: string
): Promise<string> => {

  const response = await fetch(`${API_BASE}/trends`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ industry }),
  });

  const data = await response.json();
  return data.result;
};

// ---------------- PERSONA ----------------
// ---------------- PERSONA ----------------
export const generatePersona = async (
  product: string
): Promise<any> => {

  const response = await fetch(`${API_BASE}/persona`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product }),
  });

  const data = await response.json();

  const raw = data.result || "No persona generated.";

  return {
    name: "AI Persona",
    demographics: "Target market for " + product,
    behavior: raw,
    painPoints: raw,
    triggers: raw,
    platforms: ["LinkedIn", "Email", "Industry Communities"]
  };
};


// ---------------- IMAGE ANALYSIS ----------------
export const analyzeProductImage = async (
  base64Image: string,
  mimeType: string
): Promise<string> => {

  const response = await fetch(`${API_BASE}/image`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ base64Image, mimeType }),
  });

  const data = await response.json();
  return data.result;
};

// ---------------- CHATBOT ----------------
export const getChatbotResponse = async (
  history: any[],
  message: string
): Promise<string> => {

  const response = await fetch(`${API_BASE}/chatbot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  });

  const data = await response.json();
  return data.result;
};
// ---------------- IMAGE GENERATION ----------------
export const generateProductImage = async (
  prompt: string
): Promise<string> => {

  const response = await fetch(`${API_BASE}/generate-image`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const data = await response.json();
  return data.image; // backend should return base64 string
};

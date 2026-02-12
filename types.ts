
export interface User {
  id: string;
  username: string;
  email: string;
  company?: string;
}

export interface Lead {
  id: string;
  name: string;
  budget: number;
  need: string;
  urgency: string;
  authority: string;
  score: number;
  category: 'Hot' | 'Warm' | 'Lukewarm' | 'Cold';
  reasoning: string;
  probability: string;
  createdAt: string;
}

export interface CampaignData {
  objectives: string[];
  strategy: string;
  contentIdeas: string[];
  adCopies: string[];
  ctaSuggestions: string[];
  estimatedROI: string;
}

export interface PitchData {
  pitch30s: string;
  valueProp: string;
  differentiators: string[];
  painPoints: string[];
  cta: string;
  emailTemplate: string;
  linkedinTemplate: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Persona {
  name?: string;
  demographics?: string;
  behavior?: string;
  painPoints?: string;
  triggers?: string;
  platforms?: any;
}


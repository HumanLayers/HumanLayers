export interface LayerData {
  id: number;
  name: string;
  description: string;
  radius: number;
  color: string;
  details: string;
}

export interface OptimizedPrompt {
  title: string;
  content: string;
  explanation: string;
  tags: string[];
}

export const LAYERS: LayerData[] = [
  {
    id: 1,
    name: "Infrastructure",
    description: "Compute, Energy, GPUs",
    radius: 1.2,
    color: "#4b5563",
    details: "The physical bedrock. Massive GPU clusters, sustainable energy grids, and the raw compute power required to train and run foundation models."
  },
  {
    id: 2,
    name: "Foundation Models",
    description: "LLMs, Diffusion, Transformers",
    radius: 2.0,
    color: "#3b82f6",
    details: "The intelligence engines. GPT-4, Claude, Gemini, Llama. These are the raw statistical models trained on the internet's knowledge."
  },
  {
    id: 3,
    name: "Application Layer",
    description: "Tools, Agents, SaaS",
    radius: 2.8,
    color: "#10b981",
    details: "The software wrapper. Chatbots, coding assistants, and specialized tools that expose model capabilities to users."
  },
  {
    id: 4,
    name: "HumanLayers",
    description: "Alignment, Safety, Context, UX",
    radius: 3.8,
    color: "#a78bfa",
    details: "The critical bridge. We translate human intent into machine instructions. Safety rails, personality engines, memory systems, and prompt engineering."
  },
  {
    id: 5,
    name: "End Users",
    description: "Humans, Society, Enterprise",
    radius: 5.0,
    color: "#f472b6",
    details: "The destination. People using AI to create, solve, and build. Without the HumanLayer, the connection between user and model is friction."
  }
];

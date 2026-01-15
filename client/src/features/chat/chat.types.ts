import type { ChatRequest } from "@/types";

export const AGENTS = [
  { value: "Supervisor", label: "Supervisor" },
  { value: "Documents", label: "Documents" },
  { value: "Movies", label: "Movies" },
] as const;

export type Agent = (typeof AGENTS)[number]["value"];

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  agent?: Agent | "System";
  createdAt: number;
};

export type ChatSendInput = Omit<ChatRequest, "agent"> & { agent: Agent };

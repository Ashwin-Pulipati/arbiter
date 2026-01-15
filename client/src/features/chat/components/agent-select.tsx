"use client";

import { Bot, FileText, Film } from "lucide-react";
import type { Agent } from "../chat.types";
import { AGENTS } from "../chat.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ICONS: Record<Agent, React.ComponentType<{ className?: string }>> = {
  Supervisor: Bot,
  Documents: FileText,
  Movies: Film,
};

export function AgentSelect({
  value,
  onChange,
}: {
  value: Agent;
  onChange: (v: Agent) => void;
}) {
  return (
    <div className="w-[220px]">
      <Select value={value} onValueChange={(v) => onChange(v as Agent)}>
        <SelectTrigger className="focus-ring">
          <SelectValue placeholder="Select Agent" />
        </SelectTrigger>
        <SelectContent>
          {AGENTS.map((a) => {
            const Icon = ICONS[a.value];
            return (
              <SelectItem key={a.value} value={a.value}>
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span>{a.label}</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}

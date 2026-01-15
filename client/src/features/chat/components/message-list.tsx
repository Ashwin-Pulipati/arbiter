"use client";

import * as React from "react";
import { Bot, FileText, Film, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { ChatMessage } from "../chat.controller";

export type MessageListProps = {
  messages: ChatMessage[];
  loading: boolean;
  endRef: React.RefObject<HTMLDivElement | null>;
};

function AgentIcon({ agent }: { agent: ChatMessage["agent"] }) {
  if (agent === "Movies")
    return <Film className="h-3 w-3" aria-hidden="true" />;
  if (agent === "Documents")
    return <FileText className="h-3 w-3" aria-hidden="true" />;
  return <Bot className="h-3 w-3" aria-hidden="true" />;
}

export function MessageList({ messages, loading, endRef }: MessageListProps) {
  return (
    <div
      className="space-y-6"
      role="log"
      aria-live="polite"
      aria-relevant="additions text"
    >
      {messages.map((msg) => {
        const isUser = msg.role === "user";
        return (
          <div
            key={msg.id}
            className={cn(
              "flex w-full gap-3",
              isUser ? "flex-row-reverse" : "flex-row"
            )}
          >
            <Avatar
              className={cn(
                "h-8 w-8",
                isUser
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-primary/10 text-primary"
              )}
            >
              {isUser ? (
                <AvatarImage src="/user-avatar.png" alt="" />
              ) : (
                <AvatarImage src="/bot-avatar.png" alt="" />
              )}
              <AvatarFallback>
                {isUser ? (
                  <UserIcon className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Bot className="h-4 w-4" aria-hidden="true" />
                )}
              </AvatarFallback>
            </Avatar>

            <div
              className={cn(
                "flex flex-col max-w-[82%]",
                isUser ? "items-end" : "items-start"
              )}
            >
              <div
                className={cn(
                  "px-4 py-2 rounded-2xl text-sm shadow-sm whitespace-pre-wrap break-words",
                  isUser
                    ? "bg-primary text-primary-foreground rounded-tr-none"
                    : "bg-muted text-foreground rounded-tl-none"
                )}
              >
                {msg.content}
              </div>

              {!isUser && (
                <span className="text-[10px] text-muted-foreground mt-1 ml-1 inline-flex items-center gap-1">
                  <AgentIcon agent={msg.agent} />
                  <span>{msg.agent}</span>
                </span>
              )}
            </div>
          </div>
        );
      })}

      {loading && (
        <div className="flex w-full gap-3">
          <Avatar className="h-8 w-8 bg-primary/10 text-primary">
            <AvatarFallback>
              <Bot className="h-4 w-4" aria-hidden="true" />
            </AvatarFallback>
          </Avatar>

          <div className="bg-muted px-4 py-2 rounded-2xl rounded-tl-none flex items-center gap-1">
            <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" />
            <span className="sr-only">Assistant is typing</span>
          </div>
        </div>
      )}

      <div ref={endRef} />
    </div>
  );
}

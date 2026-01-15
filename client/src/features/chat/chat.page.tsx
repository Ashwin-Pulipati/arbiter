"use client";

import { Bot } from "lucide-react";
import { Shell } from "@/components/layout/shell";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUser } from "@/components/providers/user-provider";
import { useTitle } from "react-use";
import { AgentSelect } from "./components/agent-select";
import { MessageList } from "./components/message-list";
import { Composer } from "./components/composer";
import { useChatController } from "./chat.controller";

export default function ChatPage() {
  useTitle("Arbiter • Chat");

  const { user } = useUser();
  const ctrl = useChatController({ user });

  return (
    <Shell>
      <div className="flex flex-col h-full">
        <div className="flex items-start md:items-center justify-between gap-4 mb-4">
          <div className="space-y-1 min-w-0">
            <h2 className="text-3xl font-bold font-display text-gradient">
              Chat
            </h2>
            <p className="text-muted-foreground">
              Interact with specialized agents with thread persistence.
            </p>
          </div>

          <AgentSelect
            value={ctrl.state.agent}
            onChange={ctrl.actions.onSetAgent}
          />
        </div>

        <Card className="surface flex-1 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1 p-4">
            {ctrl.state.messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[420px] text-muted-foreground opacity-80">
                <div className="surface-hero w-full max-w-lg p-8 flex flex-col items-center text-center">
                  <Bot
                    className="h-14 w-14 mb-4 text-primary"
                    aria-hidden="true"
                  />
                  <p className="font-medium">
                    Select an agent and start chatting.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Your thread is saved in the URL hash for easy refresh and
                    sharing.
                  </p>
                </div>
              </div>
            ) : (
              <MessageList
                messages={ctrl.state.messages}
                loading={ctrl.state.loading}
                endRef={ctrl.refs.endRef}
              />
            )}
          </ScrollArea>

          <Composer
            value={ctrl.state.input}
            onChange={ctrl.actions.onSetInput}
            onSend={ctrl.actions.onSend}
            disabled={!ctrl.state.canSend}
            online={ctrl.state.online}
            loading={ctrl.state.loading}
            onResetThread={ctrl.actions.onResetThread}
          />
        </Card>
      </div>
    </Shell>
  );
}

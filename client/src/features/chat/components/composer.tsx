"use client";

import { Loader2, Send, WifiOff, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Composer({
  value,
  onChange,
  onSend,
  disabled,
  online,
  loading,
  onResetThread,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  disabled: boolean;
  online: boolean;
  loading: boolean;
  onResetThread: () => void;
}) {
  return (
    <div className="p-4 bg-background border-t space-y-3">
      {!online && (
        <div className="surface-hero px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <WifiOff className="h-4 w-4" aria-hidden="true" />
            <span>Offline. Reconnect to send messages.</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onResetThread}
            className="focus-ring"
          >
            <RotateCcw className="h-4 w-4 mr-2" aria-hidden="true" />
            Reset
          </Button>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSend();
        }}
        className="flex gap-2"
      >
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Message…"
          disabled={loading}
          className="flex-1 focus-ring"
          aria-label="Message input"
        />
        <Button
          type="submit"
          size="icon"
          disabled={disabled}
          className="focus-ring"
          aria-label="Send message"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="h-4 w-4" aria-hidden="true" />
          )}
        </Button>
      </form>
    </div>
  );
}

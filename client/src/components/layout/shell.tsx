"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { useMedia } from "react-use";
import { AppSidebar } from "./sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserSelector } from "../user-selector";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Footer from "../footer";

export function Shell({ children }: { readonly children: React.ReactNode }) {
  const pathname = usePathname();
  const isMdUp = useMedia("(min-width: 768px)", false);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b px-3 md:px-4 lg:h-15 bg-background/70 backdrop-blur supports-backdrop-filter:bg-background/50">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative flex aspect-square w-15 h-12 items-center justify-center text-primary-foreground">
                <Image src="/logo.png" alt="Arbiter Logo" className="h-full w-full p-0.5" width={64} height={ 64} />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-bold font-display text-gradient text-xl">
                  Arbiter
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  Agentic Workspace
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {isMdUp ? <UserSelector /> : <SidebarTrigger />}
          </div>
        </header>

        <div
          id="main"
          className={cn(
            "flex-1",
            pathname?.startsWith("/chat")
              ? "flex flex-col h-[calc(100svh-3.5rem)] p-3 md:p-6 overflow-hidden"
              : "space-y-6 p-4 pt-6 md:p-8 overflow-y-auto"
          )}
        >
          {children}
        </div>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}

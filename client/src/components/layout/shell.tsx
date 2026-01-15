"use client"

import { usePathname } from "next/navigation"
import { AppSidebar } from "./sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isChat = pathname?.startsWith("/chat")

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 lg:h-[60px]">
          <SidebarTrigger className="-ml-2" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          {/* Breadcrumbs or other header content could go here */}
        </header>
        <div 
          className={cn(
            "flex-1",
            isChat 
              ? "flex flex-col h-[calc(100svh-3.5rem)] p-4 md:p-6 overflow-hidden" 
              : "space-y-4 p-4 pt-6 md:p-8 overflow-y-auto"
          )}
        >
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Film,
  MoreHorizontal,
  Trash2,
  Plus,
  History,
} from "lucide-react";
import { useAsyncFn, useInterval, useMedia } from "react-use";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuAction,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggle from "@/components/theme-toggle";
import { UserSelector } from "../user-selector";
import { useUser } from "@/components/providers/user-provider";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

const routes = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "Chat", icon: MessageSquare, href: "/chat" },
  { label: "Documents", icon: FileText, href: "/documents" },
  { label: "Movies", icon: Film, href: "/movies" },
] as const;

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { user } = useUser();
  const isMdUp = useMedia("(min-width: 768px)", false);

  const [historyState, fetchHistory] = useAsyncFn(async () => {
    if (!user) return [];
    return api.chat.listThreads(user);
  }, [user]);

  const [deleteState, deleteThread] = useAsyncFn(
    async (id: number) => {
      await api.chat.deleteThread(id, user);
      await fetchHistory();
    },
    [user, fetchHistory],
  );

  React.useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  useInterval(
    () => {
      fetchHistory();
    },
    user ? 7000 : null,
  );

  const history = historyState.value || [];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {isMdUp ? (
          <SidebarTrigger className="ml-auto" />
        ) : (
          <UserSelector />
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu className="px-2">
            {routes.map((route) => {
              const active = pathname === route.href;
              const Icon = route.icon;
              return (
                <SidebarMenuItem key={route.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={active}
                    tooltip={route.label}
                    className={cn("rounded-2xl px-3", active && "shadow-sm")}
                  >
                    <Link href={route.href}>
                      <Icon
                        className={cn(
                          "h-4 w-4",
                          active ? "text-primary" : "text-muted-foreground",
                        )}
                      />
                      <span>{route.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        {history.length > 0 && (
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel className="flex items-center gap-2">
              <History className="h-3.5 w-3.5" aria-hidden="true" />
              Recents
            </SidebarGroupLabel>

            <SidebarGroupAction title="New Chat" asChild>
              <Link href="/chat" className="focus-ring rounded-md">
                <Plus />
                <span className="sr-only">New Chat</span>
              </Link>
            </SidebarGroupAction>

            <SidebarMenu className="px-2">
              {history.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className="rounded-2xl px-3"
                  >
                    <Link href={`/chat?thread=${item.uuid}`}>
                      <span className="truncate">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction
                        showOnHover
                        className="focus-ring rounded-md"
                      >
                        <MoreHorizontal />
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      className="w-52 rounded-xl"
                      side="bottom"
                      align="end"
                    >
                      <DropdownMenuItem
                        onClick={() => deleteThread(item.id)}
                        disabled={deleteState.loading}
                        className="gap-2"
                      >
                        <Trash2 className="text-muted-foreground" />
                        <span>Delete Thread</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        )}
        <SidebarGroup className="hidden group-data-[collapsible=icon]:block">
          <SidebarMenu className="px-2">
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Recents"
                className={cn("rounded-2xl px-3")}
              >
                <History className="h-4 w-4" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>Theme</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <ThemeToggle />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

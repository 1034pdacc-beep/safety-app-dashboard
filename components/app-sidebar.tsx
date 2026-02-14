"use client"

import {
  ShieldAlert,
  PlusCircle,
  List,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type View = "raise" | "all" | "my"

interface AppSidebarProps {
  currentView: View
  onViewChange: (view: View) => void
  collapsed: boolean
  onToggle: () => void
  ticketCounts: {
    all: number
    my: number
  }
}

const navItems = [
  {
    id: "raise" as View,
    label: "Raise Ticket",
    icon: PlusCircle,
  },
  {
    id: "all" as View,
    label: "All Tickets",
    icon: List,
  },
  {
    id: "my" as View,
    label: "My Tickets",
    icon: User,
  },
]

export function AppSidebar({
  currentView,
  onViewChange,
  collapsed,
  onToggle,
  ticketCounts,
}: AppSidebarProps) {
  return (
    <aside
      className={cn(
        "flex flex-col border-r transition-all duration-300 ease-in-out",
        "bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))]",
        "border-[hsl(var(--sidebar-border))]",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-[hsl(var(--sidebar-border))]">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--sidebar-primary))]">
              <ShieldAlert className="h-5 w-5 text-[hsl(var(--sidebar-primary-foreground))]" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-[hsl(var(--sidebar-accent-foreground))] tracking-wide">
                SafeTrack
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-[hsl(var(--sidebar-foreground))] opacity-60">
                Safety Dashboard
              </p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--sidebar-primary))]">
            <ShieldAlert className="h-5 w-5 text-[hsl(var(--sidebar-primary-foreground))]" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <div className="space-y-1">
          {!collapsed && (
            <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest opacity-50">
              Navigation
            </p>
          )}
          {navItems.map((item) => {
            const isActive = currentView === item.id
            const count =
              item.id === "all"
                ? ticketCounts.all
                : item.id === "my"
                  ? ticketCounts.my
                  : null
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-accent-foreground))]"
                    : "text-[hsl(var(--sidebar-foreground))] hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-accent-foreground))]",
                  collapsed && "justify-center px-0"
                )}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-[hsl(var(--sidebar-primary))]")} />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {count !== null && (
                      <span
                        className={cn(
                          "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold",
                          isActive
                            ? "bg-[hsl(var(--sidebar-primary))] text-[hsl(var(--sidebar-primary-foreground))]"
                            : "bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-foreground))]"
                        )}
                      >
                        {count}
                      </span>
                    )}
                  </>
                )}
              </button>
            )
          })}
        </div>
      </nav>

      {/* Toggle */}
      <div className="border-t border-[hsl(var(--sidebar-border))] p-3">
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center rounded-lg p-2 text-[hsl(var(--sidebar-foreground))] transition-colors hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-accent-foreground))]"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>
    </aside>
  )
}

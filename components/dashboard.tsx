"use client"

import { useState, useCallback } from "react"
import { AppSidebar, type View } from "@/components/app-sidebar"
import { RaiseTicketForm } from "@/components/raise-ticket-form"
import { TicketsTable } from "@/components/tickets-table"
import { StatsBar } from "@/components/stats-bar"
import {
  generateSampleTickets,
  getMyTickets,
  type Ticket,
} from "@/lib/ticket-data"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

const CURRENT_USER = "Ravi Kumar"

export function Dashboard() {
  const [view, setView] = useState<View>("all")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [tickets, setTickets] = useState<Ticket[]>(generateSampleTickets)

  const myTickets = getMyTickets(tickets, CURRENT_USER)

  const handleAddTicket = useCallback((ticket: Ticket) => {
    setTickets((prev) => [ticket, ...prev])
  }, [])

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/30 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - desktop */}
      <div className="hidden lg:flex">
        <AppSidebar
          currentView={view}
          onViewChange={setView}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((c) => !c)}
          ticketCounts={{ all: tickets.length, my: myTickets.length }}
        />
      </div>

      {/* Sidebar - mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-50 lg:hidden transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AppSidebar
          currentView={view}
          onViewChange={(v) => {
            setView(v)
            setMobileOpen(false)
          }}
          collapsed={false}
          onToggle={() => setMobileOpen(false)}
          ticketCounts={{ all: tickets.length, my: myTickets.length }}
        />
      </div>

      {/* Main content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h2 className="text-sm font-semibold text-foreground">
              {view === "raise"
                ? "Raise Ticket"
                : view === "all"
                  ? "All Tickets"
                  : "My Tickets"}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-xs font-bold text-[hsl(var(--primary-foreground))]">
              RK
            </div>
            <span className="hidden text-sm font-medium text-foreground sm:block">
              {CURRENT_USER}
            </span>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          {view === "raise" && (
            <RaiseTicketForm onSubmit={handleAddTicket} ticketCount={tickets.length} />
          )}

          {view === "all" && (
            <div className="flex flex-col gap-6">
              <StatsBar tickets={tickets} />
              <TicketsTable
                tickets={tickets}
                title="All Tickets"
                description="View and manage all safety tickets across the organization."
              />
            </div>
          )}

          {view === "my" && (
            <div className="flex flex-col gap-6">
              <StatsBar tickets={myTickets} />
              <TicketsTable
                tickets={myTickets}
                title="My Tickets"
                description="Tickets raised by you or assigned to you."
              />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

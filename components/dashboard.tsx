"use client"

import { useState } from "react"
import { AppSidebar } from "./app-sidebar"
import { RaiseTicketForm } from "./raise-ticket-form"
import { TicketsTable } from "./tickets-table"

type ViewType = "all" | "raise"

export function Dashboard() {
  const [view, setView] = useState<ViewType>("all")

  const handleNavigation = (selected: string) => {
    if (selected === "Raise Ticket") {
      setView("raise")
    } else if (selected === "All Tickets") {
      setView("all")
    }
  }

  return (
    <div className="flex min-h-screen">
      <AppSidebar onSelect={handleNavigation} />

      <main className="flex-1 p-6">
        {view === "raise" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Raise New Ticket</h2>
            <RaiseTicketForm onSubmitted={() => setView("all")} />
          </div>
        )}

        {view === "all" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">All Tickets</h2>
            <TicketsTable />
          </div>
        )}
      </main>
    </div>
  )
}

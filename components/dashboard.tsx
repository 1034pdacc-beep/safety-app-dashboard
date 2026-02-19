"use client"

import { useState } from "react"
import { AppSidebar } from "./app-sidebar"
import { RaiseTicketForm } from "./raise-ticket-form"
import { TicketsTable } from "./tickets-table"

export function Dashboard() {
  const [view, setView] = useState<"all" | "raise">("all")

  const switchView = (v: "all" | "raise") => {
    setView(v)
  }

  return (
    <>
      <AppSidebar onSelect={(v) => switchView(v)} />

      <div className="p-6">
        {view === "raise" && (
          <RaiseTicketForm onSubmitted={() => switchView("all")} />
        )}
        {view === "all" && <TicketsTable />}
      </div>
    </>
  )
}

"use client"

import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Clock, CheckCircle2, ShieldAlert } from "lucide-react"
import type { Ticket } from "@/lib/ticket-data"

interface StatsBarProps {
  tickets: Ticket[]
}

export function StatsBar({ tickets }: StatsBarProps) {
  const open = tickets.filter((t) => t.status === "Open").length
  const inProgress = tickets.filter((t) => t.status === "In Progress").length
  const resolved = tickets.filter((t) => t.status === "Resolved" || t.status === "Closed").length
  const critical = tickets.filter((t) => t.priority === "Critical").length

  const stats = [
    {
      label: "Open Tickets",
      value: open,
      icon: ShieldAlert,
      color: "text-[hsl(var(--primary))]",
      bg: "bg-[hsl(var(--primary))]/10",
    },
    {
      label: "In Progress",
      value: inProgress,
      icon: Clock,
      color: "text-[hsl(var(--warning))]",
      bg: "bg-[hsl(var(--warning))]/10",
    },
    {
      label: "Resolved",
      value: resolved,
      icon: CheckCircle2,
      color: "text-[hsl(var(--success))]",
      bg: "bg-[hsl(var(--success))]/10",
    },
    {
      label: "Critical",
      value: critical,
      icon: AlertTriangle,
      color: "text-[hsl(var(--destructive))]",
      bg: "bg-[hsl(var(--destructive))]/10",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-border bg-card">
          <CardContent className="flex items-center gap-4 p-4">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${stat.bg}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

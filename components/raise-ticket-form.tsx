"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CATEGORIES, CELLS, PRIORITIES, type Ticket, type TicketPriority } from "@/lib/ticket-data"
import { PlusCircle, CheckCircle2 } from "lucide-react"

interface RaiseTicketFormProps {
  onSubmit: (ticket: Ticket) => void
  ticketCount: number
}

export function RaiseTicketForm({ onSubmit, ticketCount }: RaiseTicketFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [cell, setCell] = useState("")
  const [priority, setPriority] = useState<TicketPriority>("Medium")
  const [assignedTo, setAssignedTo] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newTicket: Ticket = {
      id: `TKT-${String(ticketCount + 1).padStart(3, "0")}`,
      title,
      description,
      category,
      cell,
      status: "Open",
      priority,
      raisedBy: "Ravi Kumar",
      assignedTo: assignedTo || "Unassigned",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    }

    onSubmit(newTicket)
    setSubmitted(true)

    setTimeout(() => {
      setTitle("")
      setDescription("")
      setCategory("")
      setCell("")
      setPriority("Medium")
      setAssignedTo("")
      setSubmitted(false)
    }, 2000)
  }

  const isValid = title && description && category && cell

  if (submitted) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Card className="w-full max-w-md border-[hsl(var(--success))] bg-card">
          <CardContent className="flex flex-col items-center gap-4 py-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--success))]">
              <CheckCircle2 className="h-8 w-8 text-[hsl(var(--success-foreground))]" />
            </div>
            <h3 className="text-xl font-bold text-card-foreground">Ticket Submitted</h3>
            <p className="text-center text-sm text-muted-foreground">
              Your safety ticket has been raised successfully and assigned for review.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Raise a Safety Ticket</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Report a safety concern, incident, or observation for immediate attention.
        </p>
      </div>

      <Card className="border-border bg-card">
        <CardHeader className="border-b border-border pb-4">
          <CardTitle className="flex items-center gap-2 text-base text-card-foreground">
            <PlusCircle className="h-5 w-5 text-[hsl(var(--primary))]" />
            New Ticket Details
          </CardTitle>
          <CardDescription>Fill out all required fields to submit your safety report.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-foreground">
                Title <span className="text-[hsl(var(--destructive))]">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Brief description of the safety concern"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Category & Cell */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Category <span className="text-[hsl(var(--destructive))]">*</span>
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Cell / Area <span className="text-[hsl(var(--destructive))]">*</span>
                </Label>
                <Select value={cell} onValueChange={setCell}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cell" />
                  </SelectTrigger>
                  <SelectContent>
                    {CELLS.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Priority & Assigned To */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Priority</Label>
                <Select value={priority} onValueChange={(v) => setPriority(v as TicketPriority)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRIORITIES.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assignedTo" className="text-sm font-medium text-foreground">
                  Assign To
                </Label>
                <Input
                  id="assignedTo"
                  placeholder="Enter assignee name"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-foreground">
                Description <span className="text-[hsl(var(--destructive))]">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Provide detailed information about the safety concern, location, and any witnesses..."
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 border-t border-border pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setTitle("")
                  setDescription("")
                  setCategory("")
                  setCell("")
                  setPriority("Medium")
                  setAssignedTo("")
                }}
              >
                Clear Form
              </Button>
              <Button type="submit" disabled={!isValid}>
                Submit Ticket
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

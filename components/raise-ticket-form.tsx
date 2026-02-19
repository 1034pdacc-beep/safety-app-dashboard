"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { CATEGORIES, CELLS, type Ticket } from "@/lib/ticket-data"

interface RaiseTicketFormProps {
  onSubmitted: () => void
}

export function RaiseTicketForm({ onSubmitted }: RaiseTicketFormProps) {
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [cell, setCell] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) {
      alert("Please login first")
      return
    }

    const { error } = await supabase.from("tickets").insert({
      category_id: category,
      cell_id: cell,
      description,
      reporter_id: userData.user.id,
    })

    if (error) {
      alert("Error: " + error.message)
    } else {
      alert("Ticket submitted!")
      setDescription("")
      onSubmitted()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Cell</label>
        <select value={cell} onChange={(e) => setCell(e.target.value)}>
          <option value="">Select</option>
          {CELLS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button type="submit">Submit Ticket</button>
    </form>
  )
}

"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

interface RaiseTicketFormProps {
  onSubmitted: () => void
}

export function RaiseTicketForm({ onSubmitted }: RaiseTicketFormProps) {
  const [categories, setCategories] = useState<any[]>([])
  const [cells, setCells] = useState<any[]>([])

  const [categoryId, setCategoryId] = useState("")
  const [cellId, setCellId] = useState("")
  const [description, setDescription] = useState("")
  const [actionRequired, setActionRequired] = useState("")

  useEffect(() => {
    fetchDropdowns()
  }, [])

  const fetchDropdowns = async () => {
    const { data: catData } = await supabase.from("categories").select("*")
    const { data: cellData } = await supabase.from("cells").select("*")

    setCategories(catData || [])
    setCells(cellData || [])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) {
      alert("Please login first")
      return
    }

    const { error } = await supabase.from("tickets").insert({
      category_id: categoryId,
      cell_id: cellId,
      description,
      action_required: actionRequired,
      reporter_id: userData.user.id,
    })

    if (error) {
      alert(error.message)
    } else {
      alert("Ticket created successfully!")
      setDescription("")
      setActionRequired("")
      onSubmitted()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <div>
        <label>Category</label>
        <select
          className="border p-2 w-full"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Cell</label>
        <select
          className="border p-2 w-full"
          value={cellId}
          onChange={(e) => setCellId(e.target.value)}
          required
        >
          <option value="">Select Cell</option>
          {cells.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Description</label>
        <textarea
          className="border p-2 w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Action Required</label>
        <textarea
          className="border p-2 w-full"
          value={actionRequired}
          onChange={(e) => setActionRequired(e.target.value)}
        />
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit Ticket
      </button>
    </form>
  )
}

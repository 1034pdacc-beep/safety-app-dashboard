"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function RaiseTicketForm() {
  const router = useRouter()

  const [categories, setCategories] = useState<any[]>([])
  const [cells, setCells] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])

  const [form, setForm] = useState({
    category_id: "",
    cell_id: "",
    description: "",
    action_required: "",
    assignee_id: "",
  })

  useEffect(() => {
    fetchDropdowns()
  }, [])

  const fetchDropdowns = async () => {
    const { data: cat } = await supabase.from("categories").select("*")
    const { data: cell } = await supabase.from("cells").select("*")
    const { data: user } = await supabase.from("user_roles").select("user_id")

    setCategories(cat || [])
    setCells(cell || [])
    setUsers(user || [])
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return alert("Not logged in")

    const { data, error } = await supabase.from("tickets").insert([
      {
        category_id: form.category_id,
        cell_id: form.cell_id,
        description: form.description,
        action_required: form.action_required,
        reporter_id: user.id,
        assignee_id: form.assignee_id || null,
      },
    ])

    if (error) {
      alert(error.message)
    } else {
      alert("Ticket Created Successfully")
      router.push("/dashboard")
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Raise Ticket</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <select
          className="w-full border p-2"
          required
          onChange={(e) =>
            setForm({ ...form, category_id: e.target.value })
          }
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          className="w-full border p-2"
          required
          onChange={(e) =>
            setForm({ ...form, cell_id: e.target.value })
          }
        >
          <option value="">Select Cell</option>
          {cells.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Description"
          className="w-full border p-2"
          required
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <textarea
          placeholder="Action Required"
          className="w-full border p-2"
          required
          onChange={(e) =>
            setForm({ ...form, action_required: e.target.value })
          }
        />

        <select
          className="w-full border p-2"
          onChange={(e) =>
            setForm({ ...form, assignee_id: e.target.value })
          }
        >
          <option value="">Assign To (Optional)</option>
          {users.map((u) => (
            <option key={u.user_id} value={u.user_id}>
              {u.user_id}
            </option>
          ))}
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Submit Ticket
        </button>
      </form>
    </div>
  )
}

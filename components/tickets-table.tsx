"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export function TicketsTable() {
  const [tickets, setTickets] = useState<any[]>([])

  const fetchTickets = async () => {
    const { data, error } = await supabase
      .from("tickets")
      .select(`
        id,
        ticket_number,
        status,
        created_at,
        categories(name),
        cells(name)
      `)
      .order("created_at", { ascending: false })

    if (!error) {
      setTickets(data || [])
    }
  }

  useEffect(() => {
    fetchTickets()
  }, [])

  return (
    <table className="min-w-full border">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Ticket #</th>
          <th className="border p-2">Category</th>
          <th className="border p-2">Cell</th>
          <th className="border p-2">Status</th>
          <th className="border p-2">Created</th>
        </tr>
      </thead>

      <tbody>
        {tickets.map((t) => (
          <tr key={t.id}>
            <td className="border p-2">{t.ticket_number}</td>
            <td className="border p-2">{t.categories?.name}</td>
            <td className="border p-2">{t.cells?.name}</td>
            <td className="border p-2">{t.status}</td>
            <td className="border p-2">
              {new Date(t.created_at).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

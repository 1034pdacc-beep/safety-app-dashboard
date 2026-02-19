"use client"

import { useState, useEffect } from "react"
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

    if (!error) setTickets(data || [])
  }

  useEffect(() => {
    fetchTickets()
  }, [])

  return (
    <table className="table-auto border">
      <thead>
        <tr>
          <th>Ticket #</th>
          <th>Category</th>
          <th>Cell</th>
          <th>Status</th>
          <th>Created</th>
        </tr>
      </thead>

      <tbody>
        {tickets.map((t) => (
          <tr key={t.id}>
            <td>{t.ticket_number}</td>
            <td>{t.categories?.name}</td>
            <td>{t.cells?.name}</td>
            <td>{t.status}</td>
            <td>{new Date(t.created_at).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"

export default function TicketsTable() {
  const [tickets, setTickets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [myOnly, setMyOnly] = useState(false)

  useEffect(() => {
    fetchTickets()
  }, [myOnly])

  const fetchTickets = async () => {
    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    let query = supabase
      .from("tickets")
      .select(
        "id, ticket_number, status, created_at, reporter_id"
      )
      .order("created_at", { ascending: false })

    if (myOnly && user) {
      query = query.eq("reporter_id", user.id)
    }

    const { data, error } = await query

    if (!error && data) {
      setTickets(data)
    }

    setLoading(false)
  }

  if (loading) return <div>Loading tickets...</div>

  return (
    <div className="p-6 bg-white shadow rounded">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Ticket Tracking</h2>

        <button
          onClick={() => setMyOnly(!myOnly)}
          className="bg-gray-200 px-3 py-1 rounded"
        >
          {myOnly ? "Show All" : "My Tickets"}
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Ticket ID</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Created</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((t) => (
            <tr key={t.id} className="text-center">
              <td className="border p-2 text-blue-600 underline">
                <Link href={`/tickets/${t.id}`}>
                  {t.ticket_number}
                </Link>
              </td>
              <td className="border p-2">{t.status}</td>
              <td className="border p-2">
                {new Date(t.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

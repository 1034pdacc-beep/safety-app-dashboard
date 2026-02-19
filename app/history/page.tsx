"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([])

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    const { data } = await supabase
      .from("ticket_history")
      .select("*")
      .order("changed_at", { ascending: false })

    setHistory(data || [])
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">System History</h1>

      {history.map((h) => (
        <div key={h.id} className="border p-3 mb-2">
          <p><b>Action:</b> {h.action}</p>
          <p><b>New Value:</b> {h.new_value}</p>
          <p><b>Date:</b> {new Date(h.changed_at).toLocaleString()}</p>
        </div>
      ))}
    </div>
  )
}

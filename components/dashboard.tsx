"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function Dashboard() {
  const [stats, setStats] = useState({
    all: 0,
    open: 0,
    closed: 0,
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("tickets")
        .select("*")

      if (!error && data) {
        const all = data.length
        const open = data.filter((t) => t.status === "open").length
        const closed = data.filter((t) => t.status === "closed").length

        setStats({ all, open, closed })
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-sm text-gray-500">All Tickets</h2>
          <p className="text-2xl font-bold">{stats?.all ?? 0}</p>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-sm text-gray-500">Open Tickets</h2>
          <p className="text-2xl font-bold">{stats?.open ?? 0}</p>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-sm text-gray-500">Closed Tickets</h2>
          <p className="text-2xl font-bold">{stats?.closed ?? 0}</p>
        </div>
      </div>
    </div>
  )
}

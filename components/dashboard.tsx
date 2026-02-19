"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const router = useRouter()

  const [stats, setStats] = useState({
    all: 0,
    open: 0,
    closed: 0,
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    const { data, error } = await supabase
      .from("tickets")
      .select("status")

    if (!error && data) {
      const all = data.length
      const open = data.filter(
        (t) => t.status === "new" || t.status === "in progress"
      ).length
      const closed = data.filter((t) => t.status === "closed").length

      setStats({ all, open, closed })
    }

    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>
  }

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Safety Dashboard</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="p-6 bg-white shadow rounded">
          <h2 className="text-sm text-gray-500">All Tickets</h2>
          <p className="text-3xl font-bold">{stats.all}</p>
        </div>

        <div className="p-6 bg-white shadow rounded">
          <h2 className="text-sm text-gray-500">Open / In Progress</h2>
          <p className="text-3xl font-bold">{stats.open}</p>
        </div>

        <div className="p-6 bg-white shadow rounded">
          <h2 className="text-sm text-gray-500">Closed</h2>
          <p className="text-3xl font-bold">{stats.closed}</p>
        </div>
      </div>
    </div>
  )
}

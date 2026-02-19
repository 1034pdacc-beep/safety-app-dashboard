"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type AuthContextType = {
  user: any
  role: string | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [role, setRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchSession = async () => {
    const { data } = await supabase.auth.getSession()
    const currentUser = data.session?.user ?? null
    setUser(currentUser)

    if (currentUser) {
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("id", currentUser.id)
        .single()

      setRole(roleData?.role ?? null)
    } else {
      setRole(null)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchSession()

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      fetchSession()
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

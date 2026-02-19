"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function TicketDetails() {
  const { id } = useParams()

  const [ticket, setTicket] = useState<any>(null)
  const [comments, setComments] = useState<any[]>([])
  const [files, setFiles] = useState<any[]>([])
  const [newComment, setNewComment] = useState("")
  const [userRole, setUserRole] = useState("")

  useEffect(() => {
    fetchTicket()
    fetchComments()
    fetchFiles()
    fetchRole()
  }, [])

  const fetchRole = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user?.id)
      .single()

    if (data) setUserRole(data.role)
  }

  const fetchTicket = async () => {
    const { data } = await supabase
      .from("tickets")
      .select("*")
      .eq("id", id)
      .single()

    setTicket(data)
  }

  const fetchComments = async () => {
    const { data } = await supabase
      .from("ticket_comments")
      .select("*")
      .eq("ticket_id", id)
      .order("created_at", { ascending: true })

    setComments(data || [])
  }

  const fetchFiles = async () => {
    const { data } = await supabase
      .from("ticket_files")
      .select("*")
      .eq("ticket_id", id)

    setFiles(data || [])
  }

  const addComment = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    await supabase.from("ticket_comments").insert([
      {
        ticket_id: id,
        comment: newComment,
        commented_by: user?.id,
      },
    ])

    await supabase.from("ticket_history").insert([
      {
        ticket_id: id,
        action: "Comment Added",
        new_value: newComment,
        changed_by: user?.id,
      },
    ])

    setNewComment("")
    fetchComments()
  }

  const updateStatus = async (status: string) => {
    const { data: { user } } = await supabase.auth.getUser()

    await supabase
      .from("tickets")
      .update({ status })
      .eq("id", id)

    await supabase.from("ticket_history").insert([
      {
        ticket_id: id,
        action: "Status Updated",
        new_value: status,
        changed_by: user?.id,
      },
    ])

    fetchTicket()
  }

  const uploadFile = async (e: any) => {
    const file = e.target.files[0]
    if (!file) return

    const { data: { user } } = await supabase.auth.getUser()

    const filePath = `${id}/${Date.now()}-${file.name}`

    await supabase.storage
      .from("ticket-files")
      .upload(filePath, file)

    const { data } = supabase.storage
      .from("ticket-files")
      .getPublicUrl(filePath)

    await supabase.from("ticket_files").insert([
      {
        ticket_id: id,
        file_url: data.publicUrl,
        uploaded_by: user?.id,
      },
    ])

    fetchFiles()
  }

  if (!ticket) return <div>Loading...</div>

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">
        {ticket.ticket_number}
      </h1>

      <p><b>Status:</b> {ticket.status}</p>
      <p><b>Description:</b> {ticket.description}</p>
      <p><b>Action Required:</b> {ticket.action_required}</p>

      {(userRole === "admin" || userRole === "manager") && (
        <div className="space-x-2">
          <button
            onClick={() => updateStatus("in_progress")}
            className="bg-yellow-500 px-3 py-1 text-white rounded"
          >
            In Progress
          </button>

          <button
            onClick={() => updateStatus("closed")}
            className="bg-green-600 px-3 py-1 text-white rounded"
          >
            Close
          </button>
        </div>
      )}

      <div>
        <h2 className="font-bold mt-4">Evidence</h2>

        <input type="file" onChange={uploadFile} />

        {files.map((f) => (
          <div key={f.id} className="mt-2">
            <a
              href={f.file_url}
              target="_blank"
              className="text-blue-600 underline"
            >
              View File
            </a>
          </div>
        ))}
      </div>

      <div>
        <h2 className="font-bold mt-4">Comments</h2>

        {comments.map((c) => (
          <div key={c.id} className="border p-2 mt-2">
            {c.comment}
          </div>
        ))}

        <textarea
          className="w-full border p-2 mt-3"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />

        <button
          onClick={addComment}
          className="bg-blue-600 text-white px-4 py-2 mt-2 rounded"
        >
          Add Comment
        </button>
      </div>
    </div>
  )
}

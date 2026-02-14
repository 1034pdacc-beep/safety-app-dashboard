export type TicketStatus = "Open" | "In Progress" | "Resolved" | "Closed"
export type TicketPriority = "Low" | "Medium" | "High" | "Critical"

export type Ticket = {
  id: string
  title: string
  description: string
  category: string
  cell: string
  status: TicketStatus
  priority: TicketPriority
  raisedBy: string
  assignedTo: string
  createdAt: string
  updatedAt: string
}

export const CATEGORIES = [
  "Unsafe Act",
  "Unsafe Condition",
  "NearMiss",
  "First Aid",
  "Environmental",
  "Fire Hazard",
  "PPE Violation",
  "Housekeeping",
] as const

export const CELLS = [
  "Office",
  "FAG",
  "Assembly",
  "Warehouse",
  "Paint Shop",
  "Welding",
  "CNC Shop",
  "Quality Lab",
] as const

export const STATUSES: TicketStatus[] = ["Open", "In Progress", "Resolved", "Closed"]
export const PRIORITIES: TicketPriority[] = ["Low", "Medium", "High", "Critical"]

const NAMES = [
  "Ravi Kumar",
  "Priya Sharma",
  "Arjun Patel",
  "Sneha Gupta",
  "Vikram Singh",
  "Anita Desai",
  "Rahul Mehta",
  "Divya Nair",
]

export function generateSampleTickets(): Ticket[] {
  const tickets: Ticket[] = [
    {
      id: "TKT-001",
      title: "Worker not wearing safety goggles",
      description: "Observed a worker operating the grinding machine without safety goggles in CNC Shop area during the morning shift.",
      category: "PPE Violation",
      cell: "CNC Shop",
      status: "Open",
      priority: "High",
      raisedBy: "Ravi Kumar",
      assignedTo: "Vikram Singh",
      createdAt: "2026-02-10",
      updatedAt: "2026-02-10",
    },
    {
      id: "TKT-002",
      title: "Oil spill near assembly line 3",
      description: "Hydraulic oil leaking from machine creating a slippery surface near assembly line 3. Immediate cleanup required.",
      category: "Unsafe Condition",
      cell: "Assembly",
      status: "In Progress",
      priority: "Critical",
      raisedBy: "Priya Sharma",
      assignedTo: "Arjun Patel",
      createdAt: "2026-02-09",
      updatedAt: "2026-02-11",
    },
    {
      id: "TKT-003",
      title: "Near miss - forklift collision",
      description: "Forklift nearly collided with a pedestrian at the warehouse intersection. Blind spot needs mirror installation.",
      category: "NearMiss",
      cell: "Warehouse",
      status: "Resolved",
      priority: "Critical",
      raisedBy: "Arjun Patel",
      assignedTo: "Sneha Gupta",
      createdAt: "2026-02-08",
      updatedAt: "2026-02-12",
    },
    {
      id: "TKT-004",
      title: "Fire extinguisher past expiry date",
      description: "Fire extinguisher at paint shop zone B has expired last month. Needs immediate replacement.",
      category: "Fire Hazard",
      cell: "Paint Shop",
      status: "Open",
      priority: "High",
      raisedBy: "Sneha Gupta",
      assignedTo: "Rahul Mehta",
      createdAt: "2026-02-11",
      updatedAt: "2026-02-11",
    },
    {
      id: "TKT-005",
      title: "Chemical waste improper disposal",
      description: "Chemical waste containers found without proper labels near the welding area disposal bins.",
      category: "Environmental",
      cell: "Welding",
      status: "Open",
      priority: "Medium",
      raisedBy: "Vikram Singh",
      assignedTo: "Divya Nair",
      createdAt: "2026-02-12",
      updatedAt: "2026-02-12",
    },
    {
      id: "TKT-006",
      title: "Loose wiring on office ceiling",
      description: "Exposed electrical wiring hanging from false ceiling near conference room B. Potential electrocution risk.",
      category: "Unsafe Condition",
      cell: "Office",
      status: "In Progress",
      priority: "High",
      raisedBy: "Anita Desai",
      assignedTo: "Ravi Kumar",
      createdAt: "2026-02-07",
      updatedAt: "2026-02-13",
    },
    {
      id: "TKT-007",
      title: "Minor cut from sharp edge",
      description: "Worker sustained a minor cut from a deburring station sharp edge. First aid administered on site.",
      category: "First Aid",
      cell: "CNC Shop",
      status: "Closed",
      priority: "Low",
      raisedBy: "Rahul Mehta",
      assignedTo: "Priya Sharma",
      createdAt: "2026-02-06",
      updatedAt: "2026-02-08",
    },
    {
      id: "TKT-008",
      title: "Blocked emergency exit",
      description: "Pallets stacked in front of emergency exit door in the warehouse. Must be cleared immediately.",
      category: "Housekeeping",
      cell: "Warehouse",
      status: "Resolved",
      priority: "Critical",
      raisedBy: "Divya Nair",
      assignedTo: "Vikram Singh",
      createdAt: "2026-02-05",
      updatedAt: "2026-02-10",
    },
    {
      id: "TKT-009",
      title: "Worker climbing rack without harness",
      description: "Worker observed climbing storage racks at height without safety harness in FAG cell.",
      category: "Unsafe Act",
      cell: "FAG",
      status: "Open",
      priority: "Critical",
      raisedBy: "Ravi Kumar",
      assignedTo: "Anita Desai",
      createdAt: "2026-02-13",
      updatedAt: "2026-02-13",
    },
    {
      id: "TKT-010",
      title: "Missing safety signage at Quality Lab",
      description: "Mandatory PPE signage missing at Quality Lab entrance after recent renovations.",
      category: "Housekeeping",
      cell: "Quality Lab",
      status: "In Progress",
      priority: "Medium",
      raisedBy: "Priya Sharma",
      assignedTo: "Rahul Mehta",
      createdAt: "2026-02-14",
      updatedAt: "2026-02-14",
    },
    {
      id: "TKT-011",
      title: "Welding sparks without screen",
      description: "Welding operation being performed without spark screen, posing risk to nearby workers.",
      category: "Unsafe Act",
      cell: "Welding",
      status: "Open",
      priority: "High",
      raisedBy: "Arjun Patel",
      assignedTo: "Sneha Gupta",
      createdAt: "2026-02-14",
      updatedAt: "2026-02-14",
    },
    {
      id: "TKT-012",
      title: "Dust accumulation in paint booth",
      description: "Excessive dust buildup in paint booth ventilation system. Needs cleaning to prevent fire risk.",
      category: "Fire Hazard",
      cell: "Paint Shop",
      status: "Open",
      priority: "Medium",
      raisedBy: "Sneha Gupta",
      assignedTo: "Arjun Patel",
      createdAt: "2026-02-13",
      updatedAt: "2026-02-13",
    },
  ]

  return tickets
}

export function getMyTickets(tickets: Ticket[], currentUser: string): Ticket[] {
  return tickets.filter(
    (t) => t.raisedBy === currentUser || t.assignedTo === currentUser
  )
}

export function exportToCSV(tickets: Ticket[]): void {
  const headers = [
    "ID",
    "Title",
    "Category",
    "Cell",
    "Status",
    "Priority",
    "Raised By",
    "Assigned To",
    "Created",
    "Updated",
  ]

  const rows = tickets.map((t) => [
    t.id,
    `"${t.title}"`,
    t.category,
    t.cell,
    t.status,
    t.priority,
    t.raisedBy,
    t.assignedTo,
    t.createdAt,
    t.updatedAt,
  ])

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join(
    "\n"
  )

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.setAttribute("href", url)
  link.setAttribute("download", `safety-tickets-${new Date().toISOString().split("T")[0]}.csv`)
  link.style.display = "none"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

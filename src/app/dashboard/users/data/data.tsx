import {
  ArrowDownToLine,
  ArrowRightToLine,
  ArrowUpCircle,
  ArrowUpToLine,
  Circle,
  HelpCircle,
} from "lucide-react"

export const roles = [
  {
    value: "ADMIN",
    label: "Admin",
    icon: HelpCircle,
  },
  {
    value: "PROFESSOR",
    label: "Professor",
    icon: Circle,
  },
  {
    value: "STUDENT",
    label: "Student",
    icon: ArrowUpCircle,
  },
]

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownToLine,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightToLine,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpToLine,
  },
]
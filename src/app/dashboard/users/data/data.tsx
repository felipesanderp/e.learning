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

export const status = [
  {
    label: "Active",
    value: 'true',
    icon: ArrowDownToLine,
  },
  {
    label: "Disabled",
    value: 'false',
    icon: ArrowRightToLine,
  },
]
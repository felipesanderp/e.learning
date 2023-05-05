interface DashboardHeaderProps {
  heading: string;
  text?: string | null;
  children?: React.ReactNode;
}

export function DashboardHeader({
  heading,
  text,
  children
}: DashboardHeaderProps) {
  return (
    <div className="flex justify-between px-2">
      <div className="grid gap-1">
        <h1 className="text-2xl font-bold tracking-wide text-slate-900 dark:text-slate-100">
          {heading}
        </h1>
        {text && <p className="text-neutral-500 dark:text-neutral-50">{text}</p>}
      </div>
      {children}
    </div>
  )
}
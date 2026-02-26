import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground text-sana-sans-medium text-base placeholder:text-base selection:bg-secondary border-secondary-darker/35 h-[56px] w-full min-w-0 rounded-[12px] border bg-transparent p-4 transition-[color,box-shadow-none] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-base file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-secondary-darker/35 focus-visible:ring-[1px] focus-visible:ring-secondary-darker/35",
        "aria-invalid:ring-secondary-darker/35 aria-invalid:border-secondary-darker/35",
        className
      )}
      {...props}
    />
  )
}

export { Input }

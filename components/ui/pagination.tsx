import * as React from "react"
import { cn } from "@/lib/utils"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-5", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
  size?: "icon" | "default"
} & React.ComponentProps<"a">

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        "inline-flex border-[3px] text-[18px] font-sana-sans-black items-center justify-center font-medium transition-colors rounded-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        size === "icon" && "h-9 w-9",
        size === "default" && "h-[50px] px-4 min-w-[50px]",
        isActive
          ? "border-primary bg-white "
          : "border-transparent bg-[#D9D9D9] hover:bg-[#c9c9c9]",
        className
      )}
      {...props}
    />
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
}

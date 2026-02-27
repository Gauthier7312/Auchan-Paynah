import React from 'react'
import { HeroHeader } from './hero-header'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-[#F4F4F7]">
      <div className="max-w-[1370px] min-h-screen mx-auto py-6.5">
        <HeroHeader />
        {children}
      </div>
    </main>
  )
}

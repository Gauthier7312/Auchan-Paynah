import React from 'react'
import Image from 'next/image'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-primary px-4 py-6 sm:px-6 sm:py-8">
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[min(1330px,80vh)] w-[min(1436px,100vw)] -translate-x-1/2"
        aria-hidden
      >
        <Image
          src="/assets/auchan_.svg"
          alt=""
          fill
          className="object-contain object-bottom opacity-100"
          sizes="(max-width: 768px) 100vw, 1436px"
          priority
        />
      </div>

      <div className="relative z-10 flex h-full w-full max-w-[474px] flex-col shrink-0 sm:h-[520px] md:h-[670px]">
        <div
          className="absolute -bottom-2 -right-2 h-[calc(100%-12px)] w-[calc(100%-10px)] rounded-[28px] bg-[#FFC7C7] sm:rounded-[37px]"
          aria-hidden
        />
        <div className="relative flex min-h-0 w-full flex-1 flex-col rounded-[24px] bg-white p-8 shadow-sm sm:rounded-[30px] sm:px-4 sm:py-9 md:min-h-0">
          {children}
        </div>
      </div>
    </main>
  )
}


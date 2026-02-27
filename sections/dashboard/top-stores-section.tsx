import Link from 'next/link'
import StoreCard from '@/components/store-card'
import { Button } from '@/components/ui/button'

export default function TopStoresSection() {
  return (
    <div className="bg-[#FFE5E5] rounded-2xl sm:rounded-[32px] lg:rounded-[40px] py-4 sm:py-6 pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-8 relative min-h-[300px] sm:min-h-[320px] lg:h-[330px]">
      <div className="absolute top-0 right-0 w-[24px] h-full rounded-r-2xl sm:rounded-r-[32px] lg:rounded-r-[40px] bg-[linear-gradient(to_right,#FFD4DA00_0%,#FFD4DA_100%)] z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="font-sana-sans-bold text-xl sm:text-[28px] text-[#444444]">
          Les magasins qui transactent le plus
        </p>
        <div className="shrink-0">
          <Button
            variant="outline"
            size="medium"
            className="flex flex-col items-center justify-center rounded-[10px]"
          >
            <Link
              href="/admin/dashboard/stores"
              className="font-sana-sans-bold text-base sm:text-[18px] text-primary"
            >
              Tous les magasins &gt;
            </Link>
          </Button>
        </div>
      </div>

      <div className="scrollbar-hide flex items-center gap-4 sm:gap-5 mt-4 sm:mt-6.5 overflow-x-auto flex-nowrap pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        {Array.from({ length: 5 }).map((_, index) => (
          <StoreCard key={index} id={String(index + 1)} />
        ))}
      </div>
    </div>
  )
}

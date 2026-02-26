import Link from 'next/link'
import StoreCard from '@/components/store-card'
import { Button } from '@/components/ui/button'

export default function TopStoresSection() {
  return (
    <div className=" bg-[#FFE5E5] rounded-[40px] py-6 pl-8 relative h-[330px]">
      <div className="absolute top-0 right-0 w-[24px] h-full rounded-r-[40px] bg-[linear-gradient(to_right,#FFD4DA00_0%,#FFD4DA_100%)] z-0 pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between pr-8">
        <p className="font-sana-sans-bold text-[28px] text-[#444444]">
          Les magasins qui transactent le plus
        </p>
        <div>
          <Button
            variant="outline"
            size="medium"
            className="flex flex-col items-center justify-center rounded-[10px]"
          >
            <Link
              href="/admin/dashboard/stores"
              className="font-sana-sans-bold text-[18px] text-primary"
            >
              Tous les magasins &gt;
            </Link>
          </Button>
        </div>
      </div>

      <div className="scrollbar-hide flex items-center gap-5 mt-6.5 overflow-x-auto flex-nowrap">
        {Array.from({ length: 5 }).map((_, index) => (
          <StoreCard key={index} />
        ))}
      </div>
    </div>
  )
}

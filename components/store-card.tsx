import Image from 'next/image'
import Link from 'next/link'
import SvgColor from './svg-color'

type StoreCardProps = {
  id: string
}

export default function StoreCard({ id }: StoreCardProps) {
  return (
    <Link
      href={`/admin/stores/${id}`}
      className="group min-w-[250px] h-[200px] bg-white rounded-[40px] p-[26px] flex flex-col justify-between gap-4 transition-[background] duration-300 hover:bg-[radial-gradient(104.5%_149.38%_at_-2.6%_-7.25%,#FFBDC4_0%,#E0001A_49.04%)] cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="h-[32px] w-[32px] bg-[#98989866] rounded-[10px] flex items-center justify-center">
          <Image src="/assets/icons/ic_store.svg" alt="Store" width={21} height={19} />
        </div>

        <SvgColor src="/assets/icons/ic_arrow_90.svg" className="text-primary w-5 h-5 transition-colors duration-300 group-hover:text-white" />
      </div>

      <div>
        <p className="font-sana-sans-black text-[20px] transition-colors duration-300 group-hover:text-white">Angré Djibi 1</p>
        <div className="flex items-center gap-3.5 text-[#949494] transition-colors duration-300 group-hover:text-white">
          <p className="font-sana-sans-medium text-[12px]">M0001</p>
          <div className="flex items-center gap-1">
            <SvgColor src="/assets/icons/ic_location.svg" className="text-[#949494] w-2.5 h-2.5 transition-colors duration-300 group-hover:text-white" />
            <p className="font-sana-sans-medium text-[12px]">Abidjan, Cocody</p>
          </div>
        </div>
      </div>
    </Link>
  )
}



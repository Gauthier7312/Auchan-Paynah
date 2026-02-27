'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const menuItems = [
  { name: 'Tableau de bord', href: '/admin/dashboard' },
  { name: 'Magasins', href: '/admin/stores' },
  { name: 'Transactions', href: '#link' },
  { name: 'Clients', href: '#link' },
  { name: 'Gestions', href: '#link' },
  { name: 'Statistiques', href: '#link' },
]

type NavLinkSimple = {
  name: string
  href: string
}

export function HeroHeader() {
  const pathname = usePathname()
  function isActive(item: NavLinkSimple) {
    if (pathname === item.href) return true
    if (item.href.startsWith('/') && pathname.startsWith(item.href + '/')) return true
    return false
  }
  const isDetail = pathname !== '/admin/stores' && pathname.startsWith('/admin/stores/')

  return (
    <header>
      <nav
        className={cn('w-[1370px] mx-auto relative', isDetail ? 'h-[130px]' : 'h-[90px]')}
      >
        <div className="bg-white h-[90px] rounded-[30px] px-9 flex items-center z-10 absolute top-0 left-0 w-full">
          <div className="flex flex-wrap items-center justify-between gap-2.5 w-full">
            <Link href="/admin/dashboard" aria-label="home">
              <Image src="/assets/logo_auchan.svg" alt="Auchan" width={113} height={43} />
            </Link>

            <div className="inset-0 m-auto size-fit">
              <ul className="flex gap-7 items-center">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className={cn(
                        'text-lg font-sana-sans-bold block duration-50 px-3 py-1.5',
                        isActive(item)
                          ? 'bg-primary text-white rounded-[10px]'
                          : 'hover:text-black/70'
                      )}
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-[40px] h-[40px] bg-[#D9D9D9] rounded-full flex items-center justify-center">
              <Image src="/assets/icons/ic_user.svg" alt="User" width={22} height={22} />
            </div>
          </div>
        </div>

        {isDetail && (
          <nav
            aria-label="Fil"
            className="absolute top-[51px] left-0 w-full bg-[#FFE8E8] h-[78px] rounded-[10px] rounded-t-none px-5 py-[7px] flex items-end"
          >
            <ol className="flex items-center gap-2 text-base font-sana-sans-bold list-none p-0 m-0">
              <li>
                <Link href="/admin/stores" className="hover:underline">
                  Magasins
                </Link>
              </li>
              <li className="text-[#949494]" aria-hidden="true">
                &gt;
              </li>
              <li aria-current="page" className="text-[#949494]">
                <span>Détails</span>
              </li>
            </ol>
          </nav>
        )}
      </nav>
    </header>
  )
}

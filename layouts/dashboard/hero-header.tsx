'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import SvgColor from '@/components/svg-color'
import { MenuIcon } from '@/public/assets/icons/menu_icon'

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
  const [menuOpen, setMenuOpen] = useState(false)

  function isActive(item: NavLinkSimple) {
    if (pathname === item.href) return true
    if (item.href.startsWith('/') && pathname.startsWith(item.href + '/')) return true
    return false
  }
  const isDetail = pathname !== '/admin/stores' && pathname.startsWith('/admin/stores/')

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="w-full">
      <nav
        className={cn(
          'w-full max-w-[1370px] mx-auto relative',
          isDetail ? 'min-h-[90px] sm:min-h-[100px] lg:min-h-[130px]' : 'min-h-[70px] sm:min-h-[80px] lg:min-h-[90px]'
        )}
      >
        <div
          className={cn(
            'bg-white rounded-2xl sm:rounded-[26px] lg:rounded-[30px] flex items-center z-10 relative w-full',
            'min-h-[64px] sm:min-h-[72px] lg:min-h-[90px] h-[64px] sm:h-[72px] lg:h-[90px]',
            'px-4 sm:px-6 lg:px-9'
          )}
        >
          <div className="flex items-center gap-4 lg:gap-6 w-full">
            <Link href="/admin/dashboard" aria-label="Accueil" className="shrink-0">
              <Image
                src="/assets/logo_auchan.svg"
                alt="Auchan"
                width={113}
                height={43}
                className="h-8 w-auto sm:h-9 lg:h-[43px] lg:w-[113px] object-contain"
              />
            </Link>

            <div className="hidden lg:flex flex-1 justify-center min-w-0">
              <ul className="flex flex-wrap items-center justify-center gap-5">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className={cn(
                        'text-base xl:text-lg font-sana-sans-bold block duration-200 px-2.5 py-1.5 rounded-[10px] whitespace-nowrap',
                        isActive(item)
                          ? 'bg-primary text-white'
                          : 'hover:text-black/70'
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-black/5 text-[#444] transition-colors touch-manipulation"
                aria-label="Ouvrir le menu"
                aria-expanded={menuOpen}
              >
                <MenuIcon className="w-6 h-6" />
              </button>

              <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-[#D9D9D9] rounded-full flex items-center justify-center shrink-0">
                <Image src="/assets/icons/ic_user.svg" alt="Utilisateur" width={22} height={22} className="w-4 h-4 sm:w-5 sm:h-5 lg:w-[22px] lg:h-[22px]" />
              </div>
            </div>
          </div>
        </div>

        {isDetail && (
          <nav
            aria-label="Fil d'Ariane"
            className={cn(
              'absolute left-6 right-6 sm:left-6 sm:right-6 lg:left-0 lg:right-0 lg:px-0',
              'top-[46px] sm:top-[60px] lg:top-[51px]',
              'bg-[#FFE8E8] min-h-[56px] sm:min-h-[64px] lg:min-h-[78px] rounded-b-[10px]',
              'px-3 sm:px-4 lg:px-5 py-2 sm:py-[7px] flex items-end'
            )}
          >
            <ol className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base font-sana-sans-bold list-none p-0 m-0 flex-wrap">
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

      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Menu de navigation">
          <div
            className="absolute inset-0 bg-black/40 transition-opacity"
            onClick={closeMenu}
            aria-hidden
          />
          <div
            className={cn(
              'absolute top-0 right-0 bottom-0 w-full max-w-[320px] sm:max-w-[360px]',
              'bg-white shadow-xl rounded-l-2xl overflow-hidden',
              'flex flex-col transform transition-transform duration-200 ease-out translate-x-0'
            )}
          >
            <div className="flex items-center justify-between h-16 sm:h-[72px] px-4 sm:px-6 border-b border-[#E6E6E6] shrink-0">
              <span className="font-sana-sans-bold text-lg text-[#444]">Menu</span>
              <button
                type="button"
                onClick={closeMenu}
                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-black/5 text-[#444] transition-colors touch-manipulation"
                aria-label="Fermer le menu"
              >
                <SvgColor src="/assets/icons/ic_close.svg" className="w-6 h-6 text-[#949494]" />
              </button>
            </div>
            <nav className="flex-1 overflow-auto py-4" aria-label="Navigation principale">
              <ul className="flex flex-col gap-0.5 px-2">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={cn(
                        'block text-base font-sana-sans-bold py-3.5 px-4 rounded-xl transition-colors',
                        isActive(item)
                          ? 'bg-primary text-white'
                          : 'text-[#444] hover:bg-[#F6F6F6]'
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

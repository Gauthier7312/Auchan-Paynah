'use client'
import Link from 'next/link'
import React from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className='bg-[#F4F4F7]'>
            <div className='max-w-[1370px] min-h-screen mx-auto py-6.5'>
                <HeroHeader />
                {children}
            </div>
        </main>
    )
}

const menuItems = [
    { name: 'Tableau de bord', href: '/admin/dashboard' },
    { name: 'Magasins', href: '/admin/stores' },
    { name: 'Transactions', href: '#link' },
    { name: 'Clients', href: '#link' },
    { name: 'Gestions', href: '#link' },
    { name: 'Statistiques', href: '#link' },
]


type NavLinkSimple = {
    name: string;
    href: string;
};

export const HeroHeader = () => {
    const pathname = usePathname();
    function isActive(item: NavLinkSimple) {
        if (item.href === "/admin/dashboard") {
            return pathname === "/admin/dashboard";
        }
        if (item.href === "/admin/stores") {
            return pathname === "/admin/stores";
        }
        return false;
    }
    const isDetail = false

    return (
        <header>
            <nav
                className={`w-[1370px] mx-auto relative h-[${isDetail ? 130 : 90}px]`}>
                <div className='bg-white h-[90px] rounded-[30px] px-9 flex items-center z-10 absolute top-0 left-0 w-full'>
                    <div className="flex flex-wrap items-center justify-between gap-2.5 w-full">
                        <Link
                            href="/admin/dashboard"
                            aria-label="home"
                        >
                            <Image src="/assets/logo_auchan.svg" alt="Auchan" width={113} height={43} />
                        </Link>

                        <div className="inset-0 m-auto size-fit">
                            <ul className="flex gap-7 items-center">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "text-lg font-sana-sans-bold block duration-50 px-3 py-1.5",
                                                isActive(item)
                                                    ? "bg-primary text-white rounded-[10px]"
                                                    : "hover:text-black/70"
                                            )}
                                        >
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className='w-[40px] h-[40px] bg-[#D9D9D9] rounded-full flex items-center justify-center'>
                            <Image src="/assets/icons/ic_user.svg" alt="User" width={22} height={22} />
                        </div>
                    </div>
                </div>

                {isDetail && (
                    <div className='absolute top-[51px] left-0 w-full bg-[#FFE8E8] h-[78px] rounded-[10px] rounded-t-none px-5 py-[7px] flex items-end'>
                        <p className='text-base font-sana-sans-bold'>Magasins - Détails</p>
                    </div>
                )}
            </nav>
        </header>
    )
}
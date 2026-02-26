import React from 'react'
import Image from 'next/image'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main
            className="flex flex-col items-center justify-center sm:justify-start w-full h-screen bg-primary relative overflow-hidden"
        >
            <div className="absolute top-[190px] center-0 w-[1436px] h-[1330px] opacity-100 ">
                <Image
                    src="/assets/auchan_.svg"
                    alt="Auchan"
                    fill
                    className="object-contain object-top opacity-100"
                />
            </div>

            <div className='w-[474px] h-[682px] bg-transparent z-10 relative mt-0 sm:mt-[184px]'>
                <div className='w-[464px] h-[670px] bg-[#FFC7C7] rounded-[37px] absolute bottom-0 right-0 ' />
                <div className='w-[464px] h-[670px] bg-white rounded-[30px] pl-[37px] pr-4 py-[37px] absolute top-0 left-0'>
                    {children}
                </div>
            </div>
        </main>
    )
}


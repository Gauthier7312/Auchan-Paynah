import { cn } from '@/lib/utils'

export default function BalanceDisplay({ isPriceVisible }: { isPriceVisible: boolean }) {
    return (
        <div className="relative min-h-[200px] sm:min-h-[200px] lg:min-h-[210px] flex flex-col justify-center">
            <div
                className={cn(
                    'flex flex-col font-sana-sans-heavy text-[40px] absolute inset-0 justify-end transition-opacity duration-300 ease-in-out',
                    isPriceVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
                )}
                aria-hidden={isPriceVisible}
            >
                <div className="flex items-center justify-start gap-1.5">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className="w-[20px] h-[20px] bg-white rounded-full" />
                    ))}
                </div>
                <span>FCFA</span>
            </div>

            <div
                className={cn(
                    'flex flex-col font-sana-sans-heavy text-[40px] absolute inset-0 justify-end transition-opacity duration-300 ease-in-out',
                    isPriceVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                )}
                aria-hidden={!isPriceVisible}
            >
                <span>9 231 000</span>
                <span className="-mt-5">FCFA</span>
            </div>
        </div>
    )
}
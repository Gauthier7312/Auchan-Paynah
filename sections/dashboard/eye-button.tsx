import { cn } from '@/lib/utils'

export default function EyeButton({ isPriceVisible, togglePrice }: { isPriceVisible: boolean, togglePrice: () => void }) {
    return (
        <button
            type="button"
            onClick={togglePrice}
            className="absolute top-[29px] left-[198px] w-[41px] h-[41px] bg-primary rounded-full cursor-pointer flex items-center justify-center transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            aria-label={isPriceVisible ? 'Masquer le solde' : 'Afficher le solde'}
        >
            <div className="w-full h-full relative flex items-center justify-center">
                <div
                    className={cn(
                        'w-[16px] h-[16px] bg-white rounded-full absolute top-1/2 left-[4px] transition-opacity duration-300 ease-in-out',
                        isPriceVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    )}
                    aria-hidden={!isPriceVisible}
                />

                <div
                    className={cn(
                        'w-[16px] h-[16px] bg-white rounded-full absolute top-[3px] right-[5px] transition-opacity duration-300 ease-in-out',
                        !isPriceVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    )}
                    aria-hidden={isPriceVisible}
                />
            </div>
        </button>
    )
}
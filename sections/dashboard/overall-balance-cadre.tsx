'use client';

import { useState } from 'react';
import Image from 'next/image';
import EyeButton from './eye-button';
import BalanceDisplay from './balance-display';

export default function OverallBalanceCadre() {
    const [isPriceVisible, setIsPriceVisible] = useState(false);
    const togglePrice = () => setIsPriceVisible((prev) => !prev);

    return (
        <div className="bg-primary rounded-[40px] w-full h-[330px] relative overflow-hidden">
            <div className="absolute top-0 right-[14px] w-[442px] h-[357px]">
                <Image src="/assets/bg_img_auchan.svg" alt="Overall Balance" fill className="object-contain object-top opacity-30" />
            </div>

            <div className="text-white h-full p-8 flex flex-col justify-between relative z-10">
                <div className="flex flex-col gap-3.5">
                    <p className="text-[26px] font-sana-sans-bold">Solde globale</p>
                    <p className="text-xs font-sana-sans-medium text-[#FFC4CB]">
                        {isPriceVisible ? "Touchez l'oeil pour masquer le solde" : "Touchez l'oeil pour masquer le solde"}
                    </p>
                </div>

                <BalanceDisplay isPriceVisible={isPriceVisible} />
                <EyeButton isPriceVisible={isPriceVisible} togglePrice={togglePrice} />
            </div>
        </div>
    );
}

'use client'

import Link from 'next/link'
import SvgColor from '@/components/svg-color'
import { useStoreDetailTab, useStoreSelectedCaissierId, type StoreTabValue } from './store-detail-search'
import { StoreStatisticsChart } from './store-statistics-chart'
import { StoreDetailTabs, StoreDetailTabsTab } from './store-detail-tabs'
import { StoreTransactionsTable, StoreCaissiersTable } from './tables'

export function StoreMainPanel() {
  const [tab, setTab] = useStoreDetailTab()
  const [, setSelectedCaissierId] = useStoreSelectedCaissierId()

  const handleTabChange = (v: StoreTabValue) => {
    setTab(v)
    if (v === 'transactions') {
      setSelectedCaissierId(null)
    }
  }

  const tabsData: StoreDetailTabsTab[] = [
    {
      value: 'transactions',
      label: 'Transactions',
      content: <StoreTransactionsTable />,
    },
    {
      value: 'caissiers',
      label: 'Caissiers',
      content: <StoreCaissiersTable />,
    }
  ]

  return (
    <div className="min-w-0">
      <div className="flex items-center gap-3 sm:gap-4">
        <Link
          href="/admin/stores"
          className="hover:opacity-80 transition-opacity duration-300 h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center shrink-0"
        >
          <SvgColor src="/assets/icons/ic_goback.svg" className="w-9 h-9 sm:w-10 sm:h-10 text-[#949494]" />
        </Link>
        <p className="font-sana-sans-bold text-2xl sm:text-[36px] text-black truncate">Détails Magasin</p>
      </div>

      <div className="px-4 py-4 sm:px-6 sm:py-5 lg:px-10 lg:py-6 bg-white rounded-[20px] w-full my-4 sm:my-5.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        <div className="flex flex-col gap-4 sm:gap-6">
          <CardItem label="Nom du magasin" value="Angré Djibi 1" />
          <CardItem label="Localisation" value="Abidjan, Cocody" />
        </div>

        <div className="flex flex-col gap-4 sm:gap-6">
          <CardItem label="Manager" value="Emmanuel GUIEBI" />
          <CardItem label="Responsable Caisse" value="Ismael DIOMANDE" />
        </div>

        <div className="flex flex-col gap-4 sm:gap-6">
          <CardItem label="Nombre de Caissiers" value="07" />
          <CardItem label="Nombre de Transaction" value="1253" />
        </div>

        <div className="min-w-0">
          <StoreStatisticsChart />
        </div>
      </div>

      <div className="py-4 sm:py-6.5 bg-white rounded-2xl sm:rounded-[20px] overflow-hidden">
        <StoreDetailTabs
          tabs={tabsData}
          value={tab}
          onValueChange={(v) => handleTabChange(v as StoreTabValue)}
        />
      </div>
    </div>
  )
}

const CardItem = ({ label, value }: { label: string, value: string }) => {
  return (
    <div>
      <p className="font-sana-sans-medium text-base text-[#949494]">{label}</p>
      <p className="font-sana-sans-bold text-[20px] text-black -mt-2">{value}</p>
    </div>
  )
}


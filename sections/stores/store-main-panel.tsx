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
      <div className="flex items-center gap-4">
        <Link
          href="/admin/stores"
          className="hover:opacity-80 transition-opacity duration-300 h-10 w-10 flex items-center justify-center"
        >
          <SvgColor src="/assets/icons/ic_goback.svg" className="w-10 h-10 text-[#949494]" />
        </Link>
        <p className="font-sana-sans-bold text-[36px] text-black">Détails Magasin</p>
      </div>

      <div className="px-10 py-6 bg-white rounded-[20px] w-full flex items-center justify-between my-5.5">
        <div className="flex flex-col gap-6">
          <CardItem label="Nom du magasin" value="Angré Djibi 1" />
          <CardItem label="Localisation" value="Abidjan, Cocody" />
        </div>

        <div className="flex flex-col gap-6">
          <CardItem label="Manager" value="Emmanuel GUIEBI" />
          <CardItem label="Responsable Caisse" value="Ismael DIOMANDE" />
        </div>

        <div className="flex flex-col gap-6">
          <CardItem label="Nombre de Caissiers" value="07" />
          <CardItem label="Nombre de Transaction" value="1253" />
        </div>

        <div>
          <StoreStatisticsChart />
        </div>
      </div>

      <div className="py-6.5 bg-white rounded-[20px]">
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


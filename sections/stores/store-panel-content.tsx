import { cn } from "@/lib/utils"
import SvgColor from "@/components/svg-color"
import { Button } from "@/components/ui/button"
import { IconButton } from "@/components/ui/icon-button"
import { Timeline, type TimelineItemType } from "@/components/ui/timeline"

type StorePanelContentProps = {
  caissierId?: string | null
  onClose: () => void
}

export default function StorePanelContent({ caissierId, onClose }: StorePanelContentProps) {
  console.warn('caissierId', caissierId)
  return (
    <div className="flex flex-col justify-start gap-4 max-w-[386px] bg-white rounded-[20px] h-full">
      <div>
        <div className="flex items-center justify-between py-6 px-7">
          <p className="font-sana-sans-bold text-[20px]">OwenJaphet01</p>
          <IconButton
            label="Fermer"
            onClick={onClose}
          >
            <SvgColor src="/assets/icons/ic_close.svg" className="w-7 h-7 text-[#949494]" />
          </IconButton>
        </div>
        <Separator />
      </div>


      <div>
        <div className="flex flex-col gap-4 p-6 py-8">
          <p className="font-sana-sans-bold text-[20px]">Historique magasin</p>
        </div>

        <Timeline items={TIMELINE_ITEMS} />
      </div>

      <div>

        <Separator />

        <div className="flex flex-col gap-5.5 p-6 py-7.5">
          <p className="font-sana-sans-bold text-[20px]">Dernières transactions</p>

          <div className="flex flex-col gap-3.5">
            {DATA_TRANSACTIONS.map((transaction) => (
              <div className="flex items-center justify-between">
                <p className="font-sana-sans-bold text-lg ">{transaction.type_transaction} </p>
                <p className="font-sana-sans-medium text-base">{transaction.montant}</p>
              </div>
            ))}
          </div>

        </div>



        <Button
          size="medium"
          variant="secondary"
          className="flex flex-col items-center justify-center rounded-[22px] h-[30px] px-0 mx-auto w-[175px] mt-4"
        >
          <span className="font-sana-sans-bold text-sm text-[#444444]">Toutes les transactions</span>
        </Button>
      </div>

    </div>
  )
}


const Separator = () => {
  return (
    <div className="w-full h-px bg-[#949494]" />
  )
}

const DATA_TRANSACTIONS = [
  {
    id: 1,
    type_transaction: 'Paiement course',
    montant: '+2500 FCFA',
  },
  {
    id: 2,
    type_transaction: 'Rendu monnaie',
    montant: '-500 FCFA',
  },
  {
    id: 3,
    type_transaction: 'Paiement course',
    montant: '+2500 FCFA',
  },
  {
    id: 4,
    type_transaction: 'Rendu monnaie',
    montant: '-500 FCFA',
  }
]

const TIMELINE_ITEMS: TimelineItemType[] = [
  {
    id: '1',
    title: 'Zone 4, Abidjan',
    description: 'Depuis le 20/01/2025',
    actionLabel: "Voir l'article",
    onAction: (item) => console.log('Action timeline:', item.id),
    highlight: true,
  },
  {
    id: '2',
    title: "Angré 8e Tranche",
    description: 'Du 18/04/2024 au 30/08/2025',
    actionLabel: "Voir l'article",
    onAction: (item) => console.log('Action timeline:', item.id),
    highlight: true,
  },
  {
    id: '3',
    title: "II Plateaux Latrille",
    description: 'Du 18/04/2024 au 30/08/2025',
    actionLabel: "Voir l'article",
    onAction: (item) => console.log('Action timeline:', item.id),
    highlight: true,
  },
]


import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Image from 'next/image'

const items = [
  { id: '1', type_transaction: 'Paiement course', magasin: 'Angré Djibi 1', montant: '+220 FCFA', client: '+225 07 08 06 05 04', date: '20/01/2025, 10:20' },
  { id: '2', type_transaction: 'Paiement course', magasin: 'Angre Djibi 1', montant: '+220 FCFA', client: '+225 07 08 06 05 04', date: '20/01/2025, 10:20' },
  { id: '3', type_transaction: 'Paiement course', magasin: 'Angre Djibi 1', montant: '+220 FCFA', client: '+225 07 08 06 05 04', date: '20/01/2025, 10:20' },
  { id: '4', type_transaction: 'Paiement course', magasin: 'Angre Djibi 1', montant: '+220 FCFA', client: '+225 07 08 06 05 04', date: '20/01/2025, 10:20' },
  { id: '5', type_transaction: 'Paiement course', magasin: 'Angre Djibi 1', montant: '+220 FCFA', client: '+225 07 08 06 05 04', date: '20/01/2025, 10:20' },
  { id: '6', type_transaction: 'Paiement course', magasin: 'Angre Djibi 1', montant: '+220 FCFA', client: '+225 07 08 06 05 04', date: '20/01/2025, 10:20' },
  { id: '7', type_transaction: 'Paiement course', magasin: 'Angre Djibi 1', montant: '+220 FCFA', client: '+225 07 08 06 05 04', date: '20/01/2025, 10:20' }
]

function RecentTransactions() {
  return (
    <div className="bg-white rounded-2xl sm:rounded-[32px] lg:rounded-[40px] min-w-0 w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 px-4 sm:py-5.5 sm:px-6 lg:px-8">
        <p className="font-sana-sans-bold text-xl sm:text-[28px] text-[#444444]">Transactions récentes</p>
        <div className="shrink-0">
          <Button variant="outline" size="medium" className="flex flex-col items-center justify-center rounded-[10px]">
            <Link href="/admin/dashboard/transactions" className="font-sana-sans-bold text-base sm:text-[18px] text-primary">Toutes les transactions &gt;</Link>
          </Button>
        </div>
      </div>

      <div className="pb-6 sm:pb-10 overflow-x-auto px-4 sm:px-0">
        <Table className="w-full min-w-[600px] sm:min-w-0">
          <TableHeader className="bg-[#F6F6F6]">
            <TableRow className="h-[30px]">
              {DATA_HEADER.map((header) => (
                <TableHead key={header.key} className="font-sana-sans-medium text-[#666666] pl-4 sm:pl-8 text-xs sm:text-sm">{header.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-sana-sans-bold text-sm sm:text-lg pl-4 sm:pl-8">{item.type_transaction}</TableCell>
                <TableCell className="font-sana-sans-medium text-sm pl-4 sm:pl-8">{item.magasin}</TableCell>
                <TableCell className="font-sana-sans-medium text-sm pl-4 sm:pl-8">{item.montant}</TableCell>
                <TableCell className="font-sana-sans-medium text-sm pl-4 sm:pl-8">{item.client}</TableCell>
                <TableCell className="font-sana-sans-medium text-xs sm:text-base pl-4 sm:pl-8">{item.date}</TableCell>
                <TableCell className="font-sana-sans-medium pl-4 sm:pl-8">
                    <button className="w-[28px] h-[28px] rounded-[10px] flex items-center justify-center hover:bg-[#F2F2F2] transition-colors duration-300 cursor-pointer">
                        <Image src="/assets/icons/ic_list.svg" alt="eye" width={12} height={10} />
                    </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default RecentTransactions

const DATA_HEADER = [
  { label: 'Type de transaction', key: 'type_transaction' },
  { label: 'Magasin', key: 'magasin' },
  { label: 'Montant', key: 'montant' },
  { label: 'Client', key: 'client' },
  { label: 'Date', key: 'date' },
  { label: '', key: 'Actions' },
] as const 

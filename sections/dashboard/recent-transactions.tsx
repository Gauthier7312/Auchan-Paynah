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
    <div className='bg-white rounded-[40px] min-w-[933px]'>
      <div className="flex items-center justify-between py-5.5 px-8">
        <p className="font-sana-sans-bold text-[28px] text-[#444444]">Transactions récentes</p>
        <div>
          <Button variant="outline" size="medium" className="flex flex-col items-center justify-center rounded-[10px]">
            <Link href="/admin/dashboard/transactions" className="font-sana-sans-bold text-[18px] text-primary">Toutes les transactions &gt;</Link>
          </Button>
        </div>
      </div>

      <div className=" pb-10">
        <Table className="w-full">
          <TableHeader className=" bg-[#F6F6F6] ">
            <TableRow className="h-[30px]">
              {DATA_HEADER.map((header) => (
                <TableHead key={header.key} className="font-sana-sans-medium text-[#666666] pl-8 text-sm">{header.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-sana-sans-bold text-lg pl-8">{item.type_transaction}</TableCell>
                <TableCell className="font-sana-sans-medium pl-8">{item.magasin}</TableCell>
                <TableCell className="font-sana-sans-medium pl-8">{item.montant}</TableCell>
                <TableCell className="font-sana-sans-medium pl-8">{item.client}</TableCell>
                <TableCell className="font-sana-sans-medium pl-8">{item.date}</TableCell>
                <TableCell className="font-sana-sans-medium pl-8">
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

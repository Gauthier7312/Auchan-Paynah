import { StoreDetailContent } from '@/sections/stores'

type Props = {
  params: Promise<{ id: string }>
}

export default async function StoreDetailPage({ params }: Props) {
  const { id } = await params

  return (
    <section className="max-w-[1370px] mx-auto mt-8.5">
      <StoreDetailContent storeId={id} />
    </section>
  )
}

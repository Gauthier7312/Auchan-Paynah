import { StoreDetailContent } from '@/sections/stores'

type Props = {
  params: Promise<{ id: string }>
}

export default async function StoreDetailPage({ params }: Props) {
  const { id } = await params

  return (
    <section className="w-full max-w-[1370px] mx-auto mt-6 sm:mt-8.5 px-2 sm:px-4 lg:px-0">
      <StoreDetailContent storeId={id} />
    </section>
  )
}

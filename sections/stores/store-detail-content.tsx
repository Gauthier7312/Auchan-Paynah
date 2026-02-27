'use client'

import { useStoreSelectedCaissierId } from './store-detail-search'
import { cn } from '@/lib/utils'
import StorePanelContent from './store-panel-content'
import { StoreMainPanel } from './store-main-panel'

type StoreDetailContentProps = {
  storeId: string
}

export default function StoreDetailContent({ storeId }: StoreDetailContentProps) {
  const [selectedCaissierId, setSelectedCaissierId] = useStoreSelectedCaissierId()
  const isRightOpen = selectedCaissierId !== null && selectedCaissierId !== undefined

  const handleCloseRightPanel = () => {
    setSelectedCaissierId(null)
  }

  console.warn('storeId', storeId)

  return (
    <>
      <div
        className={cn(
          'grid gap-4 transition-[grid-template-columns] duration-300',
          isRightOpen ? 'grid-cols-1 lg:grid-cols-[1fr_378px]' : 'grid-cols-1'
        )}
      >
        <StoreMainPanel />

        {isRightOpen && (
          <>
            <div
              className="hidden lg:block min-w-0 w-full  animate-panel-fade-in"
            >
              <StorePanelContent
                caissierId={selectedCaissierId}
                onClose={handleCloseRightPanel}
              />
            </div>

            <div className="lg:hidden fixed inset-0 z-50">
              <div
                className="absolute inset-0 bg-black/40 animate-overlay-fade-in"
                onClick={handleCloseRightPanel}
                aria-hidden
              />
              <div
                className="absolute top-0 right-0 bottom-0 w-[min(100%,386px)] h-full overflow-auto animate-panel-fade-in"
                role="dialog"
                aria-label="OwenJaphet01"
              >
                <StorePanelContent
                  caissierId={selectedCaissierId}
                  onClose={handleCloseRightPanel}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

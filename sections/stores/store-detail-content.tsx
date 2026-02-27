'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import StorePanelContent from './store-panel-content'
import { StoreMainPanel } from './store-main-panel'

type StoreDetailContentProps = {
  storeId: string
}

export default function StoreDetailContent({ storeId }: StoreDetailContentProps) {
  const [isRightOpen, setRightOpen] = useState(false)

  const handleCloseRightPanel = () => {
    setRightOpen(false)
  }

  const handleOpenRightPanel = () => {
    setRightOpen(true)
  }

  return (
    <>
      <div
        className={cn(
          'grid gap-4 transition-[grid-template-columns] duration-300',
          isRightOpen ? 'grid-cols-1 lg:grid-cols-[1fr_386px]' : 'grid-cols-1'
        )}
      >
        <StoreMainPanel onOpenRightPanel={handleOpenRightPanel} />

        {isRightOpen && (
          <>
            <div
              className="hidden lg:block min-w-0 w-full max-w-[386px] bg-white rounded-[40px] p-6 animate-panel-fade-in"
            >
              <StorePanelContent title="Panneau droit" onClose={handleCloseRightPanel} />
            </div>

            <div className="lg:hidden fixed inset-0 z-50">
              <div
                className="absolute inset-0 bg-black/40 animate-overlay-fade-in"
                onClick={handleCloseRightPanel}
                aria-hidden
              />
              <div
                className="absolute top-0 right-0 bottom-0 w-[min(100%,386px)] bg-white rounded-l-[40px] p-6 shadow-lg overflow-auto animate-panel-fade-in"
                role="dialog"
                aria-label="Panneau droit"
              >
                <StorePanelContent title="Panneau droit" onClose={handleCloseRightPanel} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

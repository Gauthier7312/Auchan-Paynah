type StorePanelContentProps = {
  title: string
  onClose: () => void
}

export default function StorePanelContent({ title, onClose }: StorePanelContentProps) {
  return (
    <div className="flex items-center justify-between">
      <p className="font-sana-sans-bold text-[20px] text-[#444444]">{title}</p>
      <button
        type="button"
        onClick={onClose}
        className="text-[#949494] hover:text-[#444444] p-1"
        aria-label="Fermer"
      >
        ✕
      </button>
    </div>
  )
}

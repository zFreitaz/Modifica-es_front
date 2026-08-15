import { X } from "lucide-react"

interface ModalProps{
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
}

export default function ModalTurma({isOpen, onClose, children}: ModalProps) {
    if(!isOpen) return null

    return(
        <div className="modalOverlayTurma">
          <div className="modalContentTurma" onClick={(e) => e.stopPropagation()}>

            <button className="closeButton" onClick={onClose}>
              <X  size={24}/>
            </button>
            {children}
          </div>
        </div>
    )
}
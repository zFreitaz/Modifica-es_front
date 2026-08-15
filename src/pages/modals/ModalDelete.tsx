import { X } from "lucide-react"
import React from "react"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    icon: React.ReactNode
    title: string
    decision1: React.ReactNode
    decision2: React.ReactNode
}

export default function ModalDelete({
    isOpen,
    onClose,
    icon,
    title,
    decision1,
    decision2,
    onConfirm,
}: ModalProps) {
    if (!isOpen) return null

    return (
        <div className="modalOverlayDelete">
            <div className="modalContentDelete" onClick={(e) => e.stopPropagation()}>

                <button className="closeButtonDelete" onClick={onClose}>
                    <X size={28} />
                </button>

                <div className="modalDeleteInformation">
                    <div className="modalIcon">
                        {icon}
                    </div>

                    <div className="modalDados">
                        <h3 className="modalText">
                            {title}
                        </h3>

                        <div className="modalDecision">
                            <button className="buttonDecision1" onClick={onConfirm}>
                                {decision1}
                            </button>

                            <button className="buttonDecision2" onClick={onClose}>
                                {decision2}
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
import { X } from "lucide-react"
import React from "react"
import { useState, useEffect } from "react"
import Input from "../../components/escola/input"

interface ModalProps{
    dados?: any
    isOpen: boolean
    onClose: () => void
    onAddEvent: (description: string, date: string) => void 
}

export default function ModalEvents({
  dados,
  isOpen, 
  onClose,
  onAddEvent
}: ModalProps) {
    const [date, setDate] = useState(dados?.date || "")
    const [description, setDescription] = useState(dados?.description || "")
    
    useEffect(() => {
        if (dados) {
            setDate(dados.date || "")
            setDescription(dados.description || "")
                    
        }
    }, [dados])

    function handleSubmit(e: React.FormEvent){
        e.preventDefault()

        onAddEvent(description, date)   
        setDescription("")
        setDate("")
        onClose()
    }

    if(!isOpen) return null

    return(
        <div className="modalOverlayEvents">
          <div className="modalContentEvents" onClick={(e) => e.stopPropagation()}>

            <button className="closeButtonEvents" onClick={onClose}>
              <X  size={28}/>
            </button>

            <form onSubmit={handleSubmit} className="modalEventsInformation">
                <h2 className="modalEventsTitle">
                    Adicione um novo evento a sua lista!
                </h2>

                <div className="modalEventsDados">
                    <Input
                        id="data"
                        label="Data"
                        type="date"
                        placeholder="Data do Evento"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}                    
                    />
                    <Input
                        id="descricao"
                        label="Descrição"
                        type="text"
                        placeholder="Deixe uma breve descrição"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}                    
                    />
                </div>

                <button type="submit" className="buttonEvents">
                    Salvar
                </button>

            </form>
            
          </div>
        </div>
    )
}
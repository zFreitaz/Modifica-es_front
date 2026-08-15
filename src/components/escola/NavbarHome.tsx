import { Settings2, Search } from "lucide-react"
import Button from "./button"
import UserInfo from "./UserInfo"

type NavBarHomeProps = {
    onSearchChange: (value: string) => void
    searchPlaceholder?: string
    buttonLabel: string
    onButtonClickc: () => void

    nome: string
    foto: string
    notificacoes: number
    onButtonClick: () => void
}


export default function NavbarHome({
    onSearchChange,
    searchPlaceholder = "Filtrar",
    buttonLabel,
    onButtonClickc,
    nome,
    foto,
    notificacoes,
    onButtonClick
}: NavBarHomeProps){
    
    return(
        <div className="NavBarCompleta">
                <div className="searchAction">
                    <div className="buscaBox">
                        <Search size={18} className="buscaIcon" />
                        <input
                        type="text"
                        // value={searchValue}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder={searchPlaceholder}
                        className="buscaInput"
                        />
                    </div>

                    <Button
                        type="button"
                        onClick={onButtonClickc}
                        className="buttonFilter"
                    >
                        <Settings2 size={20} className="buscaFilter" />
                        <span>{buttonLabel}</span>
                    </Button>
                </div>

                <UserInfo
                    nome={nome}
                    foto={foto}
                    notificacoes={notificacoes}
                    onButtonClick={onButtonClick}
                />
                
        </div>
    )
}
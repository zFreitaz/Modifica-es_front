import { Bell } from "lucide-react";

interface UserInfoProps{
    nome: string
    foto: string
    notificacoes: number
    onButtonClick: () => void
}

export default function UserInfo({
    nome,
    foto,
    notificacoes,
    onButtonClick
}: UserInfoProps){
    return(
        <div className="userInfo">
                    <div 
                    className="bellWrapper"
                    onClick={onButtonClick}
                    >
                        <Bell size={26} className="bellInfo"/>

                        {notificacoes > 0 && (
                            <div className="badge">
                                {notificacoes > 99 ? "+99" : notificacoes}
                            </div>
                        )}
                    </div>

                    <p className="textUser">Olá, {nome}!</p>

                    <img src={foto} alt="avatar" className="avatarUser" />
                    
        </div>
    )
}
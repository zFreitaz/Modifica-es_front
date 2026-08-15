import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, House, Book, GraduationCap, Users, LogOut } from "lucide-react";

type NavLateralProps = {
    aberta: boolean;
    setAberta: React.Dispatch<React.SetStateAction<boolean>>;
}


export default function NavLateral({
    aberta, setAberta
} : NavLateralProps){

    const itens = [
        {icone: <House size={28}/>, texto: "Home", rota:"/home"},
        {icone: <Book size={28}/>, texto: "Professores", rota:"/professores"},
        {icone: <GraduationCap size={28}/>, texto: "Alunos", rota:"/alunos"},
        {icone: <Users size={28}/>, texto: "Turmas", rota:"/turmas"}
    ]

    return(
        <aside className={`navLateral ${aberta ? "aberta" : "fechada"}`}>

            <button
                className="menuButton"
                onClick={() => setAberta(!aberta)}
                type="button"
            >
                <Menu size={30}/>
            </button>

            <nav className="navConteudo">
                {itens.map((item) => (
                    <Link to={item.rota} className="navItem" key={item.texto}>
                        <span className="navIcone">{item.icone}</span>
                        {aberta && <span className="navTexto">{item.texto}</span>}
                    </Link>
                ))}
            </nav>

            <Link to="/" className="navItem sair">
                <span className="navIcone">
                    <LogOut size={28} />
                </span>
                {aberta && <span className="navTexto">Sair</span>}
            </Link>
        </aside>
    )

}

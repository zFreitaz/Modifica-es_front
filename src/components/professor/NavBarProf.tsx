    import { useState } from "react";
    import { Link } from "react-router-dom";
    import { Menu, House, LibraryBig, LogOut } from "lucide-react";

    type NavLateralProps = {
        aberta: boolean;
        setAberta: React.Dispatch<React.SetStateAction<boolean>>;
    }


    export default function NavBarProf({
        aberta, setAberta
    } : NavLateralProps){

        const itens = [
            {icone: <House size={28}/>, texto: "Home", rota:"/professor/home"},
            {icone: <LibraryBig size={28}/>, texto: "Atividades", rota:"/professores/atividades"}
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

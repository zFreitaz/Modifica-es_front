import { useState } from "react";
import NavBarProf from "../../professor/NavBarProf";

type LayoutProps = {
    children: React.ReactNode
}

export default function LayoutBaseProf({children}: LayoutProps){
    const [aberta, setAberta] = useState(false)

    return(
        <div className="layoutTela">
            <NavBarProf aberta={aberta} setAberta={setAberta} />

            <main className={`conteudoPrincipal ${aberta ? "expandido" : "recolhido"}`}>
                {children}
            </main>
        </div>
    )
}
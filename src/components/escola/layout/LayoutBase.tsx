import { useState } from "react";
import NavLateral from "../NavLateral";

type LayoutProps = {
    children: React.ReactNode
}

export default function LayoutBase({children}: LayoutProps){
    const [aberta, setAberta] = useState(false)

    return(
        <div className="layoutTela">
            <NavLateral aberta={aberta} setAberta={setAberta} />

            <main className={`conteudoPrincipal ${aberta ? "expandido" : "recolhido"}`}>
                {children}
            </main>
        </div>
    )
}
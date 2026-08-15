import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import Login from "./pages/Login"
import Cadastro from "./pages/Cadastro"
import Home from "./pages/pagesEscola/Home"
import Professores from "./pages/pagesEscola/Professores"
import Alunos from "./pages/pagesEscola/Alunos"
import Turmas from "./pages/pagesEscola/Turmas"
import HomeProfessor from "./pages/professor/HomeProfessor"
import AtividadesProfessores from "./pages/professor/AtividadesProfessor"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/professores" element={<Professores />} />
        <Route path="/alunos" element={<Alunos />} />
        <Route path="/turmas" element={<Turmas />} />
        <Route path="professor/home" element={<HomeProfessor />} />
        <Route path="professores/atividades" element={<AtividadesProfessores />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
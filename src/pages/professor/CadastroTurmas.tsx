import { useState } from "react";
import LayoutBaseProf from "../../components/calendar/layout/LayoutBaseProf";
import InfoHeader from "../../components/escola/InfoHeader";
import SearchActionBar from "../../components/escola/SearchActionBar";
import { useNavigate } from "react-router-dom";

interface TurmaItem {
  id: number;
  nome: string;
  alunos: number;
  pendentes: number | null;
  progresso: number;
}

const turmasMock: TurmaItem[] = [
  { id: 1, nome: "3º ano A", alunos: 10, pendentes: 3, progresso: 70 },
  { id: 2, nome: "2º ano B", alunos: 9, pendentes: null, progresso: 90 },
  { id: 3, nome: "3º ano C", alunos: 12, pendentes: 6, progresso: 50 },
  { id: 4, nome: "1º ano A", alunos: 11, pendentes: 1, progresso: 77 },
  { id: 5, nome: "1º ano B", alunos: 7, pendentes: 2, progresso: 68 },
  { id: 6, nome: "2º ano C", alunos: 8, pendentes: null, progresso: 98 },
];

export default function CadastroTurmas() {
 
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [turmas, setTurmas] = useState<TurmaItem[]>(turmasMock);

  // Filtro de turmas por nome em tempo real
  const turmasFiltradas = turmas.filter((t) =>
    t.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <LayoutBaseProf>
      {/* 1. Cabeçalho */}
      <InfoHeader
        icon={
          <div className="text-brand-teal">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9Z"/>
              <path d="M7 13.5V16.5C7 18.5 9 20 12 20C15 20 17 18.5 17 16.5V13.5L12 16L7 13.5Z" opacity="0.6"/>
            </svg>
          </div>
        }
        title="Turmas"
        subtitle="Acompanhe suas turmas, alunos e atividades pendentes de correção"
      />

      {/* 2. Barra de Busca e Botão de Nova Turma */}
      <SearchActionBar
        searchValue={busca}
        onSearchChange={setBusca}
        searchPlaceholder="Buscar"
        buttonLabel="Nova turma"
        onButtonClick={() => alert("Abrir modal de cadastro de turma")}
      />
    </LayoutBaseProf>
  );
}
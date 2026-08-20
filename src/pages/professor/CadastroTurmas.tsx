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

      {/* Tabela de Turmas */}
      <div className="tableContainer !max-h-none !overflow-hidden">
        <table className="customTable">
          <thead>
            <tr>
              <th className="w-[26%] !py-3.5">Turma</th>
              <th className="text-center w-[12%] !py-3.5">Alunos</th>
              <th className="text-center w-[14%] !py-3.5">Pendentes</th>
              <th className="text-center w-[30%] !py-3.5">Progresso</th>
              <th className="text-center w-[18%] !py-3.5">Ações</th>
            </tr>
          </thead>
          <tbody>
            {turmasFiltradas.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-neutral-400 text-sm">
                  Nenhuma turma encontrada.
                </td>
              </tr>
            ) : (
              turmasFiltradas.map((turma) => (
                <tr key={turma.id} className="hover:bg-neutral-50/40 transition-colors">

                  {/* Coluna 1: Nome da Turma + Ícone */}
                  <td className="!py-2.5">
                    <div className="cellNone">
                      <div className="w-[38px] h-[38px] rounded-full bg-[#FFD8C9] flex intem-center justify-center text-brand-teal shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"></svg>
                        <path d="M12 3L2 8L12 13L22 8L12 3Z"/>
                        <path d="M5 11.5V15.5C5 17.5 8 19 12 19C16 19 19 17.5 19 15.5V11.5L12 15L5 11.5Z"/>
                      </div>
                    </div>
                    <span className="font-semibold text-neutral-800 text-sm">
                      {turma.nome}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </LayoutBaseProf>
  );
}
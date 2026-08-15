import { useState, useEffect } from "react"
import { Pencil, ThumbsDown, ThumbsUp, Trash2, Users } from "lucide-react"
import InfoHeader from "../../components/escola/InfoHeader"
import LayoutBase from "../../components/escola/layout/LayoutBase"
import SearchActionBar from "../../components/escola/SearchActionBar"
import Table from "../../components/escola/TableInformations"
import ModalTurma from "../modals/ModalTurmas"
import FormTurma from "../../components/escola/FormTurma"
import ModalDelete from "../modals/ModalDelete"
import { api } from "../../services/api"

type Turma = {
  _id: string;
  nome: string;
  professorId?: { 
    _id: string; 
    nome: string; 
    sobrenome: string; 
  };
  qtdAlunos: number;
};

function Turmas() {
  const [turmas, setTurmas] = useState<Turma[]>([])
  const [busca, setBusca] = useState("")
  const [modalAberto, setModalAberto] = useState(false)
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false)
  const [turmaSelecionada, setTurmaSelecionada] = useState<Turma | null>(null)

  const carregarTurmas = async () => {
    try {
      const response = await api.get("/turmas");
      setTurmas(response.data);
    } catch (error) {
      console.error("Erro ao carregar turmas:", error);
    }
  };

  useEffect(() => {
    carregarTurmas();
  }, [])

  const turmasFiltradas = turmas.filter((t) =>
    t.nome.toLowerCase().includes(busca.toLowerCase()) ||
    (t.professorId?.nome || "").toLowerCase().includes(busca.toLowerCase())
  )

  async function handleDeletar() {
    if (!turmaSelecionada) return

    setTurmas((prev) => prev.filter((t) => t._id !== turmaSelecionada._id))
    setModalDeleteOpen(false)

    try {
      await api.delete(`/turmas/${turmaSelecionada._id}`)
    } catch (err) {
      console.error("Erro ao deletar:", err)
      carregarTurmas()
    }
  }

  function handleSalvo() {
    setModalAberto(false)
    carregarTurmas()
  }

  const columns = [
    {
      header: "Turma",
      accessor: "nome",
      render: (row: Turma) => (
        <div className="cellNome">
          <div className="iconeTurma"><Users size={18}/></div>
          <span>{row.nome}</span>
        </div>
      ),
    },
    {
      header: "Professor Responsável",
      accessor: "professor",
      render: (row: Turma) => (
        <span className="cellProf">
          {row.professorId 
            ? `${row.professorId.nome} ${row.professorId.sobrenome}` 
            : "Não atribuído"}
        </span>
      ),
    },
    {
      header: "Alunos",
      accessor: "totalAlunos", 
      render: (row: any) => (
        <span className="alunoBadge">
          {row.totalAlunos || 0}
        </span>
      ),
    },
    {
      header: "Ações",
      accessor: "acoes",
      render: (row: Turma) => (
        <div className="acoesCell">
          <button
            type="button"
            onClick={() => {
              setTurmaSelecionada(row)
              setModalDeleteOpen(true)
            }}>
            <Trash2 size={20} />
          </button>

          <button
            type="button"
            onClick={() => {
              setTurmaSelecionada(row)
              setModalAberto(true)
            }}
          >
            <Pencil size={20} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <LayoutBase>
      <InfoHeader
        icon={<Users size={26}/>}
        title="Turmas"
        subtitle="Organizar turmas e distribuição de alunos"
      />

      <SearchActionBar
        searchValue={busca}
        onSearchChange={setBusca}
        searchPlaceholder="Buscar Turma"
        buttonLabel="Nova Turma"
        onButtonClick={() => {
          setTurmaSelecionada(null)
          setModalAberto(true)
        }}
      />

      <Table columns={columns} data={turmasFiltradas} />

      <ModalTurma isOpen={modalAberto} onClose={() => setModalAberto(false)}>
        <div className="logoTurma"><Users size={24}/></div>
        <FormTurma
          dados={turmaSelecionada}
          onClose={() => setModalAberto(false)}
          onSalvo={handleSalvo}
        />
      </ModalTurma>

      <ModalDelete
        isOpen={modalDeleteOpen}
        onClose={() => setModalDeleteOpen(false)}
        icon={<Users size={30} />}
        title={`Deseja excluir a turma ${turmaSelecionada?.nome}?`}
        decision1={<ThumbsUp size={22}/>}
        decision2={<ThumbsDown size={22} />}
        onConfirm={handleDeletar}
      />
    </LayoutBase>
  )
}

export default Turmas
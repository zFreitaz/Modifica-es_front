import { useState, useEffect } from "react"
import { Pencil, Trash2, GraduationCap, ThumbsUp, ThumbsDown, FileText } from "lucide-react"
import InfoHeader from "../../components/escola/InfoHeader"
import LayoutBase from "../../components/escola/layout/LayoutBase"
import SearchActionBar from "../../components/escola/SearchActionBar"
import Table from "../../components/escola/TableInformations"
import ModalAluno from "../modals/ModalAluno"
import FormAlunos from "../../components/escola/FormAluno"
import ModalDelete from "../modals/ModalDelete"
import { api } from "../../services/api"

type Aluno = {
  _id: string;
  nome: string;
  urlFotoAluno?: string;
  urlFotoLaudo?: string;
  turmaId?: { _id: string; nome: string }; 
  nomeResponsavel: string;
  usuarioId?: { email: string };
};

function Alunos() {
  const [alunos, setAlunos] = useState<Aluno[]>([])
  const [busca, setBusca] = useState("")
  const [modalAberto, setModalAberto] = useState(false)
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false)
  const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null)

  const carregarAlunos = async () => {
    try {
      const response = await api.get("/alunos");
      setAlunos(response.data);
    } catch (error) {
      console.error("Erro ao carregar alunos:", error);
    }
  };

  useEffect(() => {
    carregarAlunos();
  }, [])

  const alunosFiltrados = alunos.filter((a) => {
    const termoBusca = busca.toLowerCase();
    
    const matchesNome = a.nome.toLowerCase().includes(termoBusca);
    
    const matchesEmail = (a.usuarioId?.email || "").toLowerCase().includes(termoBusca);
    
    const matchesTurma = (a.turmaId?.nome || "").toLowerCase().includes(termoBusca);

    return matchesNome || matchesEmail || matchesTurma;
  });

  async function handleDeletar() {
    if (!alunoSelecionado) return

    setAlunos((prev) => prev.filter((a) => a._id !== alunoSelecionado._id))
    setModalDeleteOpen(false)

    try {
      await api.delete(`/alunos/${alunoSelecionado._id}`)
    } catch (err) {
      console.error(err)
      carregarAlunos()
    }
  }

  function handleSalvo() {
    setModalAberto(false)
    carregarAlunos()
  }

  const columns = [
    {
      header: "Aluno",
      accessor: "nome",
      render: (row: Aluno) => (
        <div className="cellNome">
          <img 
            src={row.urlFotoAluno || "https://via.placeholder.com/40"} 
            alt={row.nome} 
            className="fotoPessoa" 
            style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <span>{row.nome}</span>
        </div>
      ),
    },
    {
      header: "E-mail",
      accessor: "email",
      render: (row: Aluno) => (
        <span className="emailBadge">{row.usuarioId?.email || "Sem e-mail"}</span>
      ),
    },
    {
      header: "Turma",
      accessor: "turmaId",
      render: (row: Aluno) => (
        <span className="turmaBadge">
          {row.turmaId?.nome || "-"}
        </span>
      ),
    },
    {
      header: "Laudo",
      accessor: "laudo",
      render: (row: Aluno) => (
        row.urlFotoLaudo ? (
          <a href={row.urlFotoLaudo} target="_blank" rel="noopener noreferrer" style={{ color: '#4A90E2', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <FileText size={18} /> Visualizar
          </a>
        ) : (
          <span style={{ color: '#aaa', fontSize: '12px' }}>Pendente</span>
        )
      ),
    },
    {
      header: "Responsável",
      accessor: "nomeResponsavel",
      render: (row: Aluno) => <span className="cellResponsavel">{row.nomeResponsavel}</span>,
    },
    {
      header: "Ações",
      accessor: "acoes",
      render: (row: Aluno) => (
        <div className="acoesCell">
          <button type="button" onClick={() => { setAlunoSelecionado(row); setModalDeleteOpen(true); }}>
            <Trash2 size={20} />
          </button>
          <button type="button" onClick={() => { setAlunoSelecionado(row); setModalAberto(true); }}>
            <Pencil size={20} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <LayoutBase>

      <InfoHeader
        icon={<GraduationCap size={26}/>}
        title="Alunos"
        subtitle="Gerenciar dados de alunos"
      />

      <SearchActionBar
        searchValue={busca}
        onSearchChange={setBusca}
        searchPlaceholder="Buscar Aluno"
        buttonLabel="Novo Aluno"
        onButtonClick={() => {
          setAlunoSelecionado(null)
          setModalAberto(true)
        }}
      />

      <Table columns={columns} data={alunosFiltrados} />

      <ModalAluno
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
      >
        <div className="logoAluno">
          <GraduationCap size={24}/>
        </div>
        <FormAlunos
          dados={alunoSelecionado}
          onClose={() => setModalAberto(false)}
          onSalvo={handleSalvo}
        />
      </ModalAluno>

      <ModalDelete
        isOpen={modalDeleteOpen}
        onClose={() => setModalDeleteOpen(false)}
        icon={<GraduationCap size={28} />}
        title={`Deseja excluir o aluno ${alunoSelecionado?.nome}?`}
        decision1={<ThumbsUp size={22}/>}
        decision2={<ThumbsDown size={22} />}
        onConfirm={handleDeletar}
      />

    </LayoutBase>
  )
}

export default Alunos
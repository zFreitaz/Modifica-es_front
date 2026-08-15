import { useState, useEffect } from "react"
import { Pencil, Trash2, Book, ThumbsUp, ThumbsDown } from "lucide-react"
import InfoHeader from "../../components/escola/InfoHeader"
import LayoutBase from "../../components/escola/layout/LayoutBase"
import SearchActionBar from "../../components/escola/SearchActionBar"
import Table from "../../components/escola/TableInformations"
import ModalProf from "../modals/ModalProf"
import FormProfessores from "../../components/escola/FormProfessor"
import ModalDelete from "../modals/ModalDelete"
import { api } from "../../services/api" 

type Professor = {
  _id: string; 
  nome: string;
  sobrenome: string;
  email: string;
  urlFotoProfessor: string; 
};

function Professores() {
  const [professores, setProfessores] = useState<Professor[]>([])
  const [busca, setBusca] = useState("")
  const [modalAberto, setModalAberto] = useState(false)
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false)
  const [professorSelecionado, setProfessorSelecionado] = useState<Professor | null>(null)

  const carregarProfessores = async () => {
    try {
      const response = await api.get("/professores");
      setProfessores(response.data);
    } catch (error) {
      console.error("Erro ao carregar professores:", error);
    }
  };

  useEffect(() => {
    carregarProfessores();
  }, [])


  const professoresFiltrados = professores.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase()) ||
    p.email.toLowerCase().includes(busca.toLowerCase())
  )

  async function handleDeletar() {
    if (!professorSelecionado) return

    setProfessores((prev) => prev.filter((p) => p._id !== professorSelecionado._id))
    setModalDeleteOpen(false)

    try {
      await api.delete(`/professores/${professorSelecionado._id}`);

    } catch (err) {
      console.error("Erro ao deletar:", err)
      carregarProfessores();
    }
  }

  function handleSalvo() {
    setModalAberto(false)
    carregarProfessores() 
  }

  const columns = [
    {
      header: "Nome",
      accessor: "nome",
      render: (row: Professor) => (
        <div className="cellNome">

          <img 
            src={row.urlFotoProfessor || "https://via.placeholder.com/40"} 
            alt={row.nome} 
            className="fotoPessoa" 
            style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <span>{row.nome} {row.sobrenome}</span>
        </div>
      ),
    },
    {
      header: "E-mail",
      accessor: "email",
      render: (row: Professor) => (
        <span className="emailBadge">{row.email}</span>
      ),
    },
    {
      header: "Ações",
      accessor: "acoes",
      render: (row: Professor) => (
        <div className="acoesCell">
          <button
            type="button"
            onClick={() => {
              setProfessorSelecionado(row)
              setModalDeleteOpen(true)
            }}>
            <Trash2 size={20} />
          </button>

          <button
            type="button"
            onClick={() => {
              setProfessorSelecionado(row)
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
        icon={<Book size={26}/>}
        title="Professores"
        subtitle="Administrar Corpo Docente"
      />

      <SearchActionBar
        searchValue={busca}
        onSearchChange={setBusca}
        searchPlaceholder="Buscar Professor"
        buttonLabel="Novo Professor"
        onButtonClick={() => {
          setProfessorSelecionado(null)
          setModalAberto(true)
        }}
      />

      <Table columns={columns} data={professoresFiltrados} />

      <ModalProf
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
      >
        <div className="logoProf">
          <Book size={24}/>
        </div>
        <FormProfessores
          dados={professorSelecionado}
          onClose={() => setModalAberto(false)}
          onSalvo={handleSalvo}
        />
      </ModalProf>

      <ModalDelete
        isOpen={modalDeleteOpen}
        onClose={() => setModalDeleteOpen(false)}
        icon={<Book size={28} />}
        title={`Deseja excluir o professor ${professorSelecionado?.nome}?`}
        decision1={<ThumbsUp size={22}/>}
        decision2={<ThumbsDown size={22} />}
        onConfirm={handleDeletar}
      />

    </LayoutBase>
  )
}

export default Professores
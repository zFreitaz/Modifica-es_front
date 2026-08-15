import { useState, useRef, useEffect } from "react"
import { GraduationCap, Book, Users, Plus, Clock, ClipboardList, CheckCircle2, ChevronRight, BookOpen, FlaskConical, Globe, Calculator, Landmark } from "lucide-react"
import { useNavigate } from 'react-router-dom';
import NavbarHome from "../../components/escola/NavbarHome";
import foto from "../../assets/escola.jpg"
import Button from "../../components/escola/button";
import MeuCalendario from "../../components/calendar/MeuCalendario";
import EventsList from "../../components/escola/EventsInput";
import ModalEvents from "../modals/ModalEvents";
import LayoutBaseProf from "../../components/calendar/layout/LayoutBaseProf";
import { api } from "../../services/api";

interface Evento {
  description: string;
  date: string;
}

interface Turma {
  nome: string
  letra: string
  totalAlunos: number
  totalTarefas: number
  percentualConcluidas: number
  tarefasPendentes: number
}

interface Materia {
  id: number
  nome: string
  cor: string
  corTexto: string
  corBotao: string
  badge: number
  Icone: React.ElementType
}

interface UserData {
  nome?: string;
  foto?: string;
}

// Matérias com ícone são definidas no front mesmo
const MATERIAS: Materia[] = [
  { id: 1, nome: "Língua Portuguesa", cor: "#EDF6F9", corTexto: "#005A63", corBotao: "#005A63", badge: 3, Icone: BookOpen },
  { id: 2, nome: "Matemática",        cor: "#D7E1FD", corTexto: "#02136B", corBotao: "#02136B", badge: 3, Icone: Calculator },
  { id: 3, nome: "Geografia",         cor: "#FFDDD2", corTexto: "#71270F", corBotao: "#71270F", badge: 3, Icone: Globe },
  { id: 4, nome: "Ciências",          cor: "#C6FDDB", corTexto: "#013816", corBotao: "#013816", badge: 2, Icone: FlaskConical },
  { id: 5, nome: "História",          cor: "#DD8C6A", corTexto: "#3B180B", corBotao: "#3B180B", badge: 1, Icone: Landmark },
]

function Home() {
  const navigate = useNavigate()

  const [turma, setTurma] = useState<Turma>({
    nome: "2º ano",
    letra: "A",
    totalAlunos: 0,
    totalTarefas: 0,
    percentualConcluidas: 0,
    tarefasPendentes: 0,
  })

  const user: UserData = JSON.parse(localStorage.getItem("user") ?? "{}")
  const token = localStorage.getItem("token")

  const [events, setEvents] = useState<Evento[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string>("")

  useEffect(() => {
    async function fetchTurma() {
      try {
        const response = await api.get<Turma>("/professores/turma")
        setTurma(response.data)
      } catch {
        console.error("Erro ao carregar turma")
      }
    }

    async function fetchEventos() {
      try {
        const response = await fetch("https://sua-api.com/eventos", {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!response.ok) throw new Error()
        const dados = await response.json()
        setEvents(dados)
      } catch {
        console.error("Erro ao carregar eventos")
      }
    }

    fetchTurma()
    fetchEventos()
  }, [])

  const goTo = (path: string): void => { navigate(path) }

  const handleSelectDate = (date: Date) => {
    const formatted = date.toLocaleDateString('sv-SE')
    setSelectedDate(formatted)
    setModalOpen(true)
  }

  const handleAddEvent = async (description: string, date: string) => {
    const newEvent: Evento = { description, date }

    setEvents((prev) => [...prev, newEvent])

    try {
      await fetch("https://sua-api.com/eventos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEvent),
      })
    } catch {
      console.error("Erro ao salvar evento")
    }
  }

  const handleDeleteEvent = async (index: number) => {
    const eventoParaDeletar = events[index]

    setEvents(events.filter((_, i) => i !== index))

    try {
      await fetch(`https://sua-api.com/eventos/${index}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
    } catch {
      console.error("Erro ao deletar evento")
    }
  }

  return (
    <LayoutBaseProf>
      <NavbarHome
        onSearchChange={() => {}}
        buttonLabel="Filtrar"
        onButtonClickc={() => {}}
        nome={user?.nome ?? "Professor"}
        foto={user?.foto ?? foto}
        notificacoes={5}
        onButtonClick={() => {}}
      />

      <div className="homeContainer homeContainer--prof">

        <div className="homeMain">

          <div className="cardsPrincipal">
            <div className="cardTurma">
              <div className="cardTurmaLeft">
                <h2 className="cardTurmaNome">
                  {turma.nome} <span>{turma.letra}</span>
                </h2>
                <p className="cardTurmaDesc">
                  Acompanhe o progresso, gerencie atividades e mantenha a rotina da turma em dia.
                </p>
                <div className="cardTurmaStats">
                  <span className="cardTurmaStat"><Users size={13}/> {turma.totalAlunos} alunos</span>
                  <span className="cardTurmaStat"><ClipboardList size={13} /> {turma.totalTarefas} tarefas</span>
                  <span className="cardTurmaStat"><CheckCircle2 size={13} /> {turma.percentualConcluidas}% concluídas</span>
                </div>
              </div>

              <div className="cardTurmaRight">
                <button className="cardTurmaBtn" onClick={() => goTo("/professores/atividades")}>
                  <div className="cardTurmaBtnLeft">
                    <div className="cardTurmaBtnIcone"><Plus size={18} /></div>
                    <div className="cardTurmaBtnTexto">
                      <span className="cardTurmaBtnTitulo">Adicionar atividade</span>
                      <span className="cardTurmaBtnSub">Crie uma nova tarefa para a turma</span>
                    </div>
                  </div>
                  <ChevronRight size={18} color="#005A63" />
                </button>

                <button className="cardTurmaBtn2" onClick={() => goTo("/atividades/pendentes")}>
                  <div className="cardTurmaBtnLeft2">
                    <div className="cardTurmaBtnIcone2"><Clock size={18} /></div>
                    <div className="cardTurmaBtnTexto2">
                      <div className="cardTurmaTituloPrincipal2">
                        <span className="cardTurmaBtnTitulo2">Pendente</span>
                        <div className="cardTurmaQtdPend">{turma.tarefasPendentes}</div>
                      </div>
                      <span className="cardTurmaBtnSub2">Atividades para realizar hoje</span>
                    </div>
                  </div>
                  <ChevronRight size={18} color="rgba(255,255,255,0.5)" />
                </button>
              </div>
            </div>
          </div>

          <div className="atalhosPrincipais">
            <h2>Matérias</h2>
            <div className="cardsAtalhos">
              {MATERIAS.map(({ id, nome, cor, corTexto, corBotao, badge, Icone }) => (
                <div key={id} className="cardAtlMateria" style={{ backgroundColor: cor }}>
                  <div className="cardAtlBadge">
                    {String(badge).padStart(2, "0")}.
                  </div>
                  <p className="cardAtlNome" style={{ color: corTexto }}>{nome}</p>
                  <div className="cardAtlIconeWrap">
                    <div className="cardAtlIconeCircle" style={{ backgroundColor: `${corTexto}22` }}>
                      <Icone size={36} color={corTexto} />
                    </div>
                  </div>
                  <button
                    className="cardAtlBtn"
                    style={{ backgroundColor: corBotao }}
                    onClick={() => goTo(`/materias/${id}`)}
                  >
                    Visualizar
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="homeSide">
          <div className="calendario">
            <MeuCalendario onSelectDate={handleSelectDate} />
          </div>
          <EventsList events={events} onDelete={handleDeleteEvent} />
        </div>

      </div>

      <ModalEvents
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddEvent={handleAddEvent}
        dados={{ date: selectedDate }}
      />

    </LayoutBaseProf>
  )
}

export default Home
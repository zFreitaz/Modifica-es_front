import { useState, useEffect } from "react"
import {GraduationCap, House, Book, Users} from "lucide-react"
import { useNavigate } from 'react-router-dom';
import InfoHeader from "../../components/escola/InfoHeader";
import LayoutBase from "../../components/escola/layout/LayoutBase";
import NavbarHome from "../../components/escola/NavbarHome";
import foto from "../../assets/escola.jpg"
import CardHome from "../../components/escola/cardsHome";
import Button from "../../components/escola/button";
import MeuCalendario from "../../components/calendar/MeuCalendario";
import EventsList from "../../components/escola/EventsInput";
import ModalEvents from "../modals/ModalEvents";
import { api } from "../../services/api";

interface Evento {
  description: string;
  date: string;
}

interface DadosEscola {
  totalAlunos: number
  totalProfessores: number
  turmasAtivas: number
}

interface UserData {
  nome?: string;
  foto?: string;
}

function Home() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [events, setEvents] = useState<Evento[]>([])

  const [dadosEscola, setDadosEscola] = useState<DadosEscola>({
    totalAlunos: 0,
    totalProfessores: 0,
    turmasAtivas: 0,
  })

  const user: UserData = JSON.parse(localStorage.getItem("user") ?? "{}")

  useEffect(() => {
    async function carregarDados() {
      try {
        const response = await api.get<DadosEscola>("/escolas/estatisticas");
        setDadosEscola(response.data);
      } catch (err) {
        console.error("Erro ao carregar estatísticas da escola");
      }
    }

    async function fetchEventos() {
      try {
        const response = await api.get("/eventos");
        setEvents(response.data);
      } catch {
        console.error("Erro ao carregar eventos");
      }
    }

    carregarDados();
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
      await api.post("/eventos", newEvent);
    } catch {
      console.error("Erro ao salvar evento")
    }
  }

  const handleDeleteEvent = async (index: number) => {
    const evento = events[index]
    setEvents(events.filter((_, i) => i !== index))

    try {
      await api.delete(`/eventos/${index}`);
    } catch {
      console.error("Erro ao deletar evento")
    }
  }

  return (
    <LayoutBase>

      <NavbarHome
        onSearchChange={() => {}}
        buttonLabel="Filtrar"
        onButtonClickc={() => {}}
        nome={user?.nome || "EMEF Prof° Carlos Alberto Vigneron"}
        foto={user?.foto || foto}
        notificacoes={5}
        onButtonClick={() => {}}
      />

      <div className="homeContainer">
        
        <div className="homeMain">  
          <div className="cardsPrincipais">
            <CardHome
              icon={<GraduationCap size={26}/>}
              title="Alunos"
              count={dadosEscola.totalAlunos}
            />
            <CardHome
              icon={<Book size={26}/>}
              title="Professores"
              count={dadosEscola.totalProfessores}
            />
            <CardHome
              icon={<Users size={26}/>}
              title="Turmas Ativas"
              count={dadosEscola.turmasAtivas}
            />
          </div>

          <div className="atalhosPrincipais">
            <h2>Acesso Rápido</h2>
            <div className="cardsAtalhos">
              <div className="cardAtl">
                <div className="iconName">
                  <GraduationCap size={40} />
                </div>
                <p className="titleAtalhos">Gerenciar dados de alunos</p>
                <Button className="btnAtalhos" onClick={() => goTo('/alunos')}>Alunos</Button>
              </div>

              <div className="cardAtl">
                <div className="iconName">
                  <Book size={35} />
                </div>
                <p className="titleAtalhos">Administrar corpo docente</p>
                <Button className="btnAtalhos" onClick={() => goTo('/professores')}>Professores</Button>
              </div>

              <div className="cardAtl">
                <div className="iconName">
                  <Users size={35} />
                </div>
                <p className="titleAtalhos">Organize turmas e distribuição de alunos</p>
                <Button className="btnAtalhos" onClick={() => goTo('/turmas')}>Turmas</Button>
              </div>
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

    </LayoutBase>
  )
}

export default Home
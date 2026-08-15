import React, { useState, useEffect } from "react";
import Button from "./button";
import Input from "./input";
import { api } from "../../services/api";


interface Aluno {
    _id: string;
    nome: string;
    telefone: string;
    urlFotoAluno?: string;
}

interface Professor {
    _id: string;
    nome: string;
    sobrenome: string;
}

interface FormTurmasProps {
    dados?: any
    onClose?: () => void
    onSalvo?: () => void
}

export default function FormTurma({ dados, onClose, onSalvo }: FormTurmasProps) {

    const [nomeTurma, setNomeTurma] = useState(dados?.nome || "")
    const [professor, setProfessor] = useState(dados?.professorId?._id || dados?.professorId || "")
    const [buscaAluno, setBuscaAluno] = useState("")

    const [alunosSelecionados, setAlunosSelecionados] = useState<string[]>(
        dados?.alunosIds?.map((a: any) => a._id || a) || []
    )

    const [alunos, setAlunos] = useState<Aluno[]>([])
    const [professores, setProfessores] = useState<Professor[]>([])
    const [carregando, setCarregando] = useState(false)
    const [erro, setErro] = useState<string | null>(null)

    useEffect(() => {
        async function carregarDados() {
            try {
                const queryParams = dados?._id
                    ? `?semTurma=true&turmaId=${dados._id}`
                    : "?semTurma=true";

                const [resAlunos, resProfs] = await Promise.all([
                    api.get(`/alunos${queryParams}`),
                    api.get("/professores")
                ]);
                setAlunos(resAlunos.data);
                setProfessores(resProfs.data);
            } catch (err) {
                console.error("Erro ao carregar dados", err);
            }
        }
        carregarDados();
    }, [dados?._id]);

    useEffect(() => {
        if (dados) {
            setNomeTurma(dados.nome || "")
            setProfessor(dados.professorId?._id || dados.professorId || "")
            setAlunosSelecionados(dados.alunosIds?.map((a: any) => a._id || a) || [])
        }
    }, [dados])

    function toggleAluno(id: string) {
        setAlunosSelecionados((prev) =>
            prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
        )
    }

    const alunosFiltrados = alunos.filter((a) =>
        a.nome.toLowerCase().includes(buscaAluno.toLowerCase())
    )

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setErro(null)
        setCarregando(true)

        try {
            const payload = {
                nome: nomeTurma,
                professorId: professor,
                alunosIds: alunosSelecionados,
            }

            const isEdit = !!dados?._id;
            const url = isEdit ? `/turmas/${dados._id}` : "/turmas"
            const method = isEdit ? "put" : "post"

            await api[method](url, payload);

            onSalvo?.()
        } catch (err: any) {
            setErro(err.response?.data?.erro || "Erro ao salvar turma")
        } finally {
            setCarregando(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="formCadastroTurma">
            <div className="dadosCadGeralTurma">
                <div className="dadosCad7">
                    <Input id="turma" label="Turma" type="text" placeholder="Turma" value={nomeTurma} onChange={(e) => setNomeTurma(e.target.value)} />
                </div>
                <div className="inputGroup">
                    <label className="nomeProfessor">Professor</label>
                    <select value={professor} onChange={(e) => setProfessor(e.target.value)} required>
                        <option value="">Professor Responsável</option>
                        {professores.map((p) => (
                            <option key={p._id} value={p._id}>{p.nome} {p.sobrenome}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="searchAluno">
                <input
                    placeholder="Digite o nome do aluno..."
                    value={buscaAluno}
                    onChange={(e) => setBuscaAluno(e.target.value)}
                />
            </div>

            <div className="listaAlunos">
                {alunosFiltrados.map((aluno) => (
                    <div key={aluno._id} className="alunoItem">
                        <div className="alunoInfo">
                            <img src={aluno.urlFotoAluno || "https://via.placeholder.com/40"} alt={aluno.nome} />
                            <span>{aluno.nome}</span>
                            <span>{aluno.telefone}</span>
                        </div>
                        <input
                            type="checkbox"
                            checked={alunosSelecionados.includes(aluno._id)}
                            onChange={() => toggleAluno(aluno._id)}
                        />
                    </div>
                ))}
            </div>

            {erro && <p style={{ color: 'red', fontFamily: 'Inter', fontSize: 14 }}>{erro}</p>}

            <div className="botao">
                <Button type="submit" className="submitCadastrarAluno" disabled={carregando}>
                    {carregando ? "Salvando..." : "Salvar"}
                </Button>
            </div>
        </form>
    )
}
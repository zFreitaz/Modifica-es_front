import React, { useState, useEffect } from "react";
import Button from "./button";
import Input from "./input";
import UploadImagem from "./buttonImage";
import { api } from "../../services/api";

interface FormAlunosProps {
    dados?: any
    onClose?: () => void
    onSalvo?: () => void
}

export default function FormAlunos({ dados, onClose, onSalvo }: FormAlunosProps) {

    const [nome, setNome] = useState(dados?.nome || "")
    const [cpf, setCpf] = useState(dados?.cpf || "")
    const [cpfResponsavel, setCpfResponsavel] = useState(dados?.cpfResponsavel || "") // Substituiu RA
    const [telefone, setTelefone] = useState(dados?.telefone || "")
    
    const [senha, setSenha] = useState("")
    const [nomeResponsavel, setNomeResponsavel] = useState(dados?.nomeResponsavel || "")
    const [data, setData] = useState("")
    const [email, setEmail] = useState("")
    
    const [imagem, setImagem] = useState<File | null>(null)
    const [laudo, setLaudo] = useState<File | null>(null)
    const [carregando, setCarregando] = useState(false)
    const [erro, setErro] = useState<string | null>(null)

    useEffect(() => {
        if (dados) {
            setNome(dados.nome || "")
            setCpf(dados.cpf || "")
            setCpfResponsavel(dados.cpfResponsavel || "")
            setTelefone(dados.telefone || "")
            setNomeResponsavel(dados.nomeResponsavel || "")
            setData(dados.dataNasc ? dados.dataNasc.split("T")[0] : "")
            setEmail(dados.usuarioId?.email || dados.email || "")
        }
    }, [dados])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setErro(null)
        setCarregando(true)

        try {
            const form = new FormData()
            const isEdit = !!dados?._id

            if (isEdit) {
                form.append("nome", nome)
                form.append("cpf", cpf)
                form.append("cpfResponsavel", cpfResponsavel)
                form.append("telefone", telefone)
                form.append("nomeResponsavel", nomeResponsavel)
                
                if (data) form.append("dataNasc", `${data}T00:00:00Z`)
                if (imagem) form.append("foto", imagem)
                if (laudo) form.append("laudo", laudo)
            } else {
                form.append("dadosUsuario[email]", email)
                if (senha) form.append("dadosUsuario[senha]", senha)

                form.append("dadosAluno[nome]", nome)
                form.append("dadosAluno[cpf]", cpf)
                form.append("dadosAluno[cpfResponsavel]", cpfResponsavel)
                form.append("dadosAluno[telefone]", telefone)
                form.append("dadosAluno[nomeResponsavel]", nomeResponsavel)
                
                if (data) form.append("dadosAluno[dataNasc]", `${data}T00:00:00Z`)
                if (imagem) form.append("foto", imagem)
                if (laudo) form.append("laudo", laudo)
            }

            const url = isEdit ? `/alunos/${dados._id}` : "/alunos"
            const method = isEdit ? "put" : "post"

            await api[method](url, form)

            onSalvo?.()
        } catch (err: any) {
            setErro(err.response?.data?.erro || "Erro inesperado ao salvar aluno")
        } finally {
            setCarregando(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="formCadastroAluno">
            <div className="dadosCadGeralAluno">
                <div className="dadosCad5">
                    <Input id="nome" label="Nome" type="text" placeholder="Nome do Aluno" value={nome} onChange={(e) => setNome(e.target.value)} />
                    <Input id="cpf" label="CPF" type="text" placeholder="Apenas números" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                    <Input id="cpfResponsavel" label="CPF do Responsável" type="text" placeholder="Apenas números" value={cpfResponsavel} onChange={(e) => setCpfResponsavel(e.target.value)} />
                    <Input id="telefone" label="Telefone" type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                    <UploadImagem
                        label="Imagem do Rosto do Aluno"
                        onChange={(file) => setImagem(file)}
                    />
                </div>
                <div className="dadosCad6">
                    <Input id="senha" label="Senha" type="password" placeholder="Senha de Acesso" value={senha} onChange={(e) => setSenha(e.target.value)} disabled={!!dados?._id} />
                    <Input id="nomeResponsavel" label="Nome do Responsável" type="text" placeholder="Nome do Responsável" value={nomeResponsavel} onChange={(e) => setNomeResponsavel(e.target.value)} />
                    <Input id="dtNascimento" label="Data de Nascimento" type="date" placeholder="Data de Nascimento" value={data} onChange={(e) => setData(e.target.value)} />
                    <Input id="email" label="E-mail" type="email" placeholder="E-mail de acesso" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!!dados?._id} />
                    <UploadImagem
                        label="Laudo de TDAH do Aluno"
                        onChange={(file) => setLaudo(file)}
                    />
                </div>
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
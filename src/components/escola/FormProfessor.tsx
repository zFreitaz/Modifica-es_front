import React, { useState, useEffect } from "react";
import Button from "./button";
import Input from "./input";
import UploadImagem from "./buttonImage";
import { api } from "../../services/api";

interface FormProfessoresProps {
    dados?: any
    onClose?: () => void
    onSalvo?: () => void
}

export default function FormProfessores({ dados, onClose, onSalvo }: FormProfessoresProps) {

    const [nome, setNome] = useState(dados?.nome || "")
    const [sobrenome, setSobrenome] = useState(dados?.sobrenome || "")
    const [cpf, setCpf] = useState(dados?.cpf || "")
    const [data, setData] = useState("")
    const [rg, setRg] = useState(dados?.rg || "")
    const [cidade, setCidade] = useState(dados?.cidade || "")
    const [telefone, setTelefone] = useState(dados?.telefone || "")
    const [email, setEmail] = useState(dados?.email || "")
    const [senha, setSenha] = useState("")
    const [imagem, setImagem] = useState<File | null>(null)
    const [carregando, setCarregando] = useState(false)
    const [erro, setErro] = useState<string | null>(null)

    useEffect(() => {
        if (dados) {
            setNome(dados.nome || "")
            setSobrenome(dados.sobrenome || "")
            setCpf(dados.cpf || "")
            setData(dados.dataNasc ? dados.dataNasc.split("T")[0] : "")
            setRg(dados.rg || "")
            setCidade(dados.cidade || "")
            setTelefone(dados.telefone || "")
            setEmail(dados.email || "")
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
                  form.append("sobrenome", sobrenome)
                  form.append("cpf", cpf)
                  form.append("rg", rg)
                  form.append("cidade", cidade)
                  form.append("telefone", telefone)

                  if (data) {
                      form.append("dataNasc", `${data}T00:00:00Z`)
                  }
                  if (imagem) {
                      form.append("foto", imagem)
                  }
              } else {
                  form.append("dadosUsuario[email]", email)
                  if (senha) form.append("dadosUsuario[senha]", senha)

                  form.append("dadosProfessor[nome]", nome)
                  form.append("dadosProfessor[sobrenome]", sobrenome)
                  form.append("dadosProfessor[cpf]", cpf)
                  form.append("dadosProfessor[rg]", rg)
                  form.append("dadosProfessor[cidade]", cidade)
                  form.append("dadosProfessor[telefone]", telefone)

                  if (data) {
                      form.append("dadosProfessor[dataNasc]", `${data}T00:00:00Z`)
                  }
                  if (imagem) {
                      form.append("foto", imagem)
                  }
              }

              const url = isEdit ? `/professores/${dados._id}` : "/professores"
              const method = isEdit ? "put" : "post"

              await api[method](url, form)

              onSalvo?.()
          } catch (err: any) {
              setErro(err.response?.data?.erro || "Erro inesperado ao salvar professor")
          } finally {
              setCarregando(false)
          }
      }

    return (
        <form onSubmit={handleSubmit} className="formCadastroProf">
            <div className="dadosCadGeralProf">
                <div className="dadosCad3">
                    <Input id="nome" label="Nome" type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                    <Input id="cpf" label="CPF" type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                    <Input id="rg" label="RG" type="text" placeholder="RG" value={rg} onChange={(e) => setRg(e.target.value)} />
                    <Input id="telefone" label="Telefone" type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                    <Input id="senha" label="Senha" type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                </div>
                <div className="dadosCad4">
                    <Input id="sobrenome" label="Sobrenome" type="text" placeholder="Sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} />
                    <Input id="dtNasci" label="Data de Nascimento" type="date" placeholder="Data de Nascimento" value={data} onChange={(e) => setData(e.target.value)} />
                    <Input id="cidade" label="Cidade" type="text" placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                    <Input id="email" label="E-mail" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <UploadImagem
                        label="Imagem do Rosto do Docente"
                        onChange={(file) => setImagem(file)}
                    />
                </div>
            </div>

            {erro && <p style={{ color: 'red', fontFamily: 'Inter', fontSize: 14 }}>{erro}</p>}

            <div className="botao">
                <Button type="submit" className="submitCadastrarProf" disabled={carregando}>
                    {carregando ? "Salvando..." : "Salvar"}
                </Button>
            </div>
        </form>
    )
}
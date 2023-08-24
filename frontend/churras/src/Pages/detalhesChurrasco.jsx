import Header from "../components/Header";
import './form.css'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom"
import { Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { format, utcToZonedTime } from 'date-fns-tz'
import http from "../http";



const DetalhesChurrasco = () => {
    const [churrasco, setChurrasco] = useState([])
    const [participantes, setParticipantes] = useState([])

    const parametros = useParams()

    async function fetchChurrascosByID() {
        try {
            const response = await http.get(`${parametros.id}`)
            const churrasco = response.data
            setChurrasco(churrasco)
            setParticipantes(churrasco[0].participantes)
        } catch (error) {
            console.log('Erro ao encontrar churrasco')
        }
    }

    useEffect(() => {
        fetchChurrascosByID()
    }, [])

    function formatarData(data) {
        const dataFormatada = format(utcToZonedTime(new Date(data), 'UTC'), 'dd/MM/yy', { timeZone: 'UTC' })
        return dataFormatada
    }

    async function excluirParticipante(participanteId) {
        const id = participanteId
        try {
            await http.delete(`${parametros.id}/participante/${id}`)
            const participanteAtualizado = participantes.filter(participante => participante._id !== participanteId)
            setParticipantes([...participanteAtualizado])
        } catch (error) { console.log(error) }
    }
    return (
        <>
            <Header />
            <div className="title">
                <div className="title_top">
                    <h1>{churrasco.map((d) => d.descricao)}</h1>
                    <h1>{churrasco.map((e) => formatarData(e.data))}</h1>
                </div>
                <div className="title_des">
                    <h3>{churrasco.map((e) => e.obsChurras)}</h3>
                </div>
            </div>
            <h3>PARTICIPANTES</h3>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Contribuicao</TableCell>
                            <TableCell>Bebida</TableCell>
                            <TableCell>Pago</TableCell>
                            <TableCell>Observacao</TableCell>
                            <TableCell>Editar</TableCell>
                            <TableCell>Excluir</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {participantes.map((participante) =>

                            <TableRow key={participante._id}>
                                <TableCell>{participante.nome}</TableCell>
                                <TableCell>{participante.valorContribuicao}</TableCell>
                                <TableCell>
                                    <Checkbox checked={participante.bebida} />
                                </TableCell>
                                <TableCell>
                                    <Checkbox checked={participante.pago} />
                                </TableCell>
                                <TableCell>{participante.obs}</TableCell>

                                <TableCell>
                                    <Link to={`/editarParticipante/${parametros.id}/participante/${participante._id}`}>
                                        <Button variant="outlined">Editar</Button>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="error"
                                        onClick={() => excluirParticipante(participante._id)}>
                                        Excluir
                                    </Button>
                                </TableCell>

                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '40px', marginTop: '10px' }}>
                <Link to={`/AdicionarParticipante/${parametros.id}`}>
                    <Button variant="outlined" color="primary">Adicionar Participante</Button>
                </Link>
            </div>
        </>
    )

}
export default DetalhesChurrasco;
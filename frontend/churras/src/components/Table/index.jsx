import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import React from 'react'
import { Link } from 'react-router-dom'
import { format, utcToZonedTime } from 'date-fns-tz'
import http from "../../http"


export default function DisplayTable() {

    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        fetchChurrascos()
    }, [])

    const totalArrecadado = (participantes) => {
        let total = 0
        participantes.map((participante) => {
            if (participante.pago)
                total += participante.valorContribuicao
            return total
        })
        return total
    }
    const orcamento = (participantes) => {
        let totalAserArrecadado = 0;
        participantes.map((participante) => totalAserArrecadado += participante.valorContribuicao)
        return totalAserArrecadado
    }
    async function fetchChurrascos() {
        const churrascos = await http.get('/')
        setEventos(churrascos.data)
    }

    async function excluirChurrasco(churrasId) {
        const id = churrasId
        try {
            await http.delete(`${id}`)
            const churrascoAtualizados = eventos.filter(eventos => eventos._id !== churrasId)
            setEventos([...churrascoAtualizados])
        } catch (error) { console.log(error) }
    }

    function formatarData(data) {
        const dataFormatada = format(utcToZonedTime(new Date(data), 'UTC'), 'dd/MM/yy', { timeZone: 'UTC' })
        return dataFormatada
    }


    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Data</TableCell>
                            <TableCell>Descricao</TableCell>
                            <TableCell>Detalhes</TableCell>
                            <TableCell>Participantes</TableCell>
                            <TableCell>Total ja Arrecadado</TableCell>
                            <TableCell>Total a ser Arrecadado</TableCell>
                            <TableCell>Editar</TableCell>
                            <TableCell>Excluir</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {eventos.map((eventos) =>
                            <TableRow key={eventos._id}>
                                <TableCell>{formatarData(eventos.data)}</TableCell>
                                <TableCell>{eventos.descricao}</TableCell>
                                <TableCell>
                                    <Link to={`/detalhesChurrasco/${eventos._id}`}><Button>ver mais</Button> </Link>

                                </TableCell>
                                <TableCell>{eventos.participantes.length}
                                    <Link to={`/AdicionarParticipante/${eventos._id}`}>
                                        <Button>Adicionar Participante</Button>
                                    </Link>
                                </TableCell>
                                <TableCell>R$ {totalArrecadado(eventos.participantes)}</TableCell>
                                <TableCell>R$ {orcamento(eventos.participantes)}</TableCell>
                                <TableCell>
                                    <Link to={`/editarChurrasco/${eventos._id}`}>
                                        <Button variant="outlined">Editar</Button>
                                    </Link>    
                                    </TableCell>
                                <TableCell><Button variant="outlined" color="error"
                                    onClick={() => {
                                        excluirChurrasco(eventos._id)
                                    }}>Excluir</Button></TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '40px', marginTop: '10px' }}>
                <Link to="/cadastrarChurrasco">
                    <Button variant="outlined" color="primary">Adicionar Churrasco</Button>
                </Link>
            </div>
        </>

    )
}




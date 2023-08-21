import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { format, utcToZonedTime } from 'date-fns-tz'


export default function DisplayTable() {

    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        fetchChurrascos()
    }, [])

    const totalArrecadado = (participantes) => {
        let total = 0
        participantes.map((participante) => { 
            if(participante.pago)
            total += participante.valorContribuicao
            return total
        }) 
        
        return total
    }
    async function fetchChurrascos() {
        const churrascos = await axios.get('http://localhost:5000/Churrascos')
        setEventos(churrascos.data)
    }

    async function excluirChurrasco(churrasId) {
        const id = churrasId
        try {
            await axios.delete(`http://localhost:5000/churrascos/${id}`)
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
                            <TableCell>Total Arrecadado</TableCell>
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
                                <TableCell>{totalArrecadado(eventos.participantes)}</TableCell>
                                <TableCell><Button variant="outlined">Editar</Button></TableCell>
                                <TableCell><Button variant="outlined" color="error"
                                    onClick={() => {
                                        excluirChurrasco(eventos._id)
                                    }}>Excluir</Button></TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Link to="/cadastrarChurrasco">
                <Button variant="outlined" color="primary">Adicionar Churrasco</Button>
            </Link>
        </>

    )
}




import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


export default function DisplayTable() {

    const [eventos, setEventos] = useState([]);
  
    useEffect(() => {
      fetchChurrascos()
      
  }, [])
  
  async function fetchChurrascos() {
      const churrascos = await axios.get('http://localhost:5000/Churrascos')
      setEventos(churrascos.data)
  }
  
  async function excluirChurrasco(churrasId) {
    const id = churrasId
    console.log(id)
    try {
        await axios.delete(`http://localhost:5000/churrascos/${id}`)
        const churrascoAtualizados = eventos.filter(eventos => eventos._id !== churrasId)
        setEventos([...churrascoAtualizados])
    } catch (error) { console.log(error) }
  }

    return (
        <>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Data</TableCell>
                            <TableCell>Descricao</TableCell>
                            <TableCell>Participantes</TableCell>
                            <TableCell>Total Arrecadado</TableCell>
                            <TableCell>Editar</TableCell>
                            <TableCell>Excluir</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {eventos.map((eventos) =>
                            <TableRow key={eventos._id}>
                                <TableCell>{eventos.data}</TableCell>
                                <TableCell>{eventos.descricao}</TableCell>
                                <TableCell>{eventos.participantes.length}
                                    <Link to="/AdicionarParticipante"><Button>Adicionar Participante</Button></Link>
                                </TableCell>
                                <TableCell>{eventos.totalArrecadado}</TableCell>
                                <TableCell><Button>Editar</Button></TableCell>
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
                <Button>Adicionar Churrasco</Button>
            </Link>
        </>

    )
}




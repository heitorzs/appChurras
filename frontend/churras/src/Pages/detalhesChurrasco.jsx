import Header from "../components/Header";
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useParams } from "react-router-dom"
import { Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";



const DetalhesChurrasco = () => {
    const [churrasco, setChurrasco] = useState([])
    const [participantes, setParticipantes] = useState([])

    const parametros = useParams()

    async function fetchChurrascosByID() {
        try {
            const response = await axios.get(`http://localhost:5000/churrascos/${parametros.id}`)
            const churrasco = response.data
            setChurrasco(churrasco)
            console.log(churrasco)
            setParticipantes(churrasco[0].participantes)
        } catch (error) {
            console.log('Erro ao encontrar churrasco')
        }
    }

    useEffect(() => {
        fetchChurrascosByID()
        console.log(participantes)
    }, [])

    return (
        <>
            <Header />
            <TableContainer component={Paper}>
                <div style={{display: 'flex'}}>
                    {/* <h1 style={{ alignSelf: 'center' }}>{churrasco[0].descricao}</h1> */}
                </div>
                {/* {console.log(churrasco[0].descricao)} */}
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
                                <TableCell><Button variant="outlined">Editar</Button></TableCell>
                                <TableCell><Button variant="outlined" color="error">Excluir</Button></TableCell>

                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    )

}
export default DetalhesChurrasco;
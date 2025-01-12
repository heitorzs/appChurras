import './form.css'
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { Button, Checkbox, Dialog, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { format, utcToZonedTime } from 'date-fns-tz'
import http from "../http";
import FormParticipante from './FormParticipante';



const DetalhesChurrasco = () => {
    const [churrasco, setChurrasco] = useState([])
    const [participantes, setParticipantes] = useState([])
    const [selectId, setSelectID] = useState(null);
    const [openFormEditarParticipante, setOpenFormEditarParticipante] = useState(false)
    const [openFormParticipante, setOpenFormParticipante] = useState(false)

    const parametros = useParams()

    function handleOpenEditarParticipante(eventId) {
        setSelectID(eventId);
        setOpenFormEditarParticipante(true);
    }

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
    }, [openFormEditarParticipante, openFormParticipante])


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
            <div className="title">
                <div className="title_top">
                    <h1>{churrasco.map((d) => d.descricao)}</h1>
                    <h1>{churrasco.map((e) => formatarData(e.data))}</h1>
                </div>
                <div className="title_des">
                    <h3>{churrasco.map((e) => e.obsChurras)}</h3>
                </div>
                <h2 style={{ color: 'white' }}>PARTICIPANTES</h2>
            </div>
           
            
            <TableContainer component={Paper} sx={{ width: '85%', margin: '0 auto', marginTop: '20px' }}>
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
                                    <Button onClick={() => handleOpenEditarParticipante(participante._id)} variant="outlined">Editar</Button>
                                    <Dialog
                                        open={openFormEditarParticipante && selectId === participante._id}
                                        onClose={() => setOpenFormEditarParticipante(false)}
                                    >
                                        <Button style={{ position: 'absolute', right: '0', }}
                                            color="error" onClick={() => setOpenFormEditarParticipante(false)}>X</Button>
                                        <FormParticipante
                                            isAtualizacao={true}
                                            churrasId={parametros.id}
                                            participanteId={participante._id}
                                        />
                                    </Dialog>

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

                <Button onClick={() => setOpenFormParticipante(true)} variant="outlined" color="primary">Adicionar Participante</Button>
                <Dialog
                    open={openFormParticipante}
                    onClose={() => setOpenFormParticipante(false)}
                >
                    <Button style={{ position: 'absolute', right: '0', }}
                        color="error" onClick={() => setOpenFormParticipante(false)}>X</Button>
                    <FormParticipante
                        churrasId={parametros.id}
                    />
                </Dialog>
            </div>
        </>
    )

}
export default DetalhesChurrasco;
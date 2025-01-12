import { Button, Dialog, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import React from 'react'
import { Link } from 'react-router-dom'
import { format, utcToZonedTime } from 'date-fns-tz'
import http from "../../http"
import FormChurrasco from "../../Pages/FormChurrasco"
import FormParticipante from "../../Pages/FormParticipante"

export default function DisplayTable() {

    const [eventos, setEventos] = useState([]);
    const [openFormChurrasco, setOpenFormChurrasco] = useState(false);
    const [openFormAtualizarChurrasco, setOpenFormAtualizarChurrasco] = useState(false);
    const [openFormParticipantes, setOpenFormParticipantes] = useState(false);
    const [selectId, setSelectID] = useState(null);

    const handleOpenFormEditar = (eventId) => {
        setSelectID(eventId);
        setOpenFormAtualizarChurrasco(true);
    };
    const handleCloseFormEditar = () => {
        setOpenFormAtualizarChurrasco(false);
        setSelectID(null);
    };

    const handleOpenFormParticipantes = (eventId) => {
        setSelectID(eventId);
        setOpenFormParticipantes(true);
    };



    useEffect(() => {
        fetchChurrascos()
        console.log('atualizou tabela')
    }, [openFormChurrasco, openFormParticipantes, openFormAtualizarChurrasco])


    async function fetchChurrascos() {
        const churrascos = await http.get('/')
        setEventos(churrascos.data)
    }

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

    async function excluirChurrasco(churrasId) {
        const id = churrasId
        try {
            await http.delete(`${id}`)
            const churrascoAtualizados = eventos.filter(eventos => eventos._id !== churrasId)
            setEventos([...churrascoAtualizados])
            alert('Churrasco excluido com sucesso')

        } catch (error) {
            alert('Erro ao excluir churrasco')
            console.log(error)
        }
    }

    function formatarData(data) {
        const dataFormatada = format(utcToZonedTime(new Date(data), 'UTC'), 'dd/MM/yy', { timeZone: 'UTC' })
        return dataFormatada
    }


    return (
        <>
            {console.log('renderizou')}
            <TableContainer component={Paper} sx={{ width: '85%', margin: '0 auto', marginTop: '20px' }}>
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
                                <TableCell>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '16px' }}>
                                        {eventos.participantes.length}
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => handleOpenFormParticipantes(eventos._id)}
                                        > Adicionar
                                        </Button>
                                        <Dialog
                                            open={openFormParticipantes && selectId === eventos._id}
                                            onClose={() => setOpenFormParticipantes(false)}
                                            style={{ width: '50vw', margin: '0 auto' }}
                                        >
                                            <Button style={{ position: 'absolute', right: '0', }}
                                                color="error" onClick={() => setOpenFormParticipantes(false)}>X</Button>
                                            <FormParticipante
                                                churrasId={selectId}
                                            />
                                        </Dialog>
                                    </div>

                                </TableCell>
                                <TableCell>R$ {totalArrecadado(eventos.participantes)}</TableCell>
                                <TableCell>R$ {orcamento(eventos.participantes)}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleOpenFormEditar(eventos._id)}>
                                        Editar
                                    </Button>
                                    <Dialog
                                        open={openFormAtualizarChurrasco && selectId === eventos._id}
                                        onClose={() => handleCloseFormEditar()}
                                        style={{ width: '50vw', margin: '0 auto' }}
                                    >
                                        <Button
                                            style={{ position: 'absolute', right: '0', }}
                                            color="error"
                                            onClick={() => handleCloseFormEditar()}> X
                                        </Button>
                                        <FormChurrasco
                                            churrasId={selectId}
                                            isAtualizacao={true}
                                        />
                                    </Dialog>
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
            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '85%', margin: '0 auto', marginTop: '10px' }}>
                <Button style={{ borderColor: 'white', }}
                    variant="outlined"
                    color="primary"
                    onClick={() => setOpenFormChurrasco(true)}
                > Adicionar Churrasco
                </Button>
                <Dialog
                    open={openFormChurrasco}
                    onClose={() => setOpenFormChurrasco(false)}
                    style={{ width: '50vw', margin: '0 auto' }}

                >
                    <Button style={{ position: 'absolute', right: '0', }} color="error" onClick={() => setOpenFormChurrasco(false)}>X</Button>
                    <FormChurrasco
                        isAtualizacao={false}
                    />
                </Dialog>

            </div>
        </>
    )
}




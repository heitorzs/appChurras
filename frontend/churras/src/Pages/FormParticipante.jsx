import React, { useEffect } from 'react'
import { useParams } from "react-router-dom"
import Header from '../components/Header'
import { useState } from 'react';
import { Button, Checkbox, TextField, } from '@mui/material';
import './form.css'
import http from '../http';


export default function FormParticipante({ isAtualizacao }) {

  const titulo = isAtualizacao ? "Editar Participante" : "Novo Participante"
  const botao = isAtualizacao ? "Editar Participante" : "Adicionar Participante"

  const [nomeParticipante, setNomeParticipante] = useState('');
  const [valorContribuicao, setValorContribuicao] = useState('');
  const [bebida, setBebida] = useState(false);
  const [pago, setPago] = useState(false);
  const [obs, setObs] = useState('');
  const [churrasco, setChurrasco] = useState([])
  const [participante, setParticipante] = useState([])
  const parametros = useParams()

  useEffect(() => {
    fetchChurrascos()

  }, [])

  useEffect(() => {
    async function getParticipanteById() {
      const res = await http.get(`${parametros.id}/participante/${parametros.participanteId}`)
      const participanteData = await res.data
      setParticipante(participanteData.participantes);
      console.log(participanteData.participantes)
    }
    getParticipanteById()
  }, [parametros.participanteId]);

  async function fetchChurrascos() {
    const res = await http.get(`${parametros.id}`)
    const churrascos = await res.data
    setChurrasco(churrascos)
  }

  useEffect(() => {
    if (isAtualizacao){

      participante.map((e) => {
        const nome = e.nome
        setNomeParticipante(nome)
        console.log(nome)
        const contribuição = e.valorContribuicao
        setValorContribuicao(contribuição)
        const bebida = e.bebida
        setBebida(bebida)
        const pago = e.pago
        setPago(pago)
        const obs = e.obs
        setObs(obs)
      })
    }
      
  }, [participante]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const novoParticipante = {

      nome: nomeParticipante,
      valorContribuicao,
      bebida,
      pago,
      obs,

    };
    if (isAtualizacao) {
      try {
        const response = await http.put(`${parametros.id}/participante/${parametros.participanteId}`, novoParticipante);
        console.log('Resposta do servidor:', response.data);
        setNomeParticipante('')
        setObs('')
        setValorContribuicao('')
        setPago('')
        setBebida('')
      } catch (error) {
        console.error('Erro ao enviar requisição:', error);
      }
    }
    else {
      try {
        const response = await http.post(`${parametros.id}`, novoParticipante);
        console.log('Resposta do servidor:', response.data);
        setNomeParticipante('')
        setObs('')
        setValorContribuicao('')
        setPago('')
        setBebida('')
      } catch (error) {
        console.error('Erro ao enviar requisição:', error);
      }
    }
  };


  return (
    <>
      <Header />

      <div className='wrapper'>

        <form className="form_wrap" onSubmit={handleSubmit}>

          <h1>{titulo}</h1>
          <TextField
            className='input'
            variant='standard'
            label="Nome do Participante"
            value={nomeParticipante} onChange={(e) => setNomeParticipante(e.target.value)}
            required />

          <TextField
            className='input'
            variant='standard'
            placeholder={`${churrasco.map((c) => c.valorSugerido)}`}
            label="valor da Contribuição"
            type="number" value={valorContribuicao}
            onChange={(e) => setValorContribuicao(e.target.value)}
            required />

          <div>

            <label>Bebida:</label>
            <Checkbox label="Bebida" checked={bebida} onChange={(e) => setBebida(e.target.checked)} />

            <label>Pago:</label>
            <Checkbox type="checkbox" checked={pago} onChange={(e) => setPago(e.target.checked)} />
          </div>


          <TextField
            className='input'
            id='multiline'
            placeholder='Obs do participante'
            value={obs}
            onChange={(e) => setObs(e.target.value)} />


          <Button variant="outlined" type="submit">{botao} </Button>
        </form>
      </div>
    </>
  )
}
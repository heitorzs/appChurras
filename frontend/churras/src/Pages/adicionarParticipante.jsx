import React from 'react'
import { useParams } from "react-router-dom"
import Header from '../components/Header'
import axios from 'axios';
import { useState } from 'react';
import { Button, Checkbox, TextField,} from '@mui/material';
import './form.css'


export default function AdicionarParticipante() {
  const [nomeParticipante, setNomeParticipante] = useState('');
  const [valorContribuicao, setValorContribuicao] = useState('');
  const [bebida, setBebida] = useState(false);
  const [pago, setPago] = useState(false);
  const [obs, setObs] = useState('');

  const parametros = useParams()

  const handleSubmit = async (event) => {
    event.preventDefault();


    const novoParticipante = {

      nome: nomeParticipante,
      valorContribuicao,
      bebida,
      pago,
      obs,

    };

    try {
      const response = await axios.put(`http://localhost:5000/churrascos/${parametros.id}`, novoParticipante);
      console.log('Resposta do servidor:', response.data);
      setNomeParticipante('')
      setObs('')
      setValorContribuicao('')
      setPago(false)
      setBebida(false)
    } catch (error) {
      console.error('Erro ao enviar requisição:', error);
    }
  };


  return (
    <>
      <Header />

      <div className='wrapper'>

        <form className="form_wrap" onSubmit={handleSubmit}>

          <h1>Novo Participante</h1>
          <TextField
            className='input'
            variant='standard'
            label="Nome do Participante"
            value={nomeParticipante} onChange={(e) => setNomeParticipante(e.target.value)}
            required />

          <TextField
            className='input'
            variant='standard'
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
          

          <Button variant="outlined" type="submit">Adicionar Participante</Button>
        </form>
      </div>
    </>


  )
}
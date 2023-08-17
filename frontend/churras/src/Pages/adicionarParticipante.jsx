import React from 'react'
import Header from '../components/Header'
import axios from 'axios';
import { useState } from 'react';
import { Button, Checkbox,  TextField, TextareaAutosize, } from '@mui/material';


export default function CadastrarParticipante(churrasco) {

  const [nomeParticipante, setNomeParticipante] = useState('');
  const [valorContribuicao, setValorContribuicao] = useState('');
  const [bebida, setBebida] = useState(false);
  const [pago, setPago] = useState(false);
  const [obs, setObs] = useState('');

  const handleSubmit = async (event, {id}) => {
    event.preventDefault();

    
    const novoParticipante = {
      
      participantes: [{
        nome: nomeParticipante,
        valorContribuicao,
        bebida,
        pago,
        obs,
      }]
    };

    try {
      const response = await axios.post(`http://localhost:5000/churrascos/${id}/participantes`, novoParticipante);
      console.log('Resposta do servidor:', response.data);
      // Realizar alguma ação ou redirecionar após o sucesso, se necessário.
    } catch (error) {
      console.error('Erro ao enviar requisição:', error);
    }
  };


  return (
    <>
      <Header />
      <div style={{margin: '20,50,20,50'}}>

        <div style={{ background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '5px' }} onSubmit={handleSubmit}>

            <h2>Novo Participante</h2>
            <TextField variant='standard' label="Nome do Participante" value={nomeParticipante} onChange={(e) => setNomeParticipante(e.target.value)} required />

            <TextField variant='standard' label="valor da Contribuição" type="number" value={valorContribuicao} onChange={(e) => setValorContribuicao(e.target.value)} required />

            <div>
              <label>Bebida:</label>
              <Checkbox label="Bebida" checked={bebida} onChange={(e) => setBebida(e.target.checked)} />
            </div>
            <div>
              <label>Pago:</label>
              <Checkbox type="checkbox" checked={pago} onChange={(e) => setPago(e.target.checked)} />
            </div>
            <div>
              <label>Observações:</label>
              <TextareaAutosize value={obs} onChange={(e) => setObs(e.target.value)} />
            </div>

            <Button type="submit">Adicionar Participante</Button>
          </form>
        </div>
      </div>
    </>


  )
}
import React from 'react'
import Header from '../components/Header'
import axios from 'axios';
import { useState } from 'react';
import { Button, Checkbox, Paper, TextField, TextareaAutosize, } from '@mui/material';


export default function CadastrarChurrasco() {

  const [data, setData] = useState(new Date());
  const [obs, setObs] = useState('');
  const [obsChurras, setObsChurras] = useState('');
  const [descricao, setDescricao] = useState('');
  //participantes
  const [nomeParticipante, setNomeParticipante] = useState('');
  const [valorContribuicao, setValorContribuicao] = useState('');
  const [bebida, setBebida] = useState(false);
  const [pago, setPago] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const novoChurrasco = {
      data,
      descricao,
      obsChurras,
      participantes: [{
        nome: nomeParticipante,
        valorContribuicao,
        bebida,
        pago,
        obs,
      }]

    };

    try {
      const response = await axios.post(`http://localhost:5000/Churrascos`, novoChurrasco);
      console.log('Resposta do servidor:', response.data);
      // Realizar alguma ação ou redirecionar após o sucesso, se necessário.
    } catch (error) {
      console.error('Erro ao enviar requisição:', error);
    }
  };


  return (
    <>
      <Header />
      <Paper>

        <div style={{ background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          <h1>Novo Churrasco</h1>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '5px' }} onSubmit={handleSubmit}>

            <input type='date'
              label="escolha a data do churrasco"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
            <TextField
              variant="standard"
              label="Descricao"
              value={descricao} onChange={(e) => setDescricao(e.target.value)}
              required />

            <label>Observações:</label>
            <TextareaAutosize
              value={obsChurras}
              onChange={(e) => setObsChurras(e.target.value)}
            />

            <h2>Novo Participante</h2>

            <TextField
              variant='standard'
              label="Nome do Participante"
              value={nomeParticipante}
              onChange={(e) => setNomeParticipante(e.target.value)}
              required
            />

            <TextField
              variant='standard'
              label="valor da Contribuição"
              type="number" value={valorContribuicao}
              onChange={(e) => setValorContribuicao(e.target.value)}
              required
            />

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

            <Button type="submit">Adicionar Churrasco</Button>
          </form>
        </div>
      </Paper>
    </>


  )
}
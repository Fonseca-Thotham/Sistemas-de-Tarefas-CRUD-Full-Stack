const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

//require() → importa bibliotecas
//express() → cria o servidor
//app.use() → configura comportamentos

let tarefas = [];
let id = 1;

//tarefas → lista de dados
//id → identificador único

app.get('/tarefas', (req, res) => {
  res.json(tarefas);
});
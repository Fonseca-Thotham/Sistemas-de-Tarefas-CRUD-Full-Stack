const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

//require(): importa bibliotecas
//express(): cria o servidor
//app.use(): configura comportamentos

let tarefas = [];
let id = 1;

//tarefas: lista de dados
//id: identificador único

app.get('/', (req, res) => {
  res.send('API do Sistema de Tarefas online 🚀');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/tarefas', (req, res) => {
  res.json(tarefas);
});

//Quando alguem acessar o caminho, responde com os dados

app.post('/tarefas', (req, res) => {
  const nova = {
    id: id++,
    titulo: req.body.titulo
  };

  tarefas.push(nova);
  res.json(nova);
});

// Aqui recebemos dados do frontend, cria nova tarefa e/ou salva

app.delete('/tarefas/:id', (req, res) => {
  tarefas = tarefas.filter(t => t.id != req.params.id);
  res.sendStatus(204);
});

// Remove tarefas pelo ID

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.put('/tarefas/:id', (req, res) => {
  const tarefa = tarefas.find(t => t.id == req.params.id);

  if (!tarefa) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }

  tarefa.titulo = req.body.titulo;

  res.json(tarefa);
});

//procura tarefa pelo ID, altera o título e retorna o resultado
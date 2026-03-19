import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState('');

  const api = 'http://localhost:3001/tarefas';

  useEffect(() => {
    carregar();
  }, []);

  const carregar = async () => {
    const res = await axios.get(api);
    setTarefas(res.data);
  };

  const adicionar = async () => {
    await axios.post(api, { titulo });
    setTitulo('');
    carregar();
  };

  const deletar = async (id) => {
    await axios.delete(`${api}/${id}`);
    carregar();
  };

  return (
  <div className="container">
    <h1>Lista de Tarefas</h1>

    <div className="input-group">
      <input
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Digite uma tarefa"
      />
      <button className="add-btn" onClick={adicionar}>
        Adicionar
      </button>
    </div>

    {tarefas.length === 0 && <p>Nenhuma tarefa adicionada</p>} 
    <ul>
      {tarefas.map((t) => (
        <li key={t.id}>
          {t.titulo}
          <button
            className="delete-btn"
            onClick={() => deletar(t.id)}
          >
            Excluir
          </button>
        </li>
      ))}
    </ul>
  </div>
);
}

//useState: Guarda os dados da tela
//useEffect: Executa quando abre a página
//axios: Faz requisição ao Backend

export default App;
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [novoTitulo, setNovoTitulo] = useState('');

  const api = `${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/tarefas`;;

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

  const editar = async (id) => {
  if (!novoTitulo.trim()) return;

  await axios.put(`${api}/${id}`, { titulo: novoTitulo });

  setEditandoId(null);
  setNovoTitulo('');
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
          {editandoId === t.id ? (
    <>
      <input
        value={novoTitulo}
        onChange={(e) => setNovoTitulo(e.target.value)}
      />
      <button onClick={() => editar(t.id)}>Salvar</button>
    </>
  ) : (
    <>
      {t.titulo}

      <button onClick={() => {
        setEditandoId(t.id);
        setNovoTitulo(t.titulo);
      }}>
        ✏️
      </button>

      <button
        className="delete-btn"
        onClick={() => deletar(t.id)}
      >
        🗑️
      </button>
    </>
  )}
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
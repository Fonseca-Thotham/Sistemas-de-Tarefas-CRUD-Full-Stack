import { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div style={{ padding: '20px' }}>
      <h1>Lista de Tarefas</h1>

      <input
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Digite uma tarefa"
      />

      <button onClick={adicionar}>Adicionar</button>

      <ul>
        {tarefas.map((t) => (
          <li key={t.id}>
            {t.titulo}
            <button onClick={() => deletar(t.id)}>Excluir</button>
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
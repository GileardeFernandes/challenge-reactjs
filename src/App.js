import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";
import { wait } from "@testing-library/react";

function App() {

  const [repositories, setRepositories] = useState([]);

  async function loadRepositories() {
    const response = await api.get('/repositories');
    setRepositories(response.data);
  }

  useEffect(() => {
    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const data = {
      title: `Projeto ${Date.now()}`,
      url: 'https://github.com/GileardeFernandes/beTheHero',
      techs: 'Nodejs, Express'
    }
    const response = await api.post('repositories', data);
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const repositoryIndex = repositories.findIndex(obj => obj.id === id);
    repositories.splice(repositoryIndex, 1);
    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
             </button>
          </li>

        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

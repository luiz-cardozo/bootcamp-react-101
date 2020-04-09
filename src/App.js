import React, { useState, useEffect } from 'react';
import api from './services/api';
import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Node 101',
      url: 'http://.../.../node-101',
      techs: ['Node', 'e nada mais'],
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    let repositoriesIndex;
    api
      .delete(`repositories/${id}`)
      .then(
        (repositoriesIndex = repositories.findIndex(
          (repository) => repository.id === id
        ))
      )
      .then(repositories.splice(repositoriesIndex, 1))
      .then(setRepositories([...repositories]));
  }

  useEffect(() => {
    api.get('repositories').then((response) => setRepositories(response.data));
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories &&
          repositories.map((repository) => (
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

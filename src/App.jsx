  import { useState, useEffect } from 'react';

// Custom Hook: Encapsula a lógica de sincronização com o localStorage
const useStorageState = (key, initialState) => {
  // Usa o useState para gerenciar o estado local
  const [value, setValue] = useState(
    // Recupera o valor do localStorage usando a chave fornecida ou usa o estado inicial
    localStorage.getItem(key) || initialState
  );

  // Usa o useEffect para sincronizar o estado com o localStorage sempre que 'value' ou 'key' mudar
  useEffect(() => {
    localStorage.setItem(key, value); // Salva o valor no localStorage com a chave fornecida
  }, [value, key]); // Dependências: 'value' e 'key'

  // Retorna o estado e a função de atualização como um array
  return [value, setValue];
};

const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  // Usando o custom hook useStorageState para gerenciar o estado de searchTerm
  // A chave 'search' é usada para armazenar o valor no localStorage
  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search search={searchTerm} onSearch={handleSearch} />

      <hr />

      <List list={searchedStories} />
    </div>
  );
};

const Search = ({ search, onSearch }) => (
  <div>
    <label htmlFor="search">Search: </label>
    <input
      id="search"
      type="text"
      value={search}
      onChange={onSearch}
    />
  </div>
);

const List = ({ list }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item} />
    ))}
  </ul>
);

const Item = ({ item }) => (
  <li>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
  </li>
);

export default App;
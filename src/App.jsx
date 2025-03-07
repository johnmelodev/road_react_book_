import { useState, useEffect, useRef } from "react";

const useStorageState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const App = () => {
  const stories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [searchTerm, setSearchTerm] = useStorageState("search", "React");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <hr />

      <List list={searchedStories} />
    </div>
  );
};

const InputWithLabel = ({
  id,
  value,
  type = "text",
  onInputChange,
  isFocused,
  children,
}) => {
  // (A) Primeiro, criamos uma ref com o Hook useRef do React.
  // Esse objeto de referência mantém seu valor persistente durante a vida útil do componente.
  // Ele possui uma propriedade chamada current, que pode ser alterada.
  const inputRef = useRef();

  // (C) Em seguida, utilizamos o Hook useEffect para executar o foco no campo de entrada assim que ele for renderizado.
  useEffect(() => {
    if (isFocused && inputRef.current) {
      // (D) Como a ref está associada ao elemento, seu current fornece acesso direto ao campo de entrada.
      // Chamamos focus() programaticamente, mas somente se isFocused estiver ativo e current existir.
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>&nbsp;
      {/* (B) Depois, passamos essa ref para o atributo ref do elemento JSX.
          Assim, a instância do elemento fica associada à propriedade current da ref. */}
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};

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

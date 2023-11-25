import "./styles.css";
import React from "react";
import Item from "./components/Item";

const MyContext = React.createContext(null);

export default function App() {
  const [state, setState] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    fetch(
      `https://jsonplaceholder.typicode.com/photos?_limit=${currentPage * 20}`,
    )
      .then((response) => response.json())
      .then((json) => setState(json));
  }, [currentPage]);

  const increment = () => {
    setCurrentPage(currentPage + 1);
  };
  const decrement = () => {
    setCurrentPage(currentPage - 1);
  };

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      0.5
    ) {
      increment();
    }
  };

  React.useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [window.scrollY]);

  return (
    <MyContext.Provider value={state} currentPage={currentPage}>
      <div className="App">
        <h1>{state.length}</h1>
      </div>
      <div className="Images__list">
        {state.map((item) => (
          <Item object={item} />
        ))}
      </div>
      <div className="pagination">
        <b>{currentPage}</b>
      </div>
    </MyContext.Provider>
  );
}

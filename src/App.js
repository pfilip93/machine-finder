import React from "react";
import "./App.scss";

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

export default function App() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [data, setData] = React.useState(null);
  const [list, setList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  async function fetchData() {
    const res = await fetch("data.json");
    const json = await res.json();

    return json;
  }

  const generateList = () => {
    setLoading(true);

    const getProducts = (phrase) => {
      const arr = data
        .map((group) => {
          const products = group.products.filter((prod) => {
            const name = prod.name.toLowerCase();
            const words = phrase.split(" ");

            let valid = true;

            for (let i = 0; i < words.length; i++) {
              if (name.indexOf(words[i]) === -1) {
                valid = false;
                break;
              }
            }

            return valid;
          });

          return products.length
            ? {
                ...group,
                products,
              }
            : null;
        })
        .filter((item) => item);

      return arr;
    };

    if (data) {
      const phrase = name.toLowerCase().trim();
      const products = phrase.length ? getProducts(phrase) : [];

      setList(products);
    } else {
      (async () => {
        setData(await fetchData());
      })();
    }

    setLoading(false);
  };

  React.useEffect(() => {
    if (name) {
      generateList();
    }
  }, [name]);

  return (
    <div className="App">
      <header>
        <h1>klickrent</h1>
      </header>
      <main>
        <button onClick={() => setOpen(true)}>Start inquiry</button>
      </main>

      {open && (
        <div className="modal">
          <div className="topBar">
            <h2>Direct request</h2>
            <button
              className="close"
              aria-label="Close"
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>

          <input
            className="name"
            type="text"
            placeholder="Machine name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          {loading ? (
            <h3 className="message">Loading....</h3>
          ) : (
            <>
              {!!(name && !list.length) && (
                <h3 className="message">No results....</h3>
              )}

              <div className="list">
                {list.map((group) => (
                  <div key={group.name}>
                    <h3>{group.name}</h3>
                    <ul>
                      {group.products.map((prod) => (
                        <li key={prod.name}>{prod.name}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

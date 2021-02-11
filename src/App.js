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

          <div className="list">
            <h3>Category #1</h3>
            <ul>
              <li>Lorem ipsum</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

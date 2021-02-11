import React from "react";
import "./App.scss";

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
              x
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

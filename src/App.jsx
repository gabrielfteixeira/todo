import { useState } from "react";

function App() {
  //State (estado)
  const [message, setMessage] = useState("Ola mundo");

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={() => setMessage("Ola fui clicado")}>
        Mudar mensagem
      </button>
    </div>
  );
}

export default App;

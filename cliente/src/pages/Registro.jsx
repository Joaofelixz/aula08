import { useState } from "react";

export default function Registrar() {
 const [nome, setNome] = useState('');
 const [email, setEmail] = useState('');

  const registrar = (event) =>{
event.preverDefault();
 await fetch ("htpps")
  }

  return (
        <main>
          <form action="">
            <input type="text" value={nome} onChange={(event)=> setNome(event.target.value)}/>
            <input type="email" value={email} onChange={(event)=> setEmail(event.target.value)}/>
            <button>Salvar</button>
          </form>
        </main>
  );
}
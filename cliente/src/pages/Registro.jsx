import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registrar() {
 const [nome, setNome] = useState('');
 const [email, setEmail] = useState('');

   const navigate = useNavigate();

  const registrar = async(event) =>{
event.preverDefault();
 try{
  const resposta = await fetch("http://localhost:3000/usuarios",{
    method: 'POST',
    headers: {'constent-type': 'Application/json'},
    body: JSON.stringify({
      nome: nome,
      email: email
    })
  });
 if (resposta.ok){
  navigate('/');
 } 
}catch(err){
  alert('erro no registro!', err);
}
  }

  return (
        <main>
          <form action="" onSubmit={registrar}>
            <input type="text" value={nome} onChange={(event)=> setNome(event.target.value)}/>
            <input type="email" value={email} onChange={(event)=> setEmail(event.target.value)}/>
            <button>Salvar</button>
          </form>
        </main>
  );
}
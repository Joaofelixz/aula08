import { useEffect, useState } from "react";
import {jsPDF} from "jspdf";
import "jspdf-autotable";
import {button} from '@mui/material';

export default function Home() {

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/usuarios");
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch {
        alert('Ocorreu um erro no app!');
      }
    }
    buscarUsuario();
  }, [usuarios])

  const remover = async(id) => {
    try{
      await fetch('http://localhost:3000/usuarios/'+id,{
        method: 'delete'
      });      
    }catch{
      alert('ixi lascou')
    }
  };

      const exportPDF = () => {
        const doc = new jsPDF ();
        const tabelaDados = usuarios.map((usuario) => [
          usuario.nome,
          usuario.email,
        ]);

        doc.text("Lista de Usuário", 10, 10);
        doc.autoTable({
          head: [["nome", "E-mail"]],
          body: tabelaDados,
        });
        
        doc.save("alunosIFMS.pdf");
      };

  return (
    <table>
      <tr>
        <td>Nome</td>
        <td>E-mail</td>
      </tr>
      {usuarios.map((usuario) =>
        <tr key={usuario.id}>
          <td>{usuario.nome}</td>
          <td>{usuario.email}</td>
          <td><button onClick={() => remover(usuario.id)}/>remover</td>
        </tr>
      )}
    </table>
  );
}
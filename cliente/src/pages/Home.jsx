import { useEffect, useState } from "react";
import ListaProdutos from '../components/ListaProdutos';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import homeStyles from '../styles/Home.module.css';

export default function Home() {
    const [ListaCarros, setListaCarros] = useState([]);
    useEffect(() => {
        const buscarCarro = async () => {
          try {
            const resposta = await fetch("http://localhost:3000/carros");
            const dados = await resposta.json();
            setListaCarros(dados);
          } catch (error) {
            console.error(error);
          }
        };
        buscarCarro();
      }, []);

      if(ListaCarros.length === 0){
        return(
            <h1>Lista vazia</h1>
        )
      }

      const RemoverCarro = async (id) => {
        try {
          const resposta = await fetch(`http://localhost:3000/carros/${id}`, {
            method: "DELETE",
          });
          if (!resposta.ok) {
            throw new Error('Erro ao remover o carro');
          }
          const novaLista = ListaCarros.filter((carro) => carro.id !== id);
          setListaCarros(novaLista);
        } catch (error) {
          console.error("Erro ao remover o carro:", error);
        }
      };

    return (
        <>
            <div>
                <Carousel infiniteLoop useKeyboardArrows autoPlay showArrows={true} showStatus={false} showThumbs={false} dynamicHeight>
                    <div>
                        <img src="https://wyantgroup.com/wp-content/uploads/2017/02/porsche-banner-3.jpg" />
                    </div>
                    <div>
                        <img src="https://www.porsche-moscow.ru/files/43765/normal.jpg" />
                    </div>
                    <div>
                        <img src="https://gld-creative.s3.us-west-2.amazonaws.com/2024-porsche-911-gt3---banner-74b5c565b28f-1920x600.png" />
                    </div>
                </Carousel>
            </div>
            <div className={homeStyles.centerListaProdutos}>
                <h1 className={homeStyles.titleProdutos}>HOME</h1>
                <a href="/registro">
                <button>Registrar Carro</button></a>
                    <div className={ListaCarros.displayProdutos}>
                    <ListaProdutos produtos={ListaCarros} removerCarro={RemoverCarro}/>
                </div>
            </div>
        </>
    );
}
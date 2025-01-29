const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

let carros = [
    {
        id: 1,
        nomeCarro: "Porsche 911 Carrera",
        marca: "Porsche",
        imagem: "https://autoentusiastas.com.br/ae/wp-content/uploads/2020/07/Porsche-911_Turbo_S-2021-1024-02.jpg",
        cor: 'Preto',
        preco: 99000
    },
    {
        id: 2,
        nomeCarro: "Porsche 911 Turbo S",
        marca: "Porsche",
        imagem: "https://autoentusiastas.com.br/ae/wp-content/uploads/2020/07/Porsche-911_Turbo_S-2021-1024-02.jpg",
        cor: 'Branco',
        preco: 160000
    },
    {
        id: 3,
        nomeCarro: "Porsche Taycan 4S",
        marca: "Porsche",
        imagem: "https://autoentusiastas.com.br/ae/wp-content/uploads/2020/07/Porsche-911_Turbo_S-2021-1024-02.jpg",
        cor: 'Azul',
        preco: 120000
    },
    {
        id: 4,
        nomeCarro: "Porsche Macan S",
        marca: "Porsche",
        imagem: "https://autoentusiastas.com.br/ae/wp-content/uploads/2020/07/Porsche-911_Turbo_S-2021-1024-02.jpg",
        cor: 'Prata',
        preco: 60000
    },
    {
        id: 5,
        nomeCarro: "Porsche Cayenne E-Hybrid",
        marca: "Porsche",
        imagem: "https://autoentusiastas.com.br/ae/wp-content/uploads/2020/07/Porsche-911_Turbo_S-2021-1024-02.jpg",
        cor: 'Verde',
        preco: 85000
    },
    {
        id: 6,
        nomeCarro: "Porsche 718 Cayman",
        marca: "Porsche",
        imagem: "https://autoentusiastas.com.br/ae/wp-content/uploads/2020/07/Porsche-911_Turbo_S-2021-1024-02.jpg",
        cor: 'Amarelo',
        preco: 55000
    },
    {
        id: 7,
        nomeCarro: "Porsche 718 Boxster",
        marca: "Porsche",
        imagem: "https://autoentusiastas.com.br/ae/wp-content/uploads/2020/07/Porsche-911_Turbo_S-2021-1024-02.jpg",
        cor: 'Vermelho',
        preco: 59000
    },
    {
        id: 8,
        nomeCarro: "Porsche 911 GT3",
        marca: "Porsche",
        imagem: "https://autoentusiastas.com.br/ae/wp-content/uploads/2020/07/Porsche-911_Turbo_S-2021-1024-02.jpg",
        cor: 'Cinza',
        preco: 170000
    },
    {
        id: 9,
        nomeCarro: "Porsche Panamera 4",
        marca: "Porsche",
        imagem: "https://autoentusiastas.com.br/ae/wp-content/uploads/2020/07/Porsche-911_Turbo_S-2021-1024-02.jpg",
        cor: 'Dourado',
        preco: 95000
    },
    {
        id: 10,
        nomeCarro: "Porsche 911 GT2 RS",
        marca: "Porsche",
        imagem: "https://autoentusiastas.com.br/ae/wp-content/uploads/2020/07/Porsche-911_Turbo_S-2021-1024-02.jpg",
        cor: 'Laranja',
        preco: 250000
    },
    {
        id: 11,
        nomeCarro: "Porsche Taycan Turbo",
        marca: "Porsche",
        imagem: "https://autoentusiastas.com.br/ae/wp-content/uploads/2020/07/Porsche-911_Turbo_S-2021-1024-02.jpg",
        cor: 'Rosa',
        preco: 140000
    },
    {
        id: 12,
        nomeCarro: "Porsche Macan GTS",
        marca: "Porsche",
        imagem: "https://autoentusiastas.com.br/ae/wp-content/uploads/2020/07/Porsche-911_Turbo_S-2021-1024-02.jpg",
        cor: 'Preto Fosco',
        preco: 95000
    }
];

app.post('/carros', (req, res) => {
    const { nomeCarro, marca, imagem, cor, preco } = req.body;
    
    if (!nomeCarro || !marca || !imagem || !cor || !preco) {
        return res.status(400).json({ erro: 'Nome do carro, marca, imagem, cor e preço são obrigatórios' });
    }    
    
    const novoCarro = { id: carros.length + 1, nomeCarro, marca, imagem, cor, preco };
    carros.push(novoCarro);
    
    res.status(201).json(novoCarro);
});

app.get('/carros', (req, res) => {
    res.status(200).json(carros);
});

app.get('/carros/:id', (req, res) => {
    const { id } = req.params;
    const carro = carros.find(u => u.id === parseInt(id));
    
    if (!carro) {
        return res.status(404).json({ erro: 'Carro não encontrado' });
    }
    
    res.status(200).json(carro);
});

app.put('/carros/:id', (req, res) => {
    const { id } = req.params;
    const { nomeCarro, marca, imagem, cor, preco } = req.body;
    
    const carro = carros.find(u => u.id === parseInt(id));
    
    if (!carro) {
        return res.status(404).json({ erro: 'Carro não encontrado' });
    }
    
    carro.nomeCarro = nomeCarro || carro.nomeCarro;
    carro.marca = marca || carro.marca;
    carro.imagem = imagem || carro.imagem;
    carro.cor = cor || carro.cor;
    carro.preco = preco || carro.preco;
    
    res.status(200).json(carro);
});

app.delete('/carros/:id', (req, res) => {
    const { id } = req.params;
    const index = carros.findIndex(u => u.id === parseInt(id));
    
    if (index === -1) {
        return res.status(404).json({ erro: 'Carro não encontrado' });
    }
    
    carros.splice(index, 1);
    res.status(204).send();
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

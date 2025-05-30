import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import Disco from './models/disco';

const app = express();
const PORT = 3000;
const MONGODB_URI = 'mongodb://localhost:27017/disco_collection';

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log("Erro ao conectar ao MongoDB:", err));

// Rotas CRUD
// Cadastrar disco
app.post('/discos', async (req, res) => {
  try {
    const novoDisco = new Disco({
      titulo: req.body.titulo,
      artista: req.body.artista,
      ano: req.body.ano,
      genero: req.body.genero,
      formato: req.body.formato,
      preco: req.body.preco
    });
    const discoSalvo = await novoDisco.save();
    res.status(201).json(discoSalvo);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar disco', error });
  }
});

// Listar todos os discos
app.get('/discos', async (req, res) => {
  try {
    const discos = await Disco.find();
    res.json(discos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar discos' });
  }
});

// Atualizar disco
app.put('/discos/:id', async (req, res) => {
  try {
    const discoAtualizado = await Disco.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(discoAtualizado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar disco' });
  }
});

// Excluir disco
app.delete('/discos/:id', async (req, res) => {
  try {
    await Disco.findByIdAndDelete(req.params.id);
    res.json({ message: 'Disco excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir disco' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// npm start para conectar o banco
// Acessar a aplicação pelo navegador: http://localhost:3000
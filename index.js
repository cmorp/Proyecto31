import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getPosts, addPosts } from './database/consultas.js';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server initialized in port http://localhost:${PORT}`));

app.get('/posts', async (req, res) => {
    const rows = await getPosts();
    res.json(rows);
})

app.post('/posts', async (req, res) => {
    const { titulo, img, descripcion, likes } = req.body;
    const rows = await addPosts(titulo, img, descripcion, likes);
    res.json({ titulo, img, descripcion, likes });
})
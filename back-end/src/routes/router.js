import { Router } from "express";
import pool from '../db/mysql.js';

const app = Router();

// Rota de login
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Consulta o banco para verificar o email e senha
        const query = 'SELECT id, email, nome FROM usuarios WHERE email = ? AND senha = ?';
        const [rows] = await pool.query(query, [email, senha]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Email ou senha incorretos!' });
        }

        // Retorna os dados do usuário
        res.status(200).json({
            message: 'Login realizado com sucesso!',
            user: rows[0], // Retorna os dados do usuário
        });
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        res.status(500).json({ message: 'Erro ao realizar login!' });
    }
});

app.post('/cadastro', async (req, res) => {
    const { nome, email, senha, dt_nascimento, ocupacao } = req.body;

    try {
        // Verifica se o email já está cadastrado
        const checkQuery = 'SELECT id FROM usuarios WHERE email = ?';
        const [existingUser] = await pool.query(checkQuery, [email]);

        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'Email já está cadastrado!' });
        }

        // Insere o novo usuário no banco de dados
        const insertQuery = `
            INSERT INTO usuarios (nome, email, senha, dt_nascimento, ocupacao)
            VALUES (?, ?, ?, ?, ?)
        `;
        await pool.query(insertQuery, [nome, email, senha, dt_nascimento, ocupacao]);

        res.status(201).json({ message: 'Cadastro realizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao realizar cadastro:', error);
        res.status(500).json({ message: 'Erro ao realizar cadastro!' });
    }
});

app.get('/conteudos', async (req, res) => {
    try {
        // Consulta no banco para buscar os conteúdos
        const query = 'SELECT id, nome, descricao FROM conteudos';
        const [rows] = await pool.query(query);

        // Retorna os conteúdos
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao buscar conteúdos:', error);
        res.status(500).json({ message: 'Erro ao buscar conteúdos!' });
    }
});

// Rota para buscar subtópicos de um conteúdo
app.get('/subtopicos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Consulta para buscar subtópicos do conteúdo pelo ID
        const query = `
            SELECT id, nome
            FROM subtopicos
            WHERE cont_id = ?
        `;
        const [rows] = await pool.query(query, [id]);

        // Retorna os subtópicos encontrados
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao buscar subtópicos:', error);
        res.status(500).json({ message: 'Erro ao buscar subtópicos!' });
    }
});

// Rota para buscar os conteúdos
app.get('/subtopico/:id/:tipo', async (req, res) => {
    const { id, tipo } = req.params;

    // Valida se o tipo é válido
    const validTypes = ['texto_teoria', 'video_aulas', 'questoes', 'gabaritos'];
    if (!validTypes.includes(tipo)) {
        return res.status(400).json({ message: 'Tipo inválido!' });
    }

    try {
        // Busca o subtópico do banco
        const query = `SELECT ${tipo} FROM subtopicos WHERE id = ?`;
        const [rows] = await pool.query(query, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Subtópico não encontrado!' });
        }

        res.status(200).json({ content: rows[0][tipo] });
    } catch (error) {
        console.error('Erro ao buscar subtópico:', error);
        res.status(500).json({ message: 'Erro ao buscar subtópico!' });
    }
});

//rota para favoritar um subtopico
app.post('/favorito', async (req, res) => {
    const { userId, subtipoId } = req.body;

    if (!userId || !subtipoId) {
        return res.status(400).json({ message: 'Dados insuficientes.' });
    }

    try {
        const query = 'INSERT INTO favoritos (id_usuario, sub_id) VALUES (?, ?)';
        await pool.query(query, [userId, subtipoId]);

        res.status(200).json({ message: 'Subtópico favoritado com sucesso!' });
    } catch (error) {
        console.error('Erro ao favoritar:', error);
        res.status(500).json({ message: 'Erro ao favoritar o subtópico.' });
    }
});

//Rota para pegar todos os favoritos
app.get('/favoritos/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const query = `
            SELECT 
                s.id AS subtopicoId, 
                s.nome, 
                s.texto_teoria 
            FROM 
                favoritos f
            INNER JOIN 
                subtopicos s ON f.sub_id = s.id
            WHERE 
                f.id_usuario = ?`;
        const [rows] = await pool.query(query, [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Nenhum favorito encontrado.' });
        }

        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao buscar favoritos:', error);
        res.status(500).json({ message: 'Erro ao buscar favoritos.' });
    }
});

//Rota para verificar se o subtópico está favortitado
app.get('/favorito/:userId/:subtipoId', async (req, res) => {
    const { userId, subtipoId } = req.params;

    try {
        const query = 'SELECT * FROM favoritos WHERE id_usuario = ? AND sub_id = ?';
        const [rows] = await pool.query(query, [userId, subtipoId]);

        res.status(200).json({ favorited: rows.length > 0 });
    } catch (error) {
        console.error('Erro ao verificar favorito:', error);
        res.status(500).json({ message: 'Erro ao verificar favorito.' });
    }
});

// Verificar se o subtópico foi favoritado
app.get('/favorito/:userId/:subtipoId', async (req, res) => {
    const { userId, subtipoId } = req.params;

    try {
        const query = 'SELECT * FROM favoritos WHERE id_usuario = ? AND sub_id = ?';
        const [rows] = await pool.query(query, [userId, subtipoId]);

        res.status(200).json({ favorited: rows.length > 0 });
    } catch (error) {
        console.error('Erro ao verificar favorito:', error);
        res.status(500).json({ message: 'Erro ao verificar favorito.' });
    }
});

//rota de remover um favorito
app.delete('/favorito', async (req, res) => {
    const { userId, subtipoId } = req.body;

    try {
        const query = 'DELETE FROM favoritos WHERE id_usuario = ? AND sub_id = ?';
        await pool.query(query, [userId, subtipoId]);

        res.status(200).json({ message: 'Subtópico removido dos favoritos!' });
    } catch (error) {
        console.error('Erro ao remover favorito:', error);
        res.status(500).json({ message: 'Erro ao remover favorito.' });
    }
});

//Rota para concluir um subtopico
app.post('/concluido', async (req, res) => {
    const { userId, subtipoId } = req.body;

    if (!userId || !subtipoId) {
        return res.status(400).json({ message: 'Dados insuficientes.' });
    }

    try {
        const query = 'INSERT INTO concluidos (id_usuario, sub_id) VALUES (?, ?)';
        await pool.query(query, [userId, subtipoId]);

        res.status(200).json({ message: 'Subtópico concluído com sucesso!' });
    } catch (error) {
        console.error('Erro ao concluir:', error);
        res.status(500).json({ message: 'Erro ao marcar o subtópico como concluído.' });
    }
});

//Rota para pegar todos os concluidos de um usuário
app.get('/concluidos/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const query = `
            SELECT 
                s.id AS subtopicoId, 
                s.nome, 
                s.texto_teoria 
            FROM 
                concluidos c
            INNER JOIN 
                subtopicos s ON c.sub_id = s.id
            WHERE 
                c.id_usuario = ?`;
                
        const [rows] = await pool.query(query, [userId]);

        console.log('Resultado da consulta:', rows);

        if (rows.length === 0) {
            console.log('Nenhum subtópico encontrado para o usuário:', userId);
            return res.status(200).json([]);
        }

        res.status(200).json(rows); // Retorna os subtópicos concluídos
    } catch (error) {
        console.error('Erro ao buscar concluídos:', error);
        res.status(500).json({ message: 'Erro ao buscar subtópicos concluídos.' });
    }
});

// Verificar se o subtópico foi concluido
app.get('/concluido/:userId/:subtipoId', async (req, res) => {
    const { userId, subtipoId } = req.params;

    try {
        const query = 'SELECT * FROM concluidos WHERE id_usuario = ? AND sub_id = ?';
        const [rows] = await pool.query(query, [userId, subtipoId]);

        res.status(200).json({ concluded: rows.length > 0 });
    } catch (error) {
        console.error('Erro ao verificar concluído:', error);
        res.status(500).json({ message: 'Erro ao verificar concluído.' });
    }
});

//rota de remover um concluido
app.delete('/concluido', async (req, res) => {
    const { userId, subtipoId } = req.body;

    try {
        const query = 'DELETE FROM concluidos WHERE id_usuario = ? AND sub_id = ?';
        await pool.query(query, [userId, subtipoId]);

        res.status(200).json({ message: 'Subtópico removido dos concluídos!' });
    } catch (error) {
        console.error('Erro ao remover concluído:', error);
        res.status(500).json({ message: 'Erro ao remover concluído.' });
    }
});

export default app;
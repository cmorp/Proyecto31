import pkg from 'pg';

const { Pool } = pkg;


const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    port: 5433,
    password: 'cmp123',
    database: 'likeMe',
    allowExitOnIdle: true
});


const getPosts = async () => {
    const { rows } = await pool.query("SELECT * FROM posts");
    return rows;
}

const addPosts = async (titulo, img, descripcion, likes) => {
    try {
        const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4) RETURNING *";
        const values = [titulo, img, descripcion, likes];
        const result = await pool.query(consulta, values);
        const message = "Post agregado exitosamente.";
        return message;
    } catch (error) {
        error.json({
            message: "Error al agregar registro."
        });
    }
}

module.exports = {
    getPosts,
    addPosts
}
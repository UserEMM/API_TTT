const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Middleware para analizar el cuerpo de las solicitudes JSON

const connection = mysql.createConnection({
    host: '138.59.135.33',
    user: 'tiusr38pl_pruebaEMM',
    password: 'Ihnu00&34',
    database: 'estebanM'
});

app.get('/', (req, res) => {
    return res.json("server");
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.stack);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');
});

app.post('/guardar-datos', (req, res) => {
    const { jugador1, jugador2, ganador, fecha_partida, hora } = req.body;
    const fechaFormateada = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const date = new Date();
    const horaFormateada = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();


    const sql = `INSERT INTO partidas (jugador1, jugador2, ganador, fecha_partida, hora) VALUES (?, ?, ?, ?, ?)`;
    const values = [jugador1, jugador2, ganador, fechaFormateada, horaFormateada];

    connection.query(sql, values, (error, results, fields) => {
        if (error) {
            console.error('Error al guardar los datos:', error.stack);
            return res.status(500).json({ message: 'Error al guardar los datos en la base de datos' });
        }

        console.log('Datos guardados correctamente en la base de datos');
        return res.status(200).json({ message: 'Datos guardados correctamente en la base de datos' });
    });
});

app.get('/obtener-datos', (req, res) => {
    const sql = 'SELECT * FROM partidas';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Error al obtener los datos:', error.stack);
            return res.status(500).json({ message: 'Error al obtener los datos de la base de datos' });
        }

        res.status(200).json(results);
    });
});

// Iniciar el servidor
const PORT = 5175;
app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto: http://localhost:${PORT}`);
});

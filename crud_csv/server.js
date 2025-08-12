import mysql from 'mysql2';
import fs from 'fs';
import csv from 'csv-parser';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Qwe.123*',
  database: 'db_test'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log('Coneccted a MySQL');

  const createTableSql = `
    CREATE TABLE IF NOT EXISTS clients (
      id_client INT PRIMARY KEY,
      name VARCHAR(100),
      address VARCHAR(200),
      email VARCHAR(150),
      phone VARCHAR(15)
    );
  `;

  connection.query(createTableSql, (err) => {
    if (err) {
      console.error('Error creating clients table:', err);
      return;
    }

    const csvPath = 'data_test.csv';
    if (fs.existsSync(csvPath)) {
      fs.createReadStream(csvPath)
        .pipe(csv())
        .on('data', (row) => {
          connection.query(
            'INSERT IGNORE INTO clients (id_client, name, email, address, phone) VALUES (?, ?, ?, ?, ?)',
            [row.id_client, row.name, row.email, row.address, row.phone],
            (err) => {
              if (err) console.error('Error inserting CSV row:', err);
            }
          );
        })
        .on('end', () => {
          console.log('CSV processed');
        });
    } else {
      console.log('Dosent found data_test.csv');
    }
  });
});


app.get('/clients', (req, res) => {
  connection.query('SELECT * FROM clients ORDER BY id_client', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error getting users' });
    res.json(results);
  });
});


app.get('/clients/:id_client', (req, res) => {
  const { id_client } = req.params;
  connection.query('SELECT * FROM clients WHERE id_client = ?', [id_client], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error getting users' });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(results[0]);
  });
});

app.post('/clients', (req, res) => {
  const { id_client, name, email, address, phone } = req.body;
  if (!id_client || !name || !email) {
    return res.status(400).json({ error: 'id_client, name and email are required' });
  }
  connection.query(
    'INSERT INTO clients (id_client, name, email, address, phone) VALUES (?, ?, ?, ?, ?)',
    [id_client, name, email, address, phone || null],
    (err) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'El ID ya existe' });
        }
        return res.status(500).json({ error: 'Server failed' });
      }
      res.status(201).json({ message: 'Added user' });
    }
  );
});


app.put('/clients/:id_client', (req, res) => {
  const { id_client } = req.params;
  const { name, email, address, phone } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }
  connection.query(
    'UPDATE clients SET name = ?, email = ?, address = ?, phone = ? WHERE id_client = ?',
    [name, email, address || null, phone || null, id_client],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Failed to uptade the users' });
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User doesnt found' });
      }
      res.json({ message: 'User updated successfully' });
    }
  );
});


app.delete('/clients/:id_client', (req, res) => {
  const { id_client } = req.params;
  connection.query('DELETE FROM clients WHERE id_client = ?', [id_client], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar usuario' });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User doesnt found' });
    }
    res.json({ message: 'User deleted' });
  });
});

app.listen(PORT, () => {
  console.log(`Running server on http://localhost:${PORT}`);
});


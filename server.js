const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Imposta la directory per i file statici (CSS, immagini, ecc.)
app.use(express.static(path.join(__dirname, 'public')));

// Imposta il motore di template Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Route principale (homepage)
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});


app.get('/obiettivi', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'obiettivi.json');
    const data = fs.readFileSync(filePath);
    const obiettivi = JSON.parse(data);
  
    res.render('obiettivi', { title: 'Obiettivi 2030', obiettivi });
  });
  

  app.get('/api/obiettivi', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'obiettivi.json');
    const data = fs.readFileSync(filePath);
    const obiettivi = JSON.parse(data);
    res.json(obiettivi);
  });

// Avvia il server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server avviato su http://localhost:${PORT}`);
});

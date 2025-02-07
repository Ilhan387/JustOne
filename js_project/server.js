const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public')); // Sert les fichiers statiques (HTML, CSS, JS)

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
   console.log(`Serveur lancé sur http://localhost:${port}`);
});
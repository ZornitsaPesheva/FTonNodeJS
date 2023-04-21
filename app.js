const express = require('express');
const fs = require('fs');

const app = express();
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
  res.render('index', { data });
});

app.post('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
  data.push(req.body);
  fs.writeFileSync('./data.json', JSON.stringify(data));
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
import express from 'express';
import cors from 'cors';
import parse from './parser';
const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

app.get('/task1', (req, res) => {
  const sum = (+req.query.a || 0) + (+req.query.b || 0);
  res.send(sum.toString());
});

app.get('/nested_config', (req, res) => {
  const fileName = req.query.file || 'config.env';
  parse(__dirname + '/' + fileName, (obj) => {
    res.send(JSON.stringify(obj, null, '\t'));
  });
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});

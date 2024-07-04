
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let data = [
    {
        "name": "AVM",
        "email": "abc@gmail.com"
    },
    {
        "name": "AVM",
        "email": "bcd@gmail.com"
    },
    {
        "name": "AVM",
        "email": "abc@gmail.com"
    },
    {
        "name": "AVM",
        "email": "bcd@gmail.com"
    },  {
        "name": "AVM",
        "email": "abc@gmail.com"
    },
    {
        "name": "AVM",
        "email": "bcd@gmail.com"
    }
];

app.get('/api/data', (req, res) => {
  res.json(data);
});

app.post('/api/data', (req, res) => {
  const newData = req.body;
  data.push(newData);
  res.json(newData);
});

app.put('/api/data/:index', (req, res) => {
  const index = req.params.index;
  data[index] = req.body;
  res.json(data[index]);
});

app.delete('/api/data/:index', (req, res) => {
  const index = req.params.index;
  data.splice(index, 1);
  res.json({ message: 'Deleted successfully' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

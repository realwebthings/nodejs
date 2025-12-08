import express from 'express';

const app = express();
app.use(express.json());

const requestLogger = (req, res, next) => {
      const timestamp = new Date();
  const {method} = req;
  console.log(`${method.toUpperCase()} request received`);
  console.log(timestamp);
    next();
};

app.use(requestLogger);

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.post('/api/v1/users', (req, res) => {
    console.log(req.body);
    res.send('User created');
});

app.listen(3000, () => {
    console.log('Server running on port 3000', 'http://localhost:3000');
});
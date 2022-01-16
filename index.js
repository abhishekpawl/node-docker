const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require('./config/config');

const postRouter = require('./routes/postRoutes');

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

/* logic to handle state before mongo is initialized */
const connectWithRetry = () => {
  mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Successfully connected to DB"))
  .catch((err) => {
    console.log(err)
    setTimeout(connectWithRetry, 5000)
  });
};

connectWithRetry();

app.get('/', (req, res) => {
  res.json([
    {
      name: 'Abhishek Paul',
      profile: 'personal',
      email: 'abhishek.paulcp.dbs@gmail.com'
    }
  ])
})

app.use(express.json());
app.use('/api/v1/posts', postRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port:${port}...`);
})
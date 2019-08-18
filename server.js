const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const postRouter = require('./posts/postRouter.js');
const userRouter = require('./users/userRouter.js');

const server = express();

const bodyParser = express.json();
server.use(bodyParser);

server.use(helmet());
server.use(morgan('dev'));

server.use(logger);
server.use(addName);

server.use('/api/posts', postRouter);
server.use('./api/users', userRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';
  res.send(`
  <h2>Let's write some middleware!</h2>
  <p>Welcome${nameInsert} to the Lambda Users API</p>
  `);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} Request`);
  next();
};

function addName(req, res, next) {
  req.name = "Cassandra";
  next();
}

module.exports = server;

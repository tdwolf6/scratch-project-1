const path = require('path');
const express = require('express');

const timerHistoryRouter = require('./routes/timerHistory.js');
const projectsRouter = require('./routes/projects.js');

const app = express();

const PORT = 3000;

app.use(express.json());

// add your api routers here
app.use('/api/projects', projectsRouter);
app.use('/api/timerHistory', timerHistoryRouter);

app.get('/', (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'))
);

app.use((req, res) => res.sendStatus(500));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;

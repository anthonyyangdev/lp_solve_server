import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import uuidv4 from 'uuid/v4';
import shelljs from 'shelljs';
import bodyParser from 'body-parser';

const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
  next();
});

app.post('/', (req, res) => {
  var content = req.body.code
  var TEMP = `${uuidv4()}.lp`
  fs.appendFile(TEMP, content, function (err) {
    if (err) throw err;
  });
  shelljs.exec(`echo "${content}" >> ${TEMP}`)
  var lp_solver = shelljs.exec(`lp_solve -S -S7 ${TEMP}`)

  fs.unlink(TEMP, function (err) {
    if (err) throw err;
  });
  res.send({
    result: lp_solver,
    status: lp_solver.code,
    error: lp_solver.stderr
  })
})

app.listen(3000, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
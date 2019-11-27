require('dotenv/config');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = require('express')()
const getModelFromContent = require('./Interpreter/interpretToModel')
const lpsolve = require('./Solver/lpsolve')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req: any, res: any) => {
  const content = req.body.content
  const model = getModelFromContent(content)
  const result = lpsolve(model)
  res.send({
    result
  })
})

app.listen(3000, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
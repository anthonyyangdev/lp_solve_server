require('dotenv/config');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = require('express')()
const getModelFromContent = require('./Parser')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
  next();
});

app.post('/', (req, res) => {
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
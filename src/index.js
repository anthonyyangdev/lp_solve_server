require('dotenv/config');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = require('express')()

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
  next();
});

app.post('/', (req, res) => {
  
})

app.listen(3000, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
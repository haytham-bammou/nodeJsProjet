const express = require('express')
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended : false })); 

app.use('/' , require('./routes/users'))

const PORT = process.env.PORT || 3000;
app.listen(PORT , ()=> console.log('listening on port 3000'));
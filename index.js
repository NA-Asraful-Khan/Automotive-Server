const express = require ('express');
const app = express();
const cors = require('cors');
const { dbConnection } = require('./db/dbConnect');
var reviewRoute = require('./routes/review.routes')
var toolRoute = require('./routes/tool.routes')
var orderRoute = require('./routes/order.routes')
var userRoute = require('./routes/user.routes')
var updateRoute = require('./routes/update.routes')
require('dotenv').config();

const PORT = process.env.PORT||8000
//middlewares
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());

//routes
app.use('/Review',reviewRoute )
app.use('/Tool',toolRoute )
app.use('/Order', orderRoute)
app.use('/User', userRoute)
app.use('/Update', updateRoute)

const server=()=>{
    dbConnection()
    app.listen(PORT,()=>{
        console.log(`Server is listening to http://localhost:${PORT}`)
    })
}

server()

app.get('/',(req,res)=>{
    res.send('hello World')
})

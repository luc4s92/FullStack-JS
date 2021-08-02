const express = require('express')
//const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
const port = process.env.PORT || 5000

app.use(express.urlencoded({extended: false}))

app.use(express.json())

//MySql
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'lucas',
    password: '1234',
    database: 'lucas'
})

app.get('', (req, res) =>{

    pool.getConnection((err, connection) =>{
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from budgets', (err, rows) =>{
            connection.release()

            if(!err){
                res.send(rows)
            }else{
                console.log(err)
            }
        })

    })
})

//Listen on enviroment port or 5000
app.listen(port, () =>{
    console.log(`Listen on port ${port}`)
})


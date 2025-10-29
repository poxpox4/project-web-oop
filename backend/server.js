import express from "express";
import cors from "cors";
import mysql from 'mysql2';
import morgan from "morgan";

const app = express();
app.use(cors());
app.use(express.json())

let db = null;
const connect = async ()=>{
    db = await mysql.createConnection({
        host:'mysql',
        user:'user',
        password:'numerja',
        port:3306,
        database:'numer'
})
}

//get root
app.get('/root',(req,res)=>{
    const sql = 'SELECT * FROM root Order BY RAND() LIMIT 4'

    db.query(sql,(error,result)=>{
        if(error){
            res.json('error')
        }else{
            res.json(result)
        }
    })
})
//post root
app.post('/root', (req, res) => {
    const { equation } = req.body;
    const sql = 'INSERT INTO root (Equation) VALUES (?)';

    db.query(sql, [equation], (error, result) => {
        if (error) {
            console.error('Error inserting data:', error);
            res.status(500).json({ message: 'Database insert error' });
        } else {
            res.json({
                success: true,
                message: 'Inserted successfully',
                insertedId: result.insertId
            });
        }
    });
});

//get integration
app.get('/integration', (req, res) => {
    const sql = 'SELECT * FROM integration ORDER BY RAND() LIMIT 4';

    db.query(sql, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'Database error' });
        } else {
            res.json(result);
        }
    });
});
//post integration
app.post('/integration', (req, res) => {
    const { equation } = req.body;
    const sql = 'INSERT INTO integration (Equation) VALUES (?)';

    db.query(sql, [equation], (error, result) => {
        if (error) {
            console.error('Error inserting data:', error);
            res.status(500).json({ message: 'Database insert error' });
        } else {
            res.json({
                success: true,
                message: 'Inserted successfully',
                insertedId: result.insertId
            });
        }
    });
});

app.listen(5000,async ()=>{
    await connect();
    console.log('server started');
})
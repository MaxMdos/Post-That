const express = require('express')
const router = express.Router(); 
const bodyParser = require('body-parser')
const path = require('path');
const {Pool} = require('pg'); 
const db = require('../db/db')

router.use(express.static(path.join(__dirname, 'public')));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

const connectionString = 'postgresql://max:12345678@localhost:5432/bulletinboard'
const pool = new Pool ({
    connectionString: connectionString
})

// routes
router.get('/', (req, res)=>{
    const getTexts = 'SELECT * FROM messages'
    pool.query(getTexts, (err, result)=>{
        if (err) throw err;
            if (result.rows[0] == null){
                console.log('no boards added!')
            } else {
                console.log(result.rows[0])
            }
            res.render('pages/bulletin-output',{
                result: result,
                title: 'All the boards!',
                link:'/input',
                linked:'Create and Post your board!'
            })
    })
})

router.get('/input',(req,res)=>{
    res.render('pages/bulletin-input',{
        title:'write and submit your post!',
        link:'/',
        linked:'Boards'
    })
})

router.post('/bullet-input', (req,res)=>{
    const addTexts = 'INSERT INTO messages (title, body) VALUES ($1,$2)'
    const formPost = {
        title: req.body.title,
        body: req.body.body
    }
    pool.query(addTexts, [formPost.title, formPost.body], (err, result)=>{
        if (err) throw err;
        console.log(result); 
    })
})


module.exports = router
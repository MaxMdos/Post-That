// gathering the requirements
const express = require('express'); 
const app = express(); 
const path = require('path');
const router = require('./routes/router')
const PORT = process.env.PORT || 8080

// setting view engine to ejs
app.set('view engine', 'ejs');

// public folder 
app.use(express.static(path.join(__dirname,'public')));

// body parser
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

// db connection
// const connectionString = 'postgresql://max:12345678@localhost:5432/bulletinboard'
// const pool = new Pool ({
//     connectionString: connectionString
// })

// // routes
// app.get('/', (req, res)=>{
//     const getTexts = 'SELECT * FROM messages'
//     pool.query(getTexts, (err, result)=>{
//         if (err) throw err;
//             if (result.rows[0] == null){
//                 console.log('no boards added!')
//             } else {
//                 console.log(result.rows[0])
//             }
//             res.render('pages/bulletin-output',{
//                 result: result,
//                 title: 'All the boards!'
//             })
//     })
// })

// app.get('/input',(req,res)=>{
//     res.render('pages/bulletin-input',{title:'write and submit your post!'})
// })

// app.post('/bullet-input', (req,res)=>{
//     const addTexts = 'INSERT INTO messages (title, body) VALUES ($1,$2)'
//     const formPost = {
//         title: req.body.title,
//         body: req.body.body
//     }
//     pool.query(addTexts, [formPost.title, formPost.body], (err, result)=>{
//         if (err) throw err;
//         console.log(result); 
//     })
// })

app.use('/',router);

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT} `);
});
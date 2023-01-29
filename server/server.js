import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';
const app = express();


const port = 8080;

/** Middlewares */
// app.use(express.limit(100000000));
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

/**Routers */
app.use('/api',router);


/** HTTP Request */
app.get('/',(req, res)=>{
    res.status(200).json('Make request on /api/');
})


/** Starting Server and listing */
connect().then(()=>{
   try {
        app.listen(port, ()=>{
            console.log(`Server started listing on port ${port}`);
        })
   } catch (error) {
        console.log(error);
   }
}).catch((error)=>{
    console.log('Invalid Database connection',error)
})



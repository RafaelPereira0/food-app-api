import express from 'express';
import authRouter from './app/routes/auth.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/auth', authRouter);

app.listen(3000, () => {
    console.log('server rodando')
})

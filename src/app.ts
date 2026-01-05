import express from 'express';
import 'dotenv/config'
import authRouter from './app/routes/auth.routes';
import userRoute from './app/routes/user.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/auth', authRouter);
app.use('/user', userRoute);

app.listen(3000, () => {
    console.log('server rodando')
})

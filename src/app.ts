import express from 'express';
import 'dotenv/config'
import restaurantRoute from './app/routes/restaurant.routes';
import authRouter from './app/routes/auth.routes';
import userRoute from './app/routes/user.routes';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/auth', authRouter);
app.use('/user', userRoute);
app.use('/restaurant', restaurantRoute)


app.listen(4000, () => {
    console.log('Rodando servidor porta 4000')
})

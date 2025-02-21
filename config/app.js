'use strict'

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { createAdmin } from '../src/auth/auth.controller.js'
import { addDefaultCategory } from '../src/category/category.controller.js'
import { limiter } from '../middlewares/rate.limit.js'
import authRotes from '../src/auth/auth.routes.js'
import userRotes from '../src/user/user.routes.js'
import categoryRotes from '../src/category/category.routes.js'
import postRoutes from '../src/publications/publications.routes.js'

const config = (app)=>{
    app.use(express.json());
    app.use(express.urlencoded({extended: true}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(limiter)
}

const routes = (app)=>{
    app.use('/v1/auth',authRotes)
    app.use('/v1/user', userRotes)
    app.use('/v1/category', categoryRotes)
    app.use('/v1/post', postRoutes)
}

export const initServer = ()=>{
    const app = express()
    try {
        config(app);
        routes(app);
        createAdmin();
        addDefaultCategory()
        app.listen(process.env.PORT)
        console.log(`Servidor iniciado en el puerto ${process.env.PORT}`)
    } catch (error) {
        console.error('Server init failed', error);
    }
}
import express, { Request, Response } from 'express'
import VideogamesUseCases from '../../application/videogames.usecases';
import Videogame from '../../domain/Videogame'
import VideogamesRepository from '../../domain/Videogame.repository';
import VideogamesRepositoryPostgres from '../db/videogames.repository.postgres';

const router = express.Router();
const videogamesRepository : VideogamesRepository = new VideogamesRepositoryPostgres();
const videogamesUseCases : VideogamesUseCases = new VideogamesUseCases(videogamesRepository)

router.get("/", async (req:Request , res: Response) => {
    try{
        const videogames : Videogame[] = await videogamesUseCases.getAllGames();
        res.send(videogames)
    }catch(error){
        console.error(error)
    }
})

router.post("/add",async (req:Request, res: Response) => {
    try{
        const videogame : Videogame = {
            name : req.body.name,
            price : req.body.price,
        }

        const newVideogame : Videogame = await videogamesUseCases.addGame(videogame);

        res.send(newVideogame);
    }catch(error){
        console.error(error);
    }
})


export {router as routerVideogames}
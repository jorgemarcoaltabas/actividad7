import express, { Request, Response } from 'express'
import VideogamesUseCases from '../../application/videogames.usecases';
import Videogame from '../../domain/Videogame'
import VideogamesRepository from '../../domain/Videogame.repository';
import VideogamesRepositoryPostgres from '../db/videogames.repository.postgres';
import { isAuth, isAdmin } from '../../../context/security/auth';


const router = express.Router();
const videogamesRepository: VideogamesRepository = new VideogamesRepositoryPostgres();
const videogamesUseCases: VideogamesUseCases = new VideogamesUseCases(videogamesRepository)

router.get("/", async (req: Request, res: Response) => {
    try {
        const videogames: Videogame[] = await videogamesUseCases.getAllGames();
        res.json(videogames)
    } catch (error) {
        console.error(error)
    }
})

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const videogame: Videogame = await videogamesRepository.getOneGame(Number(req.params.id));
        res.json(videogame)
    } catch (err) {
        res.status(404).send();
    }
})

router.post("/", isAuth, isAdmin, async (req: Request, res: Response) => {
    try {

        const videogame: Videogame = {
            name: req.body.name,
            price: req.body.price,
        }

        const newVideogame: Videogame = await videogamesUseCases.addGame(videogame);
        res.json(newVideogame);
    } catch (error) {
        console.error(error);
    }
})

router.put("/:id", isAuth, isAdmin, async (req: Request, res: Response) => {
    try {
        const videogame: Videogame = {
            name: req.body.name,
            price: req.body.price,
        }
        console.log(videogame)
        console.log(req.params.id);
        const modifiedVideogame: Videogame = await videogamesUseCases.modifyGame(videogame, Number(req.params.id))
        res.json(modifiedVideogame);
    } catch (err) {
        console.error(err);
    }
})

router.delete("/:id", isAuth, isAdmin, async (req: Request, res: Response) => {
    try {

        console.log(req.params.id);
        const videogames: Videogame[] = await videogamesUseCases.deleteGame(Number(req.params.id))
        res.json(videogames);
    } catch (err) {
        console.error(err);
    }
})


export { router as routerVideogames }
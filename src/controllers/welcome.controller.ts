import { Router, Request, Response } from 'express'

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!');
});

const WelcomeController: Router = router;

module.exports = WelcomeController;

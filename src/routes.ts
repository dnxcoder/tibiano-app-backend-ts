import { Router } from 'express';
const router = Router();
import charBazaarControler from './controllers/charBazaarController';




router.get('/paginaTest', charBazaarControler.searchCharBaazar);


export default router;
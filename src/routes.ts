import { Router } from 'express';
const router = Router();
import charBazaarControler from './controllers/charBazaarController';



router.post('/searchCharBaazar', charBazaarControler.searchCharBaazar);


export default router;
import { Router } from 'express';
const router = Router();
import charBazaarControler from './controllers/charBazaarController';


router.get('/', (req,res)=>{ res.send('Welcome to Tibiano App Backend...')})
router.post('/searchCharBaazar', charBazaarControler.searchCharBaazar);


export default router;
import { Router } from 'express';
const router = Router();
import charBazaarControler from './controllers/charBazaarController';


router.get('/', (req, res) => { res.send('primeira pagina') })

router.get('/paginaTest', charBazaarControler.searchCharBaazar);


export default router;
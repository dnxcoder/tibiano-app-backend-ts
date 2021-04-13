import { Router } from 'express';
const router = Router();
import charBazaarControler from './controllers/charBazaarController';
import monstersKind from './controllers/monstersKind';



router.get('/', (req,res)=>{ res.send('Welcome to Tibiano App Backend...')});
router.post('/', (req,res)=>{res.send('Here im')});


router.post('/searchCharBaazar', charBazaarControler.searchCharBaazar);

router.get('/monstersKind', monstersKind.getMonstersOfKind);



export default router;
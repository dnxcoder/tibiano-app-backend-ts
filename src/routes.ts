import { Router } from 'express';
import boostedMonster from './controllers/boostedMonster';
const router = Router();
import charBazaarControler from './controllers/charBazaarController';
import monstersKind from './controllers/monstersKind';



router.get('/', (req, res) => { res.send('Welcome to Tibiano App Backend...') });
router.post('/', (req, res) => { res.send('Here im') });


router.post('/searchCharBaazar', charBazaarControler.searchCharBaazar);


router.get('/monstersKind', monstersKind.getMonstersOfKind);
router.get('/generateJsonTypesOfMonster', monstersKind.generateJsonTypesOfMonster);
router.post('/getBoostedCreature', boostedMonster.getBoostedCreatureFromWikiTibia);
router.post('/getDetailsMonster', monstersKind.getDetailsMonster);



export default router;
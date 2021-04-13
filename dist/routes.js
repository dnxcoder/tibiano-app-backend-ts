"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
var charBazaarController_1 = __importDefault(require("./controllers/charBazaarController"));
var monstersKind_1 = __importDefault(require("./controllers/monstersKind"));
router.get('/', function (req, res) { res.send('Welcome to Tibiano App Backend...'); });
router.post('/', function (req, res) { res.send('Here im'); });
router.post('/searchCharBaazar', charBazaarController_1.default.searchCharBaazar);
router.get('/monstersKind', monstersKind_1.default.getMonstersOfKind);
router.get('/getMonsterName', monstersKind_1.default.testGetMonsters);
exports.default = router;

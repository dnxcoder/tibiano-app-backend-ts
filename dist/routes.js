"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
var charBazaarController_1 = __importDefault(require("./controllers/charBazaarController"));
router.get('/', function (req, res) { res.send('primeira pagina'); });
router.get('/paginaTest', charBazaarController_1.default.searchCharBaazar);
exports.default = router;

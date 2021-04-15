"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var got_1 = __importDefault(require("got"));
var jsdom_1 = __importDefault(require("jsdom"));
var axios_1 = __importDefault(require("axios"));
var fs_1 = __importDefault(require("fs"));
var JSDOM = jsdom_1.default.JSDOM;
exports.default = {
    getMonstersOfKind: function (req, res) {
        var type = req.query.type;
        var monsterKindURL = "https://www.tibiawiki.com.br/wiki/" + type;
        try {
            got_1.default(monsterKindURL)
                .then(function (response) {
                var allDomPage = new JSDOM(response.body.toString()).window.document;
                var tableMonsters = allDomPage.querySelector('.sortable');
                var linesFromTableMonster = tableMonsters === null || tableMonsters === void 0 ? void 0 : tableMonsters.querySelectorAll('tr');
                var charactersInfoArray;
                if (linesFromTableMonster)
                    charactersInfoArray = Array.from(linesFromTableMonster).map(function (line) {
                        var linkImgFiltered = '';
                        var nameMonsterFiltered = '';
                        var hpFiltered = '';
                        var xpFiltered = '';
                        var charmFiltered = '';
                        var monsterName = line.querySelector('td:nth-child(1) a');
                        if (monsterName)
                            nameMonsterFiltered = monsterName === null || monsterName === void 0 ? void 0 : monsterName.innerHTML;
                        var linkImg = line.querySelector('td:nth-child(2)');
                        if (linkImg)
                            linkImg = linkImg === null || linkImg === void 0 ? void 0 : linkImg.querySelector('img');
                        if (linkImg)
                            linkImgFiltered = "https://tibiawiki.com.br/" + linkImg.getAttribute('src');
                        var hpColumn = line.querySelector('td:nth-child(3) ');
                        var aFromhpColumn = line.querySelector('td:nth-child(3) a');
                        if (aFromhpColumn) {
                            if (hpColumn) {
                                hpColumn.removeChild(aFromhpColumn);
                                hpFiltered = hpColumn.innerHTML;
                                hpFiltered = hpColumn.innerHTML.replace(/\n/g, '');
                                hpFiltered = hpFiltered.replace(' ', '');
                            }
                        }
                        var xpColumn = line.querySelector('td:nth-child(4) ');
                        var aFromXpColumn = line.querySelector('td:nth-child(4) a');
                        if (aFromXpColumn) {
                            if (xpColumn) {
                                xpColumn.removeChild(aFromXpColumn);
                                xpFiltered = xpColumn.innerHTML;
                                xpFiltered = xpFiltered.replace(/\n/g, ' ');
                                xpFiltered = xpFiltered.replace(/ /g, '');
                            }
                        }
                        var charmColumn = line.querySelector('td:nth-child(5)');
                        var aCharmColum = line.querySelector('td:nth-child(5) a');
                        if (aCharmColum) {
                            if (charmColumn) {
                                charmColumn.removeChild(aCharmColum);
                                charmFiltered = charmColumn.innerHTML;
                                charmFiltered = charmFiltered.replace(/\n/g, '');
                                charmFiltered = charmFiltered.replace(/ /g, '');
                            }
                        }
                        return ({
                            name: nameMonsterFiltered,
                            hp: hpFiltered,
                            xp: xpFiltered,
                            charm: charmFiltered,
                            link: linkImgFiltered
                        });
                    });
                charactersInfoArray.shift();
                res.json(charactersInfoArray);
            });
        }
        catch (error) {
            console.log('Aconteceu este erro aqui: ' + error);
        }
    },
    generateJsonTypesOfMonster: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var allMonsters, cont, typeOfMonsters;
        return __generator(this, function (_a) {
            allMonsters = [];
            cont = 0;
            typeOfMonsters = ['Anfíbios', 'Aquáticos', 'Aves', 'Constructos', 'Criaturas_Mágicas', 'Demônios', 'Dragões', 'Elementais',
                'Extra_Dimensionais', 'Fadas', 'Gigantes', 'Humanóides', 'Humanos', 'Licantropos', 'Mamíferos', 'Mortos-Vivos',
                'Répteis', 'Slimes'];
            typeOfMonsters.map(function (typeOfMonster, index) { return __awaiter(void 0, void 0, void 0, function () {
                var url, monstersEpecificType, contentFilePath, contentString;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = "https://www.tibiawiki.com.br/wiki/" + typeOfMonster;
                            return [4 /*yield*/, axios_1.default.get(url)
                                    .then(function (response) {
                                    var allDomPage = new JSDOM(response.data.toString()).window.document;
                                    var tableMonsters = allDomPage.querySelector('.sortable');
                                    var linesFromTableMonster = tableMonsters === null || tableMonsters === void 0 ? void 0 : tableMonsters.querySelectorAll('tr');
                                    var charactersInfoArray;
                                    if (linesFromTableMonster)
                                        charactersInfoArray = Array.from(linesFromTableMonster).map(function (line) {
                                            var linkImgFiltered = '';
                                            var nameMonsterFiltered = '';
                                            var hpFiltered = '';
                                            var xpFiltered = '';
                                            var charmFiltered = '';
                                            var monsterName = line.querySelector('td:nth-child(1) a');
                                            if (monsterName)
                                                nameMonsterFiltered = monsterName === null || monsterName === void 0 ? void 0 : monsterName.innerHTML;
                                            var linkImg = line.querySelector('td:nth-child(2)');
                                            if (linkImg)
                                                linkImg = linkImg === null || linkImg === void 0 ? void 0 : linkImg.querySelector('img');
                                            if (linkImg)
                                                linkImgFiltered = "https://tibiawiki.com.br/" + linkImg.getAttribute('src');
                                            var hpColumn = line.querySelector('td:nth-child(3) ');
                                            var aFromhpColumn = line.querySelector('td:nth-child(3) a');
                                            if (aFromhpColumn) {
                                                if (hpColumn) {
                                                    hpColumn.removeChild(aFromhpColumn);
                                                    hpFiltered = hpColumn.innerHTML;
                                                    hpFiltered = hpColumn.innerHTML.replace(/\n/g, '');
                                                    hpFiltered = hpFiltered.replace(' ', '');
                                                }
                                            }
                                            var xpColumn = line.querySelector('td:nth-child(4) ');
                                            var aFromXpColumn = line.querySelector('td:nth-child(4) a');
                                            if (aFromXpColumn) {
                                                if (xpColumn) {
                                                    xpColumn.removeChild(aFromXpColumn);
                                                    xpFiltered = xpColumn.innerHTML;
                                                    xpFiltered = xpFiltered.replace(/\n/g, ' ');
                                                    xpFiltered = xpFiltered.replace(/ /g, '');
                                                }
                                            }
                                            var charmColumn = line.querySelector('td:nth-child(5)');
                                            var aCharmColum = line.querySelector('td:nth-child(5) a');
                                            if (aCharmColum) {
                                                if (charmColumn) {
                                                    charmColumn.removeChild(aCharmColum);
                                                    charmFiltered = charmColumn.innerHTML;
                                                    charmFiltered = charmFiltered.replace(/\n/g, '');
                                                    charmFiltered = charmFiltered.replace(/ /g, '');
                                                }
                                            }
                                            return ({
                                                type: typeOfMonster,
                                                name: nameMonsterFiltered,
                                                hp: hpFiltered,
                                                xp: xpFiltered,
                                                charm: charmFiltered,
                                                link: linkImgFiltered
                                            });
                                        });
                                    charactersInfoArray.shift();
                                    return charactersInfoArray;
                                }).catch(function (error) {
                                    res.send('Este é o erro encontrado : ' + error);
                                })];
                        case 1:
                            monstersEpecificType = _a.sent();
                            allMonsters = allMonsters.concat(monstersEpecificType);
                            cont++;
                            if (typeOfMonsters.length === cont) {
                                contentFilePath = './src/generated/monsters.json';
                                contentString = JSON.stringify(allMonsters);
                                fs_1.default.writeFileSync(contentFilePath, contentString);
                                res.json(allMonsters);
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); },
    getDetailsMonster: function (req, res) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
        var imgLink = '';
        var nameMonster = '';
        var hp = '';
        var speed = '';
        var xp = '';
        var armor = '';
        var charms = '';
        var phisic = '';
        var earth = '';
        var fire = '';
        var death = '';
        var energy = '';
        var holy = '';
        var ice = '';
        var health = '';
        var comportament = '';
        var localization = '';
        var sounds = '';
        var loot = '';
        var story = '';
        var story2 = '';
        var html = req.body.html;
        var allDomPage = new JSDOM(html.toString()).window.document;
        var tableInfoBox = allDomPage.querySelector('.infobox');
        var rowInformation = tableInfoBox === null || tableInfoBox === void 0 ? void 0 : tableInfoBox.querySelector('tr');
        var imgDrag = rowInformation === null || rowInformation === void 0 ? void 0 : rowInformation.querySelector('td img');
        imgLink = "https://www.tibiawiki.com.br" + (imgDrag === null || imgDrag === void 0 ? void 0 : imgDrag.getAttribute('src'));
        var tableName = rowInformation === null || rowInformation === void 0 ? void 0 : rowInformation.querySelector('table');
        nameMonster = "" + ((_a = tableName === null || tableName === void 0 ? void 0 : tableName.querySelector('tr td font')) === null || _a === void 0 ? void 0 : _a.innerHTML);
        hp = "" + ((_b = tableName === null || tableName === void 0 ? void 0 : tableName.querySelector('tr:nth-child(2) td')) === null || _b === void 0 ? void 0 : _b.textContent);
        speed = "" + ((_c = tableName === null || tableName === void 0 ? void 0 : tableName.querySelector('tr:nth-child(2) td:nth-child(2)')) === null || _c === void 0 ? void 0 : _c.textContent);
        xp = "" + ((_d = tableName === null || tableName === void 0 ? void 0 : tableName.querySelector('tr:nth-child(3) td:nth-child(1)')) === null || _d === void 0 ? void 0 : _d.textContent);
        armor = "" + ((_e = tableName === null || tableName === void 0 ? void 0 : tableName.querySelector('tr:nth-child(3) td:nth-child(2)')) === null || _e === void 0 ? void 0 : _e.textContent);
        charms = "" + ((_f = tableName === null || tableName === void 0 ? void 0 : tableName.querySelector('tr:nth-child(4) td:nth-child(1)')) === null || _f === void 0 ? void 0 : _f.textContent);
        var tableElementals = rowInformation === null || rowInformation === void 0 ? void 0 : rowInformation.querySelector('td:nth-child(3) table');
        phisic = "" + ((_g = tableElementals === null || tableElementals === void 0 ? void 0 : tableElementals.querySelector('table:nth-child(1) tr:nth-child(2) td:nth-child(1)')) === null || _g === void 0 ? void 0 : _g.textContent);
        phisic = phisic.replace(/Neutro a Físico/g, '').replace(/Forte a Físico/g, '').replace(/Fraco a Físico/g, '')
            .replace(/Imune a Físico/g, '');
        earth = "" + ((_h = tableElementals === null || tableElementals === void 0 ? void 0 : tableElementals.querySelector('table:nth-child(1) tr:nth-child(2) td:nth-child(2)')) === null || _h === void 0 ? void 0 : _h.textContent);
        earth = earth.replace(/Neutro a Terra/g, '').replace(/Forte a Terra/g, '').replace(/Fraco a Terra/g, '')
            .replace(/Imune a Terra/g, '');
        fire = "" + ((_j = tableElementals === null || tableElementals === void 0 ? void 0 : tableElementals.querySelector('table:nth-child(1) tr:nth-child(2) td:nth-child(3)')) === null || _j === void 0 ? void 0 : _j.textContent);
        fire = fire.replace(/Neutro a Fogo/g, '').replace(/Forte a Fogo/g, '').replace(/Fraco a Fogo/g, '')
            .replace(/Imune a Fogo/g, '');
        death = "" + ((_k = tableElementals === null || tableElementals === void 0 ? void 0 : tableElementals.querySelector('table:nth-child(1) tr:nth-child(2) td:nth-child(4)')) === null || _k === void 0 ? void 0 : _k.textContent);
        death = death.replace(/Neutro a Morte/g, '').replace(/Forte a Morte/g, '').replace(/Fraco a Morte/g, '')
            .replace(/Imune a Morte/g, '');
        energy = "" + ((_l = tableElementals === null || tableElementals === void 0 ? void 0 : tableElementals.querySelector('tr:nth-child(2) table tr:nth-child(2) td:nth-child(1)')) === null || _l === void 0 ? void 0 : _l.textContent);
        energy = energy.replace(/Neutro a Energia/g, '').replace(/Forte a Energia/g, '').replace(/Fraco a Energia/g, '')
            .replace(/Imune a Energia/g, '');
        holy = "" + ((_m = tableElementals === null || tableElementals === void 0 ? void 0 : tableElementals.querySelector('tr:nth-child(2) table tr:nth-child(2) td:nth-child(2)')) === null || _m === void 0 ? void 0 : _m.textContent);
        holy = holy.replace(/Neutro a Sagrado/g, '').replace(/Forte a Sagrado/g, '').replace(/Fraco a Sagrado/g, '')
            .replace(/Imune a Sagrado/g, '');
        ice = "" + ((_o = tableElementals === null || tableElementals === void 0 ? void 0 : tableElementals.querySelector('tr:nth-child(2) table tr:nth-child(2) td:nth-child(3)')) === null || _o === void 0 ? void 0 : _o.textContent);
        ice = ice.replace(/Neutro a Gelo/g, '').replace(/Forte a Gelo/g, '').replace(/Fraco a Gelo/g, '')
            .replace(/Imune a Gelo/g, '');
        health = "" + ((_p = tableElementals === null || tableElementals === void 0 ? void 0 : tableElementals.querySelector('tr:nth-child(2) table tr:nth-child(2) td:nth-child(4)')) === null || _p === void 0 ? void 0 : _p.textContent);
        health = health.replace(/Neutro a Cura/g, '').replace(/Forte a Cura/g, '').replace(/Fraco a Cura/g, '')
            .replace(/Imune a Cura/g, '');
        comportament = "" + ((_q = tableInfoBox === null || tableInfoBox === void 0 ? void 0 : tableInfoBox.querySelector('tbody tr:nth-child(8)')) === null || _q === void 0 ? void 0 : _q.textContent);
        localization = "" + ((_r = tableInfoBox === null || tableInfoBox === void 0 ? void 0 : tableInfoBox.querySelector('tbody tr:nth-child(9)')) === null || _r === void 0 ? void 0 : _r.textContent);
        sounds = "" + ((_s = tableInfoBox === null || tableInfoBox === void 0 ? void 0 : tableInfoBox.querySelector('tbody tr:nth-child(11)')) === null || _s === void 0 ? void 0 : _s.textContent);
        //loot = `${tableInfoBox?.querySelector('tbody tr:nth-child(12) td:nth-child(2)')?.textContent}`;
        //story = `${tableInfoBox?.querySelector('tbody tr:nth-child(16)')?.textContent}`;
        //localization = `${tableInfoBox?.querySelector('td[colspan="3"][style="padding-left: 4px;"]')?.innerHTML}`
        //sounds = `${tableInfoBox?.querySelector('td[colspan="3"][style="padding-left: 4px;"]')?.textContent}`
        loot = "" + ((_t = tableInfoBox === null || tableInfoBox === void 0 ? void 0 : tableInfoBox.querySelector('td[colspan="3"][style="border-bottom:1px dotted #CCCCCC;padding-left: 4px;"]')) === null || _t === void 0 ? void 0 : _t.textContent);
        story = "" + ((_u = tableInfoBox === null || tableInfoBox === void 0 ? void 0 : tableInfoBox.querySelector('div[style="font-family: Courier New, Courier, Arial Sans Unicode, Arial; color: #000; overflow: auto; white-space: auto;"]')) === null || _u === void 0 ? void 0 : _u.textContent);
        console.log(localization);
        res.json({
            imgLink: imgLink,
            hp: hp,
            xp: xp,
            speed: speed,
            armor: armor,
            charms: charms,
            phisic: phisic,
            earth: earth,
            fire: fire,
            death: death,
            energy: energy,
            holy: holy,
            ice: ice,
            health: health,
            comportament: comportament,
            localization: localization,
            sounds: sounds,
            loot: loot,
            story: story,
        });
    }
};

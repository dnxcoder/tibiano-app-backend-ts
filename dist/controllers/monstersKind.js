"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var got_1 = __importDefault(require("got"));
var jsdom_1 = __importDefault(require("jsdom"));
var JSDOM = jsdom_1.default.JSDOM;
exports.default = {
    getMonstersOfKind: function (req, res) {
        var type = req.query.type;
        var monsterKindURL = "https://www.tibiawiki.com.br/wiki/" + type;
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
            res.send(JSON.stringify(charactersInfoArray));
        });
    }
};

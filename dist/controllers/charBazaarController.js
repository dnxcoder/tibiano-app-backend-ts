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
var puppeteer_1 = __importDefault(require("puppeteer"));
var jsdom_1 = __importDefault(require("jsdom"));
var convertToSelectValues_1 = __importDefault(require("../functions/convertToSelectValues"));
var JSDOM = jsdom_1.default.JSDOM;
exports.default = {
    searchCharBaazar: function (req, res) {
        var _a = req.body, world = _a.world, vocation = _a.vocation, skill = _a.skill, minskill = _a.minskill, maxskill = _a.maxskill, minlevel = _a.minlevel, maxlevel = _a.maxlevel;
        var _b = convertToSelectValues_1.default(world, vocation, skill), vocationCode = _b.vocationCode, skillCode = _b.skillCode;
        try {
            (function () { return __awaiter(void 0, void 0, void 0, function () {
                var browser, page, characterInformation;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, puppeteer_1.default.launch({
                                headless: true,
                                args: ["--no-sandbox"]
                            })];
                        case 1:
                            browser = _a.sent();
                            return [4 /*yield*/, browser.newPage()];
                        case 2:
                            page = _a.sent();
                            return [4 /*yield*/, page.goto('https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades')];
                        case 3:
                            _a.sent();
                            if (!world) return [3 /*break*/, 5];
                            return [4 /*yield*/, page.select('select[name="filter_world"]', world)];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            if (!vocation) return [3 /*break*/, 7];
                            return [4 /*yield*/, page.select('select[name="filter_profession"]', vocationCode)];
                        case 6:
                            _a.sent();
                            _a.label = 7;
                        case 7:
                            if (!skill) return [3 /*break*/, 9];
                            return [4 /*yield*/, page.select('select[name="filter_skillid"]', skillCode)];
                        case 8:
                            _a.sent();
                            _a.label = 9;
                        case 9:
                            if (!minlevel) return [3 /*break*/, 11];
                            return [4 /*yield*/, page.type('input[name="filter_levelrangefrom"]', minlevel)];
                        case 10:
                            _a.sent();
                            _a.label = 11;
                        case 11:
                            if (!maxlevel) return [3 /*break*/, 13];
                            return [4 /*yield*/, page.type('input[name="filter_levelrangeto"]', maxlevel)];
                        case 12:
                            _a.sent();
                            _a.label = 13;
                        case 13:
                            if (!minskill) return [3 /*break*/, 15];
                            return [4 /*yield*/, page.type('input[name="filter_skillrangefrom"]', minskill)];
                        case 14:
                            _a.sent();
                            _a.label = 15;
                        case 15:
                            if (!maxskill) return [3 /*break*/, 17];
                            return [4 /*yield*/, page.type('input[name="filter_skillrangeto"]', maxskill)];
                        case 16:
                            _a.sent();
                            _a.label = 17;
                        case 17: return [4 /*yield*/, page.click('input[value="Apply"]')];
                        case 18:
                            _a.sent();
                            return [4 /*yield*/, page.waitForSelector('.Auction')];
                        case 19:
                            _a.sent();
                            return [4 /*yield*/, page.evaluate(function () {
                                    var auctionContainer = document.querySelectorAll('.Auction');
                                    var arrayAuction = Array.from(auctionContainer);
                                    var characterInformation = arrayAuction.map(function (item) {
                                        var linkImg = item.querySelector('.AuctionOutfitImage').src;
                                        var name = item.querySelector('.AuctionCharacterName a').text;
                                        var bid = item.querySelector('.ShortAuctionDataValue:nth-child(2) b').innerText;
                                        var freatures = item.querySelectorAll('.Entry');
                                        freatures = Array.from(freatures);
                                        freatures = freatures.map(function (div) { return div.innerText; });
                                        var auctionEndDate = item.querySelector('.AuctionTimer').innerText;
                                        var stringInformation = item.querySelector('.AuctionHeader').innerText;
                                        stringInformation = stringInformation.replace(/\n/gi, '');
                                        stringInformation = stringInformation.replace("" + name, '');
                                        stringInformation = stringInformation.replace('Level: ', '');
                                        stringInformation = stringInformation.replace('Vocation: ', '');
                                        stringInformation = stringInformation.replace('World: ', '');
                                        var arrayInfomation = stringInformation.split('|');
                                        console.log(freatures);
                                        return ({
                                            name: name,
                                            level: arrayInfomation[0],
                                            vocation: arrayInfomation[1],
                                            gender: arrayInfomation[2],
                                            world: arrayInfomation[3],
                                            bid: bid,
                                            endDate: auctionEndDate,
                                            img: linkImg,
                                            freatures: freatures,
                                        });
                                    });
                                    return characterInformation;
                                })];
                        case 20:
                            characterInformation = _a.sent();
                            page.close();
                            res.send(JSON.stringify(characterInformation));
                            return [2 /*return*/];
                    }
                });
            }); })();
        }
        catch (e) {
            res.send(JSON.stringify(e));
        }
    }
};

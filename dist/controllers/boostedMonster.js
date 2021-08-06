"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var jsdom_1 = require("jsdom");
var wikiBoostedCreatureURL = 'https://tibia.fandom.com/wiki/Boosted_Creature';
exports.default = {
    getBoostedCreatureFromWikiTibia: function (req, res) {
        axios_1.default.get(wikiBoostedCreatureURL)
            .then(function (response) {
            var allDomPage = new jsdom_1.JSDOM(response.data.toString()).window.document;
            var elementContainer = allDomPage.querySelector('.compact-box');
            var nameBoostedCreature = elementContainer.querySelector('a').text || '';
            var imgLink = elementContainer.querySelector("img[alt=\"" + nameBoostedCreature + "\"]").src;
            res.json({
                name: nameBoostedCreature,
                imgLink: imgLink
            });
        }).catch(function (error) {
            res.send('Não foi possivel obter boosted creature :' + error);
        });
    }
};

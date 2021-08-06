"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsdom_1 = require("jsdom");
exports.default = {
    getBoostedCreatureFromWikiTibia: function (req, res) {
        var html = req.body.html;
        var allDomPage = new jsdom_1.JSDOM(html.toString()).window.document;
        var elementContainer = allDomPage.querySelector('.compact-box');
        var nameBoostedCreature = elementContainer.querySelector('a').text || '';
        var imgLink = elementContainer.querySelector("img[alt=\"" + nameBoostedCreature + "\"]").src;
        res.json({
            name: nameBoostedCreature,
            imgLink: imgLink
        });
    }
};

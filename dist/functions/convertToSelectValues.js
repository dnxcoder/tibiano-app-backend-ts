"use strict";
//world, vocation, skills,
Object.defineProperty(exports, "__esModule", { value: true });
var convertToSelectValues = function (world, vocation, skill) {
    var vocationCode = '1';
    var skillCode = '';
    switch (vocation) {
        case 'Nenhuma' || null || undefined || '':
            vocationCode = '1';
            break;
        case 'Druid':
            vocationCode = '2';
            break;
        case 'Knight':
            vocationCode = '3';
            break;
        case 'Paladin':
            vocationCode = '4';
            break;
        case 'Sorcerer':
            vocationCode = '5';
            break;
    }
    switch (skill) {
        case 'Nenhuma' || null || undefined || '':
            skillCode = '';
            break;
        case 'Axe Fighting':
            skillCode = '10';
            break;
        case 'Club Fighting':
            skillCode = '9';
            break;
        case 'Distance Fighting':
            skillCode = '7';
            break;
        case 'Fishing':
            skillCode = '13';
            break;
        case 'Fist Fighting':
            skillCode = '11';
            break;
        case 'Magic Level':
            skillCode = '1';
            break;
        case 'Shielding':
            skillCode = '6';
            break;
        case 'Sword Fighting':
            skillCode = '8';
            break;
    }
    return { vocationCode: vocationCode, skillCode: skillCode };
};
exports.default = convertToSelectValues;

import { Request, Response } from 'express';
import got from 'got';
import jsdom from 'jsdom';
import axios from 'axios';
import fs from 'fs';

import puppeteer from 'puppeteer';


const { JSDOM } = jsdom;

interface iCharacterInformation {

    nameMonsterFiltered: string;
    hpFiltered: string;
    charmFiltered: string;
    linkImgFiltered: string;
}


export default {



    getMonstersOfKind: (req: Request, res: Response) => {

        const { type } = req.query;

        const monsterKindURL = `https://www.tibiawiki.com.br/wiki/${type}`


        try {
            got(monsterKindURL)
                .then(response => {

                    const allDomPage = new JSDOM(response.body.toString()).window.document;
                    const tableMonsters = allDomPage.querySelector('.sortable');
                    const linesFromTableMonster = tableMonsters?.querySelectorAll('tr');
                    var charactersInfoArray: any;


                    if (linesFromTableMonster) charactersInfoArray = Array.from(linesFromTableMonster).map((line) => {


                        let linkImgFiltered: string = '';
                        let nameMonsterFiltered: string = '';
                        let hpFiltered: string = '';
                        let xpFiltered: string = '';
                        let charmFiltered: string = '';


                        var monsterName = line.querySelector('td:nth-child(1) a');
                        if (monsterName) nameMonsterFiltered = monsterName?.innerHTML;

                        var linkImg = line.querySelector('td:nth-child(2)');
                        if (linkImg) linkImg = linkImg?.querySelector('img');
                        if (linkImg) linkImgFiltered = `https://tibiawiki.com.br/${linkImg.getAttribute('src')}`;


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

                        return (
                            {
                                name: nameMonsterFiltered,
                                hp: hpFiltered,
                                xp: xpFiltered,
                                charm: charmFiltered,
                                link: linkImgFiltered
                            }
                        )

                    });

                    charactersInfoArray.shift();
                    res.json(charactersInfoArray);
                });
        } catch (error) {
            console.log('Aconteceu este erro aqui: ' + error);
        }
    },



    generateJsonTypesOfMonster: async (req: Request, res: Response) => {

        let allMonsters: any = [];
        let cont = 0;

        const typeOfMonsters = ['Anfíbios', 'Aquáticos', 'Aves', 'Constructos', 'Criaturas_Mágicas', 'Demônios', 'Dragões', 'Elementais',
            'Extra_Dimensionais', 'Fadas', 'Gigantes', 'Humanóides', 'Humanos', 'Licantropos', 'Mamíferos', 'Mortos-Vivos',
            'Répteis', 'Slimes'];


        typeOfMonsters.map(async (typeOfMonster, index) => {


            const url = `https://www.tibiawiki.com.br/wiki/${typeOfMonster}`


            const monstersEpecificType = await axios.get(url)
                .then(response => {

                    const allDomPage = new JSDOM(response.data.toString()).window.document;
                    const tableMonsters = allDomPage.querySelector('.sortable');
                    const linesFromTableMonster = tableMonsters?.querySelectorAll('tr');
                    var charactersInfoArray: any;


                    if (linesFromTableMonster) charactersInfoArray = Array.from(linesFromTableMonster).map((line) => {


                        let linkImgFiltered: string = '';
                        let nameMonsterFiltered: string = '';
                        let hpFiltered: string = '';
                        let xpFiltered: string = '';
                        let charmFiltered: string = '';


                        var monsterName = line.querySelector('td:nth-child(1) a');
                        if (monsterName) nameMonsterFiltered = monsterName?.innerHTML;

                        var linkImg = line.querySelector('td:nth-child(2)');
                        if (linkImg) linkImg = linkImg?.querySelector('img');
                        if (linkImg) linkImgFiltered = `https://tibiawiki.com.br/${linkImg.getAttribute('src')}`;


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

                        return (
                            {
                                type: typeOfMonster,
                                name: nameMonsterFiltered,
                                hp: hpFiltered,
                                xp: xpFiltered,
                                charm: charmFiltered,
                                link: linkImgFiltered
                            }
                        )

                    });

                    charactersInfoArray.shift();
                    return charactersInfoArray;
                }).catch((error) => {

                    res.send('Este é o erro encontrado : ' + error);

                })

            allMonsters = allMonsters.concat(monstersEpecificType);
            cont++;
            if (typeOfMonsters.length === cont) {
                const contentFilePath = './src/generated/monsters.json'
                const contentString = JSON.stringify(allMonsters);
                fs.writeFileSync(contentFilePath, contentString);
                res.json(allMonsters);
            }
        });
    },

    getDetailsMonster: (req: Request, res: Response) => {


        let imgLink = '';
        let nameMonster = '';
        let hp = '';
        let speed = '';
        let xp = '';
        let armor = '';
        let charms = '';

        let phisic = '';
        let earth = '';
        let fire = '';
        let death = '';

        let energy = '';
        let holy = '';
        let ice = '';
        let health = '';

        let comportament = '';
        let localization = '';
        let sounds = '';
        let loot = '';
        let story = '';
        let story2= '';

        const { html } = req.body;


        const allDomPage = new JSDOM(html.toString()).window.document;
        const tableInfoBox = allDomPage.querySelector('.infobox');
        const rowInformation = tableInfoBox?.querySelector('tr');
        const imgDrag = rowInformation?.querySelector('td img');

        imgLink = `https://www.tibiawiki.com.br${imgDrag?.getAttribute('src')}`;

        const tableName = rowInformation?.querySelector('table');

        nameMonster = `${tableName?.querySelector('tr td font')?.innerHTML}`;

        hp = `${tableName?.querySelector('tr:nth-child(2) td')?.textContent}`;
        speed = `${tableName?.querySelector('tr:nth-child(2) td:nth-child(2)')?.textContent}`;
        xp = `${tableName?.querySelector('tr:nth-child(3) td:nth-child(1)')?.textContent}`;
        armor = `${tableName?.querySelector('tr:nth-child(3) td:nth-child(2)')?.textContent}`;
        charms = `${tableName?.querySelector('tr:nth-child(4) td:nth-child(1)')?.textContent}`;

        const tableElementals = rowInformation?.querySelector('td:nth-child(3) table');

        phisic = `${tableElementals?.querySelector('table:nth-child(1) tr:nth-child(2) td:nth-child(1)')?.textContent}`;
        phisic = phisic.replace(/Neutro a Físico/g, '').replace(/Forte a Físico/g, '').replace(/Fraco a Físico/g, '')
        .replace(/Imune a Físico/g, '');
        earth = `${tableElementals?.querySelector('table:nth-child(1) tr:nth-child(2) td:nth-child(2)')?.textContent}`;
        earth = earth.replace(/Neutro a Terra/g, '').replace(/Forte a Terra/g, '').replace(/Fraco a Terra/g, '')
        .replace(/Imune a Terra/g, '');
        fire = `${tableElementals?.querySelector('table:nth-child(1) tr:nth-child(2) td:nth-child(3)')?.textContent}`;
        fire = fire.replace(/Neutro a Fogo/g, '').replace(/Forte a Fogo/g, '').replace(/Fraco a Fogo/g, '')
        .replace(/Imune a Fogo/g, '');
        death = `${tableElementals?.querySelector('table:nth-child(1) tr:nth-child(2) td:nth-child(4)')?.textContent}`;
        death = death.replace(/Neutro a Morte/g, '').replace(/Forte a Morte/g, '').replace(/Fraco a Morte/g, '')
        .replace(/Imune a Morte/g, '');
        

        energy = `${tableElementals?.querySelector('tr:nth-child(2) table tr:nth-child(2) td:nth-child(1)')?.textContent}`;
        energy = energy.replace(/Neutro a Energia/g, '').replace(/Forte a Energia/g, '').replace(/Fraco a Energia/g, '')
        .replace(/Imune a Energia/g, '');
        holy = `${tableElementals?.querySelector('tr:nth-child(2) table tr:nth-child(2) td:nth-child(2)')?.textContent}`;
        holy = holy.replace(/Neutro a Sagrado/g, '').replace(/Forte a Sagrado/g, '').replace(/Fraco a Sagrado/g, '')
        .replace(/Imune a Sagrado/g, '');
        ice = `${tableElementals?.querySelector('tr:nth-child(2) table tr:nth-child(2) td:nth-child(3)')?.textContent}`;
        ice = ice.replace(/Neutro a Gelo/g, '').replace(/Forte a Gelo/g, '').replace(/Fraco a Gelo/g, '')
        .replace(/Imune a Gelo/g, '');
        health = `${tableElementals?.querySelector('tr:nth-child(2) table tr:nth-child(2) td:nth-child(4)')?.textContent}`;
        health = health.replace(/Neutro a Cura/g, '').replace(/Forte a Cura/g, '').replace(/Fraco a Cura/g, '')
        .replace(/Imune a Cura/g, '');


        comportament = `${tableInfoBox?.querySelector('tbody tr:nth-child(8)')?.textContent}`;
        localization = `${tableInfoBox?.querySelector('tbody tr:nth-child(9)')?.textContent}`;
        sounds = `${tableInfoBox?.querySelector('tbody tr:nth-child(11)')?.textContent}`;
        //loot = `${tableInfoBox?.querySelector('tbody tr:nth-child(12) td:nth-child(2)')?.textContent}`;
        //story = `${tableInfoBox?.querySelector('tbody tr:nth-child(16)')?.textContent}`;

        //localization = `${tableInfoBox?.querySelector('td[colspan="3"][style="padding-left: 4px;"]')?.innerHTML}`
        //sounds = `${tableInfoBox?.querySelector('td[colspan="3"][style="padding-left: 4px;"]')?.textContent}`
        loot = `${tableInfoBox?.querySelector('td[colspan="3"][style="border-bottom:1px dotted #CCCCCC;padding-left: 4px;"]')?.textContent}`;
        story = `${tableInfoBox?.querySelector('div[style="font-family: Courier New, Courier, Arial Sans Unicode, Arial; color: #000; overflow: auto; white-space: auto;"]')?.textContent}`;

        console.log(localization);

        res.json(
            {
                imgLink,
                hp,
                xp,
                speed,
                armor,
                charms,
                phisic,
                earth,
                fire,
                death,
                energy,
                holy,
                ice,
                health,
                comportament,
                localization,
                sounds,
                loot,
                story,
            }
        )
    }
}
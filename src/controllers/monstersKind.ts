import { Request, Response } from 'express';
import got from 'got';
import jsdom from 'jsdom';


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
                res.send(JSON.stringify(charactersInfoArray));
            });
    }



}
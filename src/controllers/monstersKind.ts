import { Request, Response } from 'express';
import got from 'got';
import jsdom from 'jsdom';
import axios from 'axios';


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

    testGetMonsters: (req: Request, res: Response) => {


        const { monsterName } = req.query;

        res.send(monsterName)
        //res.json(`Aqui esta o nome do monstro: ${monsterName}`)


    },

    testePostMonsters: (req: Request, res: Response) => {

        const { monsterName } = req.body;

        const browserHeaders: any = {

            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
            'cache-control': 'max-age=0',
            'cookie': 'sempre-mostrar-spoilers=true; denakop_freq={}; nvg46575=d06e62ae84e470b4177b4e5d309|0_98; __cfduid=d70d651d54de6b6618935b6826d9f50631618267554; __utmz=183949219.1618294104.80.66.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); __utmc=183949219; __gads=undefined; __utma=183949219.871223446.1608257887.1618336245.1618343462.82; __utmt=1; __cf_bm=f0cdf1ac099ac4aa24aa8ca7556e02b5e01d1fc0-1618343464-1800-AWM2nSJyCVyXes+TI5+ZAQzQiB89TEGQlr+Bnovpp49PGEk5D8X08uOR0x3uYk/aHu8PZVoVcOfsRBU+BFZ94kEBEYsRZVpuweLvSgXL35V30afDTs6nsQKq2kq0AxGmyQ==; __utmb=183949219.1.10.1618343462; __gads=ID=466b6aa7ec3d8a97:T=1618343466:S=ALNI_MaDMOYUCg6utcr8S8TS3Dc7tgqulw',
            'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'none',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36'
        }


        //const monsterKindURL = `https://www.tibiawiki.com.br/wiki/${monsterName}`

        const monsterKindURL = 'https://www.tibiawiki.com.br/wiki/Gigantes';

        const options = {
            headers: browserHeaders
        };

        axios.get(monsterKindURL, options)
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
            }).catch((error) => {

                res.send('Este é o erro encontrado : ' + error);

            })

    },



}
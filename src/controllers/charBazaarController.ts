import { Request, Response } from 'express';
import puppeteer from 'puppeteer';
import jsdom from 'jsdom';
import moment from 'moment';

import convertToSelectValues from '../functions/convertToSelectValues';

const { JSDOM } = jsdom;

export default {


    searchCharBaazar: (req: Request, res: Response) => {

        const { world, vocation, skill, minskill, maxskill, minlevel, maxlevel } = req.body;
        const { vocationCode, skillCode } = convertToSelectValues(world, vocation, skill);


        try {
            (async () => {

                const browser = await puppeteer.launch({
                    headless: true,
                    args: ["--no-sandbox"]
                });
                const page = await browser.newPage();
                await page.goto('https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades');

                if (world) await page.select('select[name="filter_world"]', world);
                if (vocation) await page.select('select[name="filter_profession"]', vocationCode);
                if (skill) await page.select('select[name="filter_skillid"]', skillCode);
                if (minlevel) await page.type('input[name="filter_levelrangefrom"]', minlevel);
                if (maxlevel) await page.type('input[name="filter_levelrangeto"]', maxlevel);
                if (minskill) await page.type('input[name="filter_skillrangefrom"]', minskill);
                if (maxskill) await page.type('input[name="filter_skillrangeto"]', maxskill);
                await page.click('input[value="Apply"]');
                await page.waitForSelector('.Auction');


                const characterInformation:any = await page.evaluate(() => {

                    var auctionContainer: NodeList;
                    auctionContainer = document.querySelectorAll('.Auction');



                    const arrayAuction = Array.from(auctionContainer);
                    let characterInformation: any;

                    if (arrayAuction.length != 0) {

                        characterInformation = arrayAuction.map((item: any) => {

                            const linkImg = item.querySelector('.AuctionOutfitImage').src;
                            const name = item.querySelector('.AuctionCharacterName a').text;
                            const bid = item.querySelector('.ShortAuctionDataValue:nth-child(2) b').innerText;
                            var freatures = item.querySelectorAll('.Entry');
                            freatures = Array.from(freatures);
                            freatures = freatures.map((div: HTMLDivElement) => { return div.innerText });
                            const getAuctionEndTimeStamp = item.querySelector('.AuctionTimer').getAttribute('data-timestamp');
                            let stringInformation: string = item.querySelector('.AuctionHeader').innerText;
                            stringInformation = stringInformation.replace(/\n/gi, '');
                            stringInformation = stringInformation.replace(`${name}`, '');
                            stringInformation = stringInformation.replace('Level: ', '');
                            stringInformation = stringInformation.replace('Vocation: ', '');
                            stringInformation = stringInformation.replace('World: ', '');
                            const arrayInfomation = stringInformation.split('|');


                            return (
                                {
                                    name: name,
                                    level: arrayInfomation[0],
                                    vocation: arrayInfomation[1],
                                    gender: arrayInfomation[2],
                                    world: arrayInfomation[3],
                                    bid: bid,
                                    endDate: getAuctionEndTimeStamp,
                                    img: linkImg,
                                    freatures: freatures,
                                });
                        });
                    } else { characterInformation = null }

                    return characterInformation;

                });

                page.close();
                res.send(JSON.stringify(characterInformation));

            })();
        } catch (e) {
            res.send(JSON.stringify(e));
        }

    }

}
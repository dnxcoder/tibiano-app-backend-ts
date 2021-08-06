import { Request, Response } from 'express';
import axios from 'axios';
import { JSDOM } from 'jsdom';


const wikiBoostedCreatureURL = 'https://tibia.fandom.com/wiki/Boosted_Creature';

export default {


    getBoostedCreatureFromWikiTibia(req: Request, res: Response) {

        axios.get(wikiBoostedCreatureURL)
            .then(response => {

                const allDomPage = new JSDOM(response.data.toString()).window.document;

                const elementContainer: any = allDomPage.querySelector('.compact-box');
                const nameBoostedCreature = elementContainer.querySelector('a').text || '';
                const imgLink = elementContainer.querySelector(`img[alt="${nameBoostedCreature}"]`).src;

                res.json({
                    name: nameBoostedCreature,
                    imgLink: imgLink
                })
            }).catch((error) => {

                res.send('Não foi possivel obter boosted creature :' + error)
            })

    }

}

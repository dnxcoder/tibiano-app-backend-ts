import { Request, Response } from 'express';
import { JSDOM } from 'jsdom';

export default {


    getBoostedCreatureFromWikiTibia(req: Request, res: Response) {

        const { html } = req.body;

        const allDomPage = new JSDOM(html.toString()).window.document;

        const elementContainer: any = allDomPage.querySelector('.compact-box');
        const nameBoostedCreature = elementContainer.querySelector('a').text || '';
        const imgLink = elementContainer.querySelector(`img[alt="${nameBoostedCreature}"]`).src;

        res.json({
            name: nameBoostedCreature,
            imgLink: imgLink
        })


    }


}

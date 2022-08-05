import axios from 'axios'
import { regions, events, genders, types } from '../../consts.js'

import scrapeRankings from '../../scrapers/results/scrape-rankings.js'

const rankings = async (req, res) => {
    var region = 'World'
    var event = '3'
    var gender = 'All'
    var type = 'single'

    if ('region' in req.query) {
        if (req.query.region in regions) {
            region = req.query.region
        }
        else {
            res.status(400).json({message: 'Invalid region'})
            return
        }
    }
    if ('event' in req.query) {
        if (req.query.event in events) {
            event = req.query.event
        }
        else {
            res.status(400).json({message: 'Invalid event'})
            return
        }
    }
    if ('gender' in req.query) {
        if (req.query.gender in genders) {
            gender = req.query.gender
        }
        else {
            res.status(400).json({message: 'Invalid gender'})
            return
        }
    }
    if ('type' in req.query) {
        if (req.query.type in types) {
            type = req.query.type
        }
        else {
            res.status(400).json({message: 'Invalid type'})
            return
        }
    }

    try {
        const rankings = await scrapeRankings(region.split(' ').join('+'), events[event], gender, type)
        if (rankings === null) {
            res.status(404).send()
            return
        }
        res.status(200).json(rankings);
        return
    }
    catch (error) {
        res.status(500).json({message: error})
        return
    }
}

export default rankings
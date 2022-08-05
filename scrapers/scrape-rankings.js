import axios from 'axios'
import cheerio from 'cheerio'

const scrapeRankings = async (region, event, gender, type) => {

    const path = `https://cubing.com/results/rankings?event=${event}&type=${type}&region=${region}&gender=${gender}&lang=en`

    console.log(path)

    const res = await axios.get(path)
    
    if (res.status == 404) {
        return null
    }

    const html = res.data
    const $ = cheerio.load(html)

    var data = []
    
    const rankings = $('table', html).children().last()
    
    rankings.children().each((i, elem) => {
        const children = $(elem).children().toArray()

        const id = $(children[0]).children().first().children().first().children().first().attr('data-id')
        const name = $(children[0]).children().first().children().first().children().first().attr('data-name')

        //const rank = $(children[1]).text()

        //So that people with the same result have a rank, instead of empty on the website

        const rank = i + 1

        const person_link = `https://www.worldcubeassociation.org/persons${$(children[2]).children().first().attr('href')}?lang=en`

        const region = $(children[3]).text()
        
        const result = $(children[4]).text()

        const competition_name = $(children[5]).children().first().text()

        const competition_link = `https://www.worldcubeassociation.org/persons${$(children[5]).children().first().attr('href')}?lang=en`

        const date = $(children[6]).text()

        data[i] = {
            rank: rank,
            person: {
                id: id,
                name: name,
                link: person_link,
                region: region,
            },
            result: result,
            competition: {
                name: competition_name,
                link: competition_link
            },
            date: date,
        }
    });

    return data;
}

export default scrapeRankings
import express from 'express'

import rankings from './results/rankings.js'

const app = new express()

app.get('/results/rankings', rankings)

app.listen(3000, () => {
    console.log('Listening')
})
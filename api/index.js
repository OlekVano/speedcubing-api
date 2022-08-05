import express from 'express'

import rankings from './rankings.js'

const app = new express()

app.get('/rankings', rankings)

app.listen(3000, () => {
    console.log('Listening')
})
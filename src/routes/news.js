const express = require('express')
const newsRouter = express.Router()
const axios = require('axios')

const root = 'localhost:3000/'

newsRouter.get('', async (req, res) => {
    try {
        const data = await axios.get(`/data.json`)
        console.log(data)
    } catch (err) {
        if (err.response) {
            res.render('news', { articles: null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.request) {
            res.render('news', { articles: null })
            console.log(err.requiest)
        } else {
            res.render('news', { articles: null })
            console.error('Error', err.message)
        }
    }
})

module.exports = newsRouter

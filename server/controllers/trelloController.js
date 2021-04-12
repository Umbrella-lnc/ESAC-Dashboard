const User = require('../models/User')
const axios = require('axios')

//Validation
const isEmpty = require('is-empty')

//Import env variables for trello api
const dotenv = require('dotenv')
dotenv.config()
const trelloURL = process.env.trelloURL
const trelloBoardId = process.env.trelloBoardId
const trelloToken = process.env.trelloToken
const trelloKey = process.env.trelloKey

// @route POST api/trello/getCards
// @desc Get cards from trello page
// @access logged in user
//  + req.user => current logged in user object
//  + req.body.toDoList
const getCards = async (req, res) => {
    const listId = req.body.listId
    axios
        .get(
            trelloURL +
                'lists/' +
                listId +
                '/cards?' +
                'key=' +
                trelloKey +
                '&' +
                'token=' +
                trelloToken +
                '&response_type=token'
        )
        .then((trello_res) => {
            res.json(trello_res.data)
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json(err)
        })
}

// @route POST api/trello/getLists
// @desc Get columns from trello board given board id
// @access logged in user
//  + req.user => current logged in user object
//  + req.body.boardId = id of the board.
const getLists = async (req, res) => {
    res.json(response)

    axios
        .get(
            trelloURL +
                'boards/' +
                trelloBoardId +
                'lists?' +
                'key=' +
                trelloKey +
                '&' +
                'token=' +
                trelloToken +
                '&response_type=token'
        )
        .then((trello_res) => {
            res.json(trello_res.data)
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json(err)
        })
}

exports.getCards = getCards

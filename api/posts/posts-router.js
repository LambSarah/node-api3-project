const express = require('express')

const Posts = require('./posts-model')

const router = express.Router()

router.get('/', (req, res) => {
	Posts.get()
		.then(posts => {
			res.status(200).json(posts)
		})
		.catch(err => {
			console.log(err)
		})
})
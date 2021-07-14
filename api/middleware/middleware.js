const Users = require('../users/users-model')
const Posts = require('../posts/posts-model')
console.log(Posts)
console.log(Users)

const logger = (req, res, next) => {
  // DO YOUR MAGIC
  let current_date_time = new Date()
  let formatted_date_time =
    current_date_time.getFullYear()
    + '-'
    + (current_date_time.getMonth() + 1)
    + '-'
    + current_date_time.getDate()
    + ' '
    + current_date_time.getHours()
    + ':'
    + current_date_time.getMinutes()
    + ':'
    + current_date_time.getSeconds();

  let method = req.method
  let url = req.url
  let host = req.headers.host
  let resp = res.statusCode
  let body = res.method

  console.log(`Method: ${method}`)
  console.log(`Request url: ${url} from: ${host} on ${formatted_date_time}`)
  console.log(`Response: ${resp} ${body}`)
  next()
}

const validateUserId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const { id } = req.params
    console.log(`the id is ${id}`)
    const user = await Users.getById(id)
    if (!user) {
      next({ status: 404, message: 'user not found' })
    } else {
      req.user = user
      next()
    }
  } catch (err) {
    res.status(404).json({ message: 'user not found' })
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body
  if (!name || !name.trim()) {
    res.status(400).json({ message: 'missing required name field' })
  } else {
    req.name = name.trim()
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body
  if (!text || !text.trim()) {
    res.status(400).json({ message: 'missing required text field' })
  } else {
    req.text = text.trim()
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}
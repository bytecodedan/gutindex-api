const express = require('express')
const router = express.Router()
const ds = require('../ds')

/**
 * Returns a list of authors
 *
 * Optional query parameters:
 *   - byName
 */
router.get('/', async (req, res) => {
  const { byName } = req.query
  try {
    var authors = await ds.fetchAuthors()
    if (byName) {
      authors = authors.filter(author =>
        author.toLowerCase().includes(byName.toLowerCase())
      )
    }
    res.send(authors)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
